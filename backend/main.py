from fastapi import FastAPI, File, UploadFile
import uvicorn
from model import OCR

app = FastAPI()

@app.post('/uploadfile/')
async def upload_file(file: UploadFile = File(...), prompt: str = ''):
    response = OCR(file, prompt)
    return response

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)