# MediAssist

## Overview
MediAssist is an AI-powered platform that streamlines prescription management by converting handwritten prescriptions into digital records using Optical Character Recognition (OCR) and Natural Language Processing (NLP). It ensures accuracy in medication dispensation, provides personalized health recommendations, and securely logs transactions on the blockchain for transparency and fraud prevention. By integrating AI and blockchain, MediAssist enhances efficiency, security, and accessibility in pharmacy operations.

## Problem Statement
Pharmacists frequently encounter illegible handwritten prescriptions, leading to misinterpretations, medication errors, and delays in patient care. Additionally, patients often receive prescriptions without sufficient guidance on essential recovery factors like diet, exercise, and sleep. Manual record-keeping in pharmacies further contributes to inefficiencies, stock mismanagement, and potential fraud. Existing solutions either lack automation or fail to ensure security in prescription handling. MediAssist tackles these issues by digitizing prescriptions, offering AI-driven health insights, and leveraging blockchain for secure and tamper-proof medical record management.

## Solution
MediAssist addresses these challenges by digitizing handwritten prescriptions with high-accuracy OCR, reducing errors and delays in medication dispensation. It enhances patient care by providing personalized health insights, including tailored diet, exercise, and sleep recommendations based on prescribed medications. To ensure security and transparency, all prescription transactions are securely recorded on the blockchain, preventing fraud and unauthorized modifications. Additionally, by integrating MetaMask, the system ensures that only verified users can access blockchain-based features, maintaining data integrity and authenticity. Through AI-driven automation and decentralized record-keeping, MediAssist streamlines pharmacy operations, improves patient safety, and enhances overall healthcare efficiency.

## Features
- **Handwritten Prescription Digitization**: Uses AI-driven OCR for accurate extraction of prescription details.
- **Personalized Health Insights**: Offers diet, exercise, and sleep guidelines based on prescribed medications.
- **Blockchain-based Record Keeping**: Ensures security, transparency, and immutability of medical transactions.
- **Automated Pharmacy Management**: Reduces manual errors and enhances efficiency in drug distribution.
- **MetaMask Integration**: Users must first create a MetaMask account and connect it to the website before they can upload a prescription photo and use blockchain features.

## Technology Stack
- **Frontend**: React.js
- **Backend**: FastAPI (Python)
- **OCR Model**: Tesseract OCR, Gemini
- **Blockchain**: Solidity for smart contracts
- **Deployment**: Vercel

## Implementation Approach
1. **OCR Extraction**: Convert handwritten prescriptions into digital text using Tesseract and Gemini.
2. **NLP Processing**: Extract relevant details (medicine name, dosage, doctor/patient info) and validate them.
3. **Blockchain Recording**: Store verified prescription transactions on the blockchain for secure record-keeping.
4. **Health Insights Generation**: Provide dietary, physical activity, and sleep recommendations based on prescriptions.

## Security Measures
- **Blockchain Immutability**: Ensures data cannot be altered or tampered with.
- **Encryption**: Secure storage and transmission using HTTPS (TLS) and AES encryption.

## AI Usage
MediAssist leverages AI for:
- **OCR-based prescription digitization**
- **Medication data extraction and categorization**
- **Personalized health guidance based on prescriptions**

## Alternatives Considered
- **OCR Tools**: Evaluated Adobe OCR, Amazon Textract, and DocTR, but chose Tesseract and Gemini for superior accuracy with handwritten text.
- **Data Storage**: Considered centralized databases but opted for blockchain due to its security, transparency, and immutability.

## Setup for Local Development
### Prerequisites
- Node.js (v16+)
- Python (v3.9+)
- FastAPI
- Tesseract OCR
- Solidity compiler
- Vercel CLI (for deployment)
- **MetaMask** browser extension (for blockchain functionality)

### Steps
1. **Clone the repository**:
   ```sh
   git clone https://github.com/ranjnisingh8/MediAssist_Girl_Hackathon_SWE_2025.git
   cd MediAssist_Girl_Hackathon_SWE_2025
   ```

2. **Create a `.env` file** and add your Gemini API key and model URL:
   ```sh
   GEMINI_API_KEY=your_api_key_here
   GEMINI_MODEL_URL=your_model_url_here
   ```

3. **Setup the backend**:
   ```sh
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

4. **Setup the frontend**:
   ```sh
   cd frontend
   npm install
   npm start
   ```

5. **Setup MetaMask**:
   - Install the [MetaMask Extension](https://metamask.io/)
   - Create a MetaMask account
   - Connect your wallet to the MediAssist website
   - Only after connecting, you can upload prescription photos and use blockchain features.

6. **Deploy to Vercel (Optional)**:
   ```sh
   vercel
   ```

## Screenshots
![Screenshot 2025-02-26 114402](https://github.com/user-attachments/assets/78f4a0f7-abff-48b9-bfc7-7738e56cd988)

![Screenshot 2025-02-26 115438](https://github.com/user-attachments/assets/01cea6cc-6b7b-4b2c-8a26-1720b5669f2c)

![Screenshot 2025-02-26 115426](https://github.com/user-attachments/assets/90b8cad5-23e1-455d-8d53-f0104e912629)


## Deployment
Live Demo: [Google Hackathon 2025 Website](http://google-hackathon-2025.vercel.app)

## References
- **Tesseract OCR**: [GitHub Repository](https://github.com/tesseract-ocr/tesseract)
- **Blockchain in Healthcare**: [Forbes Article](https://www.forbes.com/sites/forbestechcouncil/2021/07/07/how-blockchain-technology-is-revolutionizing-the-healthcare-industry)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

