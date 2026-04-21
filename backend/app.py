from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import joblib
import json
from flask_cors import CORS
import pytesseract
from PIL import Image

# OCR utils
from ocr_utils import clean_text, extract_quantity, extract_price

app = Flask(__name__)
CORS(app)

# ================================
# TESSERACT PATH (WINDOWS)
# ================================
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# ================================
# LOAD MODEL + SCALER + FEATURES
# ================================
model = joblib.load("isolation_forest_model.pkl")
scaler = joblib.load("scaler.pkl")

with open("features.json", "r") as f:
    features = json.load(f)

# ================================
# HOME ROUTE
# ================================
@app.route("/")
def home():
    return "Marico AI Backend Running"


# ================================
# CSV PREDICTION ROUTE
# ================================
@app.route("/predict", methods=["POST"])
def predict():
    try:
        file = request.files.get("file")

        if not file:
            return jsonify({"error": "No file uploaded"}), 400

        df = pd.read_csv(file)
        df.columns = df.columns.str.strip()

        required_cols = ['Quantity', 'Price', 'Cust_Quantity', 'Cust_Price', 'InvoiceDate']
        for col in required_cols:
            if col not in df.columns:
                return jsonify({"error": f"Missing column: {col}"}), 400

        df['Quantity'] = pd.to_numeric(df['Quantity'], errors='coerce')
        df['Price'] = pd.to_numeric(df['Price'], errors='coerce')
        df['Cust_Quantity'] = pd.to_numeric(df['Cust_Quantity'], errors='coerce')
        df['Cust_Price'] = pd.to_numeric(df['Cust_Price'], errors='coerce')

        df['Amount_Marico'] = df['Quantity'] * df['Price']
        df['Amount_Customer'] = df['Cust_Quantity'] * df['Cust_Price']
        df['Amount_Diff'] = df['Amount_Marico'] - df['Amount_Customer']

        df['Qty_Diff'] = df['Quantity'] - df['Cust_Quantity']
        df['Price_Diff'] = df['Price'] - df['Cust_Price']

        df['InvoiceDate'] = pd.to_datetime(df['InvoiceDate'], errors='coerce')
        df['Hour'] = df['InvoiceDate'].dt.hour.fillna(0)
        df['Month'] = df['InvoiceDate'].dt.month.fillna(0)

        df['Product_Similarity'] = 1.0

        X = df[features].fillna(0)
        X_scaled = scaler.transform(X)

        df['anomaly'] = model.predict(X_scaled)

        df['Final_Status'] = np.where(
            (np.abs(df['Qty_Diff']) < 1) & (np.abs(df['Price_Diff']) < 1),
            'No_Issue',
            np.where(df['anomaly'] == -1, 'Mismatch', 'Normal')
        )

        print("CSV Prediction Summary:")
        print(df['Final_Status'].value_counts())

        return jsonify(df.to_dict(orient="records"))

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ================================
# SINGLE IMAGE OCR ROUTE
# ================================
@app.route("/predict-image", methods=["POST"])
def predict_image():
    try:
        file = request.files.get("file")

        if not file:
            return jsonify({"error": "No image uploaded"}), 400

        img = Image.open(file)
        raw_text = pytesseract.image_to_string(img)
        cleaned = clean_text(raw_text)

        qty = extract_quantity(cleaned)
        price = extract_price(cleaned)

        if qty is None or price is None:
            return jsonify({
                "error": "Could not extract data",
                "raw_text": raw_text
            }), 400

        return jsonify({
            "quantity": qty,
            "price": price,
            "status": "Extracted",
            "raw_text": raw_text
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ================================
# 🔥 COMPARE TWO DOCUMENTS ROUTE
# ================================
@app.route("/compare-documents", methods=["POST"])
def compare_documents():
    try:
        marico_file = request.files.get("marico_file")
        customer_file = request.files.get("customer_file")

        if not marico_file or not customer_file:
            return jsonify({"error": "Both files required"}), 400

        # OCR helper
        def extract_data(file):
            img = Image.open(file)
            raw_text = pytesseract.image_to_string(img)
            cleaned = clean_text(raw_text)

            qty = extract_quantity(cleaned)
            price = extract_price(cleaned)

            return {
                "qty": qty,
                "price": price,
                "raw_text": raw_text
            }

        # Extract both
        marico = extract_data(marico_file)
        customer = extract_data(customer_file)

        if None in [marico["qty"], marico["price"], customer["qty"], customer["price"]]:
            return jsonify({
                "error": "Extraction failed",
                "marico_text": marico["raw_text"],
                "customer_text": customer["raw_text"]
            }), 400

        # Create dataframe
        df = pd.DataFrame([{
            "Quantity": marico["qty"],
            "Price": marico["price"],
            "Cust_Quantity": customer["qty"],
            "Cust_Price": customer["price"],
            "InvoiceDate": pd.Timestamp.now()
        }])

        # Feature engineering
        df['Amount_Marico'] = df['Quantity'] * df['Price']
        df['Amount_Customer'] = df['Cust_Quantity'] * df['Cust_Price']
        df['Amount_Diff'] = df['Amount_Marico'] - df['Amount_Customer']

        df['Qty_Diff'] = df['Quantity'] - df['Cust_Quantity']
        df['Price_Diff'] = df['Price'] - df['Cust_Price']

        df['Hour'] = df['InvoiceDate'].dt.hour
        df['Month'] = df['InvoiceDate'].dt.month
        df['Product_Similarity'] = 1.0

        # Model
        X = df[features].fillna(0)
        X_scaled = scaler.transform(X)
        df['anomaly'] = model.predict(X_scaled)

        df['Final_Status'] = np.where(
            (np.abs(df['Qty_Diff']) < 1) & (np.abs(df['Price_Diff']) < 1),
            'No_Issue',
            np.where(df['anomaly'] == -1, 'Mismatch', 'Normal')
        )

        return jsonify({
            "marico": marico,
            "customer": customer,
            "comparison": {
                "qty_diff": float(df['Qty_Diff'].iloc[0]),
                "price_diff": float(df['Price_Diff'].iloc[0]),
                "status": df['Final_Status'].iloc[0]
            }
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ================================
# RUN SERVER
# ================================
if __name__ == "__main__":
    app.run(debug=True)