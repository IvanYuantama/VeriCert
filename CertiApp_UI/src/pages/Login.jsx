// Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.token) {
            login(data.token);
            navigate("/");
        } else {
            alert("Login gagal");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-black to-yellow-500">
            <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-lg border border-yellow-400 text-blue-400">
                <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border border-yellow-400 bg-transparent text-blue-400 placeholder-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 border border-yellow-400 bg-transparent text-blue-400 placeholder-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300" />
                    <button type="submit" className="w-full bg-yellow-500 text-black font-bold p-2 rounded hover:bg-yellow-400 transition">Login</button>
                </form>
            </div>
        </div>
    );
};
export default Login;