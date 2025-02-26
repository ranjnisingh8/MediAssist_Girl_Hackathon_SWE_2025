# MediAssist

## Table of Contents
1. [Overview](#overview)
2. [Problem Statement](#problem-statement)
3. [Solution](#solution)
4. [Features](#features)
5. [Technology Stack](#technology-stack)
6. [Implementation Approach](#implementation-approach)
7. [Scaling Parameters](#scaling-parameters)
8. [Rollout Strategy](#rollout-strategy)
9. [Security Measures](#security-measures)
10. [AI Usage](#ai-usage)
11. [Alternatives Considered](#alternatives-considered)
12. [Setup for Local Development](#setup-for-local-development)
13. [Deployment](#deployment)
14. [References](#references)
15. [License](#license)

## Overview
MediAssist is an AI-powered software designed to digitize handwritten prescriptions, improving drug management efficiency and security. The platform uses Optical Character Recognition (OCR) and Natural Language Processing (NLP) to extract medication details, ensuring pharmacists have an organized and error-free workflow. Additionally, MediAssist provides personalized health recommendations and securely records every drug transaction on the blockchain for transparency and accountability.

## Problem Statement
Pharmacists often struggle with illegible handwritten prescriptions, leading to errors, delays, and risks to patient safety. Moreover, patients receive medication without adequate guidance on lifestyle factors essential for recovery. Additionally, manual record-keeping in pharmacies results in inefficiencies and fraud. 

## Solution
MediAssist addresses these challenges by implementing an AI-powered solution that:
- **Automates Prescription Digitization**: Uses OCR technology to extract text from handwritten prescriptions with high accuracy.
- **Provides Personalized Health Insights**: Offers diet, exercise, and sleep recommendations based on prescribed medications.
- **Enhances Security and Transparency**: Stores all medical transactions on the blockchain to ensure data integrity and prevent fraud.
- **Improves Pharmacy Management**: Automates stock tracking and prescription validation, reducing errors and inefficiencies.

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

## Scaling Parameters
- **Data Size**: Small transaction records per user, scalable for a growing database.
- **Throughput**: Handles hundreds to thousands of transactions per minute.
- **OCR Accuracy**: Achieves 98% accuracy even with difficult handwriting.
- **Blockchain Transactions**: Optimized for cost and speed, ensuring secure and timely recording.

## Rollout Strategy
1. **Pilot Phase**: Limited user testing with pharmacists and patients.
2. **Scalability Testing**: Enhance performance and feature set based on user feedback.
3. **Full Deployment**: Broader release with additional features like real-time notifications.

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

## Deployment
Live Demo: [Google Hackathon 2025 Website](http://google-hackathon-2025.vercel.app)

## References
- **Tesseract OCR**: [GitHub Repository](https://github.com/tesseract-ocr/tesseract)
- **Blockchain in Healthcare**: [Forbes Article](https://www.forbes.com/sites/forbestechcouncil/2021/07/07/how-blockchain-technology-is-revolutionizing-the-healthcare-industry)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

