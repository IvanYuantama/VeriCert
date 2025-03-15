import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [certiid, setcertiid] = useState("");
  const navigate = useNavigate();

  const redirectToCertificate = () => {
    navigate(`/certificate/${certiid}`);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white h-[83vh]">
      <div className="pb-4 mt-[-100px]">
        <img src={Logo} width="400" height="400" />
      </div>
      <input
        type="text"
        id="CertificateID"
        name="CertificateID"
        className="border-2 border-[#22C55E] text-black mb-2 p-3 rounded-md font-semibold text-center mb-8 w-64 bg-white shadow-lg"
        placeholder="Enter Certificate ID to View"
        value={certiid}
        onChange={(e) => setcertiid(e.target.value)}
      />
      <button className="border-1 bg-red-600 hover:bg-orange-500 px-12 py-3 mt-[-10px] font-bold rounded text-white text-1xl shadow-lg" onClick={redirectToCertificate}>
        Search
      </button>
    </div>
  );
};

export default Home;
