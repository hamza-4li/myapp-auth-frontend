// src/app/dashboard/page.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('fe_token');
        if (!token) {
            router.push('/login');
        } else {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser({ email: payload.email });
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-8">
                {user ? (
                    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                        <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome, {user.email}!</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-blue-100 p-4 rounded-lg shadow">
                                <h2 className="text-xl font-semibold text-blue-700">Profile Info</h2>
                                <p className="mt-2 text-gray-700">Email: {user.email}</p>
                            </div>
                            <div className="bg-green-100 p-4 rounded-lg shadow">
                                <h2 className="text-xl font-semibold text-green-700">Recent Activity</h2>
                                <p className="mt-2 text-gray-700">No recent activity yet.</p>
                            </div>
                            <div className="bg-purple-100 p-4 rounded-lg shadow">
                                <h2 className="text-xl font-semibold text-purple-700">Settings</h2>
                                <p className="mt-2 text-gray-700">Manage your preferences.</p>
                            </div>
                            <div className="bg-yellow-100 p-4 rounded-lg shadow">
                                <h2 className="text-xl font-semibold text-yellow-700">Notifications</h2>
                                <p className="mt-2 text-gray-700">You have no new notifications.</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-700 text-lg">Loading...</p>
                )}
            </div>
        </div>
    );
}

// This dashboard features a modern grid layout with colorful sections using Tailwind CSS. The background, card styles, and text colors are designed to create a clean, attractive UI.


// import Navbar from '@/components/Navbar'
// import React from 'react'

// function Dashboard() {
//     return (
//         <div>
//             <Navbar />
//             <div>Dashboard</div>
//         </div>
//     )
// }

// export default Dashboard