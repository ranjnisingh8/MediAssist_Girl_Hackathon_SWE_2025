import os
import requests
import base64
from dotenv import load_dotenv
from model import response

load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
GEMINI_API_URL = os.getenv('GEMINI_API_URL')

def OCR(image_path, prompt):
    with open(image_path, 'rb') as img_file:
        image_data = img_file.read()
    
    image_data_base64 = base64.b64encode(image_data).decode('utf-8')

    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    
    params = {'key': GEMINI_API_KEY}
    
    payload = {
        'contents': [
            {'role': 'user', 'parts': [
                {'text': prompt},
                {'inlineData': {
                    'mimeType': 'image/png',
                    'data': image_data_base64
                }}
            ]}
        ]
    }
    
    response = requests.post(GEMINI_API_URL, headers=headers, params=params, json=payload)    
    response = response.json()
    return response

image_path = r'D:\Hackathon\Ranjni\11042_2020_10151_Fig5_HTML.png'
prompt = "Extract details from the medical prescription: Name, Doctor, Date, and Medicines with dosage in JSON."

response = OCR(image_path, prompt)
print(response)
