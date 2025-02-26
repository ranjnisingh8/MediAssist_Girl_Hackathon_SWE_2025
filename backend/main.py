from fastapi import FastAPI, File, UploadFile
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import base64
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
GEMINI_API_URL = os.getenv('GEMINI_API_URL')

async def OCR(file: UploadFile, prompt: str = ''):
    # First, read the file content
    image_data = await file.read()

    if not prompt:
        prompt = '''Extract details from the medical prescription: Name, Doctor, Date, and Medicines with dosage in JSON.
        make  sure the format is of this format:
        {
        "name": "John R. Doe, HM3, USN",
        "doctor": "Jack R. Frost, LCDR. MD. USNR",
        "date": "23 JAN 99",
        "medicines": [
            {
            "name": "Tr Belladonna",
            "dosage": "15 ml"
            },
            {
            "name": "Amphogel gsad",
            "dosage": "120 ml"
            },
            {
            "name": "M + FT Solution",
            "dosage": "Seg: 5ml tid a.c."
            }
        ]
        }
        '''

    # Now encode the image data
    image_data_base64 = base64.b64encode(image_data).decode('utf-8')

    headers = {
        'Content-Type': 'application/json',
    }

    params = {'key': GEMINI_API_KEY}

    payload = {
        'contents': [
            {'role': 'user', 'parts': [
                {'text': prompt},
                {'inlineData': {
                    'mimeType': file.content_type or 'image/jpeg',
                    'data': image_data_base64
                }}
            ]}
        ]
    }

    response = requests.post(GEMINI_API_URL, headers=headers, params=params, json=payload)
    response_json = response.json()

    return response_json

@app.post('/uploadfile/')
async def upload_file(file: UploadFile = File(...), prompt: str = ''):
    try:
        response = await OCR(file, prompt)
        return response
    except Exception as e:
        import traceback
        print(f"Error in upload_file: {str(e)}")
        print(traceback.format_exc())
        return {"error": str(e)}

@app.get("/test-cors/")
async def test_cors():
    return {"message": "CORS is working!"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
