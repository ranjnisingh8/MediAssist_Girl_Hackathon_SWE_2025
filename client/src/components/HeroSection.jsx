import React, { useState } from "react";
import { jsPDF } from "jspdf";
import axios from "axios";
import img from "../assets/img1.jpg";

const HeroSection = ({ state }) => {
  const { contract } = state;
  const [selectedFile, setSelectedFile] = useState(null);
  const [ocrData, setOcrData] = useState(null);
  const [aiReport, setAiReport] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [savingToBlockchain, setSavingToBlockchain] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    setUploading(true);
    setTransactionHash(null);
    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(formData);
    console.log(selectedFile)
    try {
      const response = await axios.post("https://mediassist-girl-hackathon-swe-2025.onrender.com/uploadfile/",formData)
      console.log(response.data)
      const text =  response.data.candidates[0].content.parts[0].text;
      console.log(text)
    //   const text = data.extracted_text;
    //   console.log(text)
      const clearText = text.replace(/```json|```/g, "").trim();
      console.log(clearText);

      const parsedData = JSON.parse(clearText);
      console.log(parsedData)
      setOcrData(parsedData);
      fetchGrievanceResponse(parsedData);
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const fetchGrievanceResponse = async (data) => {
    setAiReport("");
    setLoadingAI(true);
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCHK_9m7dwti-kYYWmr-ciR-Kp9_QTgvOc",

        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: {
          contents: [
            {
              parts: [
                {
                  text: `Generate a detailed health report and provide non-medicinal health betterment advice based on the following medical data: ${JSON.stringify(
                    data
                  )}and provide separate column to mention the provided medicine in the report.`,
                },
              ],
            },
          ],
        },
      });
      const datares = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCHK_9m7dwti-kYYWmr-ciR-Kp9_QTgvOc",

        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: {
          contents: [
            {
              parts: [
                {
                  text: `Convert the following data : ${JSON.stringify(data)}. Only give the output don't give explanation.Make  sure the format is of this format:
        {
        "name": "Lakshya",
        "doctor": "John",
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
            "name": "dekhle",
            "dosage": "take"
            }
        ]
        }`,
                },
              ],
            },
          ],
        },
      });
    //   console.log(response.json())
      console.log("check : ",datares)
        const clearText = datares.data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
        console.log(clearText);
        const parsedData = JSON.parse(clearText);
      const reportText = response.data.candidates[0].content.parts[0].text.replace(/\*\*/g, "");
      setAiReport(reportText);

    //   // After generating the report, upload to blockchain
        console.log(parsedData)
      uploadToBlockchain(parsedData);
    } catch (error) {
      setAiReport("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoadingAI(false);
    }
  };

  const uploadToBlockchain = async (data) => {
    if (!contract) {
      alert("Blockchain contract not found.");
      return;
    }

    console.log("Uploading Data:", data);

    const patientName = data.name;
    console.log(patientName)
    const doctorName = data.doctor;
    console.log(doctorName)
    const date = data.date;
    console.log(date)
    const medicineNames = data.medicines.map((med) => med.name);
    console.log(medicineNames)
    const medicineDosages = data.medicines.map((med) => med.dosage);
    console.log(medicineDosages)
    console.log( {patientName,doctorName,date,medicineNames,medicineDosages})

    setSavingToBlockchain(true);
    console.log("WEb done")
    try {
      const tx = await contract.storeOrder(
        patientName,
        doctorName,
        date,
        medicineNames,
        medicineDosages
      );

      await tx.wait(); // Wait for transaction confirmation
      setTransactionHash(tx.hash);
      console.log("Transaction Hash:", tx.hash);
      console.log("Blockchain Done")
    } catch (error) {
      console.error("Error uploading to blockchain:", error);
    } finally {
      setSavingToBlockchain(false);
    }
  };


  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Patient Health Report", 20, 20);
    doc.setFont("helvetica", "normal");
    doc.text(aiReport, 20, 40, { maxWidth: 170 });
    doc.save("Health_Report.pdf");
  };

  return (
    <section className="bg-white px-8 md:px-16 py-12 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            PharmaBee - AI Health Insights
          </h1>
          <p className="text-gray-600 mt-4">
            Upload a prescription, and our AI will provide health insights and wellness tips.
          </p>
          <div className="mt-6 border p-4 rounded-lg shadow-sm bg-gray-100">
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border p-2 rounded-md bg-white"
            />
            <button
              onClick={handleUpload}
              className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>

        <div className="relative">
          <img src={img} alt="PharmaBee" className="rounded-lg shadow-lg w-full" />
        </div>
      </div>

      {loadingAI && <p className="text-gray-600 text-center mt-6">Generating AI report...</p>}

      {aiReport && (
        <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">AI Health Report</h2>
          <p className="text-gray-700 whitespace-pre-line">{aiReport}</p>
          <button
            onClick={downloadPDF}
            className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Download Report
          </button>
        </div>
      )}

      {savingToBlockchain && <p className="text-gray-600 text-center mt-6">Uploading data to blockchain...</p>}

      {transactionHash && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg shadow-md text-center">
          <p>✅ Data successfully stored on the blockchain!</p>
          <p>Transaction Hash:</p>
          <a
            href={`https://etherscan.io/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            {transactionHash}
          </a>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
