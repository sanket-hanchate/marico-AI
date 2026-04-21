import pytesseract
from PIL import Image

# ✅ IMPORT YOUR FUNCTIONS
from ocr_utils import clean_text, extract_quantity, extract_price

# Path for Tesseract (Windows)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Load image
img = Image.open("image.png")

# OCR
text = pytesseract.image_to_string(img)
print("Raw OCR Text:\n", text)

# CLEAN
cleaned = clean_text(text)
print("\nCleaned Text:\n", cleaned)

# EXTRACT
qty = extract_quantity(cleaned)
price = extract_price(cleaned)

print("\nExtracted Values:")
print("Quantity:", qty)
print("Price:", price)