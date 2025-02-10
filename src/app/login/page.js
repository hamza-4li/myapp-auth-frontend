'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const handleLogin = async (e) => {
        e.preventDefault();
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return; // Stop the API call if validation fails
        }
        if (password === "") {
            alert('Password is Required.');
            return; // Stop the API call if validation fails
        }
        try {
            const response = await axios.post(`http://localhost:5000/login`,
                {
                    email: email.trim(),
                    password: password
                }
            )
            console.log("response: ", response);
            if (response.data?.success) {
                localStorage.setItem("fe_token", response.data?.data?.token)
                router.push("/dashboard")
            }
        } catch (error) {
            console.error('Login Error:', error);
            alert(error?.response?.data?.message || "something went wrong")
            router.push("/signup")
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
                    <h2 className="text-2xl mb-4 text-center font-bold">Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 cursor-pointer text-gray-600"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
