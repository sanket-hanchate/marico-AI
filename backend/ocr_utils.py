import re

# CLEAN TEXT
def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9:\.\s]', ' ', text)
    return text


# EXTRACT QUANTITY
def extract_quantity(text):
    patterns = [
        r'quantity\s*:\s*(\d+)',
        r'qty\s*:\s*(\d+)',
        r'qty\s*(\d+)',
        r'quantity\s*(\d+)'
    ]
    
    for pattern in patterns:
        match = re.search(pattern, text)
        if match:
            return int(match.group(1))
    
    return None


# EXTRACT PRICE
def extract_price(text):
    patterns = [
        r'price\s*:\s*(\d+\.?\d*)',
        r'rs\s*(\d+\.?\d*)',
        r'amount\s*:\s*(\d+\.?\d*)'
    ]
    
    for pattern in patterns:
        match = re.search(pattern, text)
        if match:
            return float(match.group(1))
    
    return None