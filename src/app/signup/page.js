'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import { Eye, EyeOff } from 'lucide-react';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // const [loading, setLoading] = useState(false); // Loading state
    const router = useRouter();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        const token = localStorage.getItem('fe_token');
        if (token) {
            // Redirect to dashboard if already signed in
            router.push('/dashboard');
        }
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();

        // setLoading(true); // Start loading
        // setError('');     // Reset error

        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return; // Stop the API call if validation fails
        }
        if (password === "") {
            alert('Password is Required.');
            return; // Stop the API call if validation fails
        }
        console.log("email: ", email)
        console.log("password: ", password)
        try {
            const response = await axios.post(`https://myapp-auth-backend-production.up.railway.app/register`,
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
            console.error('Signup Error:', error);
            alert(error?.response?.data?.message || "User Already exist")
            // if (err.response && err.response.data && err.response.data.message) {
            //     setError(err.response.data.message);
            // } else {
            //     setError('Server error. Please try again later.');
            // }
        }
        // finally {
        //     setLoading(false); // Stop loading
        // }
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md w-80">
                    <h2 className="text-2xl mb-4 text-center font-bold">Sign Up</h2>
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
                    {/* <button
                        type="submit"
                        className={`w-full flex justify-center items-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        disabled={loading}
                    >
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                        ) : (
                            'Sign Up'
                        )} */}
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                        sign up
                    </button>
                </form>
            </div>
        </div>
    );
}
