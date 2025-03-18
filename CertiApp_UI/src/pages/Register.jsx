// Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (res.ok) {
            toast.success("Registration successful");
            navigate("/login");
        } else {
            toast.error(data.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-black to-yellow-500">
            <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-lg border border-yellow-400 text-blue-400">
                <h3 className="text-3xl font-bold text-center mb-4">Register</h3>
                <form onSubmit={handleRegister} className="space-y-4">
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 border border-yellow-400 bg-transparent text-blue-400 placeholder-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border border-yellow-400 bg-transparent text-blue-400 placeholder-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 border border-yellow-400 bg-transparent text-blue-400 placeholder-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" />
                    <button type="submit" className="w-full bg-yellow-500 text-black font-bold p-2 rounded hover:bg-yellow-400 transition">Register</button>
                </form>
            </div>
        </div>
    );
};
export default Register;
