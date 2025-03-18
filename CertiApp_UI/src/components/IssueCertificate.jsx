import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BrowserProvider, Contract } from "ethers";
import { abi } from "../scData/Cert.json";
import { CertModuleCert } from "../scData/deployed_addresses.json";

const IssueCertificate = () => {
  const [certiid, setCertiid] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [grade, setGrade] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    const newCertificate = {
      certiid,
      name,
      course,
      grade,
      date,
    };

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      console.log("Address:", signer.address);
      const instance = new Contract(CertModuleCert, abi, signer);
      const txl = await instance.issue(
        newCertificate.certiid,
        newCertificate.name,
        newCertificate.course,
        newCertificate.grade,
        newCertificate.date
      );
      console.log("Transaction:", txl);
      console.log(
        "Data-Submitted:",
        newCertificate.certiid,
        newCertificate.name,
        newCertificate.course,
        newCertificate.grade,
        newCertificate.date
      );
      if (txl) {
        toast.success("Added successfully");
        navigate("/thank-you");
      } else {
        toast.error("Failed to add certificate");
      }
    } catch (error) {
      console.error("Error adding certificate:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-black to-yellow-600 text-black">
      <div className="max-w-md bg-white p-6 rounded-lg shadow-lg border-4 border-yellow-400">
        <h3 className="text-3xl font-bold text-center mb-4">Issue New Certificate</h3>
        <form onSubmit={submitForm} className="space-y-4">
          <div>
            <label className="block text-lg font-medium mb-2">Select Course *</label>
            <select
              className="w-full border-2 border-gray-300 rounded-md p-2"
              required
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="">Select Course</option>
              <option>Certified Blockchain Associate</option>
              <option>Certified Ethereum Developer</option>
              <option>Blockchain Foundation</option>
              <option>Ethereum Fundamentals</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Certificate ID *</label>
            <input
              type="text"
              className="w-full border-2 border-gray-300 rounded-md p-2"
              placeholder="Certificate ID"
              required
              value={certiid}
              onChange={(e) => setCertiid(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Candidate Name *</label>
            <input
              type="text"
              className="w-full border-2 border-gray-300 rounded-md p-2"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Select Grade *</label>
            <select
              className="w-full border-2 border-gray-300 rounded-md p-2"
              required
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            >
              <option value="">Select Grade</option>
              <option>S</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Issue Date *</label>
            <input
              type="date"
              className="w-full border-2 border-gray-300 rounded-md p-2"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button className="w-full bg-gradient-to-r from-black to-yellow-500 hover:from-yellow-500 hover:to-black text-white font-bold py-2 px-4 rounded-md transition duration-300" type="submit">
              Issue Certificate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueCertificate;
