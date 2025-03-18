import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { BrowserProvider } from "ethers";

const Home = () => {
  const [certiid, setcertiid] = useState("");
  const navigate = useNavigate();
  const provider = new BrowserProvider(window.ethereum);

  const redirectToCertificate = () => {
    navigate(`/certificate/${certiid}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-yellow-600 text-blue-400">
      <div className="pb-4 mt-[-100px] animate-fadeIn">
        <img src={Logo} width="400" height="400" className="drop-shadow-lg" />
      </div>

      <input
        type="text"
        id="CertificateID"
        name="CertificateID"
        className="border-2 border-yellow-400 text-black p-3 rounded-md font-semibold text-center w-64 bg-white shadow-lg focus:ring-2 focus:ring-yellow-500 outline-none transition-all duration-300"
        placeholder="Enter Certificate ID to View"
        value={certiid}
        onChange={(e) => setcertiid(e.target.value)}
      />

      <button
        className="mt-4 bg-gradient-to-r from-red-600 to-orange-500 px-12 py-3 font-bold rounded text-white text-xl shadow-lg transition-transform transform hover:scale-105"
        onClick={redirectToCertificate}
      >
        Search
      </button>

      <div className="flex gap-4 mt-6">
        <button
          className="bg-black text-yellow-400 px-6 py-2 rounded-md font-semibold shadow-md hover:bg-yellow-500 hover:text-black transition-all duration-300"
          onClick={() => navigate("/issue")}
        >
          Issue Certificate
        </button>

        <button
          className="bg-black text-yellow-400 px-6 py-2 rounded-md font-semibold shadow-md hover:bg-yellow-500 hover:text-black transition-all duration-300"
          onClick={async () => {
            const signer = await provider.getSigner();
            console.log("Address:", signer.address);
          }}
        >
          Connect to MetaMask
        </button>
      </div>
    </div>
  );
};

export default Home;