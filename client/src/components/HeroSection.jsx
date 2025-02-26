import React, { useState } from "react";
import { jsPDF } from "jspdf";
import axios from "axios";
import img from "../assets/img1.jpg";

const HeroSection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ocrData, setOcrData] = useState(null);
  const [aiReport, setAiReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:8000/uploadfile/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      const text = data.extracted_text;
      const clearText = text.replace(/```json|```/g, "").trim();
      console.log(clearText)
      setOcrData(JSON.parse(clearText));
      fetchGrievanceResponse(JSON.parse(clearText));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setUploading(false);
    }
  };

  const fetchGrievanceResponse = async (data) => {
    setAiReport('');
    setLoading(true);
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCHK_9m7dwti-kYYWmr-ciR-Kp9_QTgvOc",

        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: {
          contents: [
            {
              parts: [{ text: `Generate a detailed health report and provide non-medicinal health betterment advice based on the following medical data: ${JSON.stringify(data)}` }],
            },
          ],
        },
      });
      const reportText = response.data.candidates[0].content.parts[0].text.replace(/\*\*/g, "");
      setAiReport(reportText);
    } catch (error) {
      setAiReport('An error occurred. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">PharmaBee - AI Health Insights</h1>
          <p className="text-gray-600 mt-4">
            Upload a prescription, and our AI will provide health insights and wellness tips.
          </p>
          <div className="mt-6 border p-4 rounded-lg shadow-sm bg-gray-100">
            <input type="file" onChange={handleFileChange} className="w-full border p-2 rounded-md bg-white" />
            <button 
              onClick={handleUpload} 
              className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>

        <div className="relative">
          <img src={img} alt="PharmaBee" className="rounded-lg shadow-lg w-full" />
        </div>
      </div>

      {loading && <p className="text-gray-600 text-center mt-6">Generating AI report...</p>}

      {aiReport && (
        <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">AI Health Report</h2>
          <p className="text-gray-700 whitespace-pre-line">{aiReport}</p>
          <button 
            onClick={downloadPDF} 
            className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Download Report
          </button>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
