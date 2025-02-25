import React, { useState } from "react";
import img from "../assets/img1.jpg"; // Keeping the original image

const HeroSection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prompt, setPrompt] = useState(""); // Optional text input for prompt

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("prompt", prompt); // If you need to send a prompt along with the image

    try {
      const response = await fetch("http://localhost:8000/uploadfile/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      console.log("OCR Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-white px-8 md:px-16 py-12 max-w-7xl mx-auto gap-10">
      {/* Left Side - Text Content */}
      <div className="w-full md:w-1/2">
        <p className="text-gray-500 uppercase text-sm font-semibold">We are</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
          PharmaBee helps you find solutions for your health
        </h1>
        <p className="text-gray-600 mt-4">
          A lectus ac pulvinar tincidunt accumsan ullamcorper dolor accos
          facilisis hac molestie aliquam blandit.
        </p>
        <a href="#" className="text-green-600 font-medium mt-4 inline-block">
          See All Products →
        </a>
      </div>

      {/* Right Side - Image & Upload Input */}
      <div className="relative w-full md:w-1/2 mt-8 md:mt-0">
        <img
          src={img}
          alt="PharmaBee"
          className="rounded-lg shadow-lg w-full"
        />
        <div className="absolute bottom-4 left-4 right-4 bg-white shadow-md rounded-lg flex items-center justify-between px-4 py-2">
          <input
            type="file"
            onChange={handleFileChange}
            className="bg-transparent focus:outline-none text-gray-500 flex-1"
          />
          <button
            onClick={handleUpload}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Upload
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
