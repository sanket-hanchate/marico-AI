# AI Reconciliation System

## Features
- CSV-based reconciliation (structured data)
- OCR-based invoice processing (unstructured data)
- Document comparison (Marico vs Customer)
- AI anomaly detection using Isolation Forest
- Interactive dashboard with visualization

## Tech Stack
- Frontend: React (Vite), Tailwind CSS
- Backend: Flask (Python)
- ML: Scikit-learn (Isolation Forest)
- OCR: Tesseract OCR
- Visualization: Recharts

## Workflows
1. CSV Upload → Feature Engineering → ML → Result
2. Image Upload → OCR → Extraction → ML → Comparison

## Use Case
Automated reconciliation for FMCG companies like Marico.

## Run Project

### Backend
cd backend
python app.py

### Frontend
cd frontend
npm install
npm run dev

