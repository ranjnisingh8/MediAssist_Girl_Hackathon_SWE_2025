import React from "react";

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-white px-8 md:px-16 py-12 max-w-7xl mx-auto">
      {/* Left Side - Text Content */}
      <div className="w-full md:w-1/2">
        <p className="text-gray-500 uppercase text-sm font-semibold">We are</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
          PharmaBee help you find solutions for your health
        </h1>
        <p className="text-gray-600 mt-4">
          A lectus ac pulvinar tincidunt accumsan ullamcorper dolor accos
          facilisis hac molestie aliquam blandit.
        </p>
        <a href="#" className="text-green-600 font-medium mt-4 inline-block">
          See All Product →
        </a>
      </div>

      {/* Right Side - Image with Overlay */}
      <div className="relative w-full md:w-1/2 mt-8 md:mt-0">
        <img
          src="https://via.placeholder.com/500x300" // Replace with actual image URL
          alt="PharmaBee"
          className="rounded-lg shadow-lg w-full"
        />
        <div className="absolute bottom-4 left-4 right-4 bg-white shadow-md rounded-lg flex items-center justify-between px-4 py-2">
          <input
            type="text"
            placeholder="Find nearest Pharmacy"
            className="bg-transparent focus:outline-none text-gray-500 flex-1"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
            Find Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
