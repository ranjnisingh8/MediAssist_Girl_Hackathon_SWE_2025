from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import requests
import base64
from dotenv import load_dotenv
from typing import Dict

load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
    max_age=86400,
)

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
GEMINI_API_URL = os.getenv('GEMINI_API_URL')

def OCR(image_data: bytes, prompt: str) -> Dict:
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
                    'mimeType': 'image/jpeg',  # Generic image MIME type
                    'data': image_data_base64
                }}
            ]}
        ]
    }
    
    try:
        response = requests.post(GEMINI_API_URL, headers=headers, params=params, json=payload)
        response.raise_for_status()  # Raise exception for HTTP errors
        response_json = response.json()
        
        return response_json
    
    except Exception as e:
        return {"error": str(e)}

@app.post("/uploadfile/")
async def extract_text(file: UploadFile = File(...)):
    try:
        image_data = await file.read()
        prompt = 'Extract details from the medical prescription: Name, Doctor, Date, and Medicines with dosage in JSON.'
        extracted_data = OCR(image_data, prompt)
        return extracted_data
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )

@app.get("/test-cors/")
async def test_cors():
    return {"message": "CORS is working!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)