'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem('fe_token');
        setIsAuthenticated(!!token);
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem('fe_token');
        setIsAuthenticated(false);
        window.location.href = '/';
    };

    return (
        <nav className="bg-blue-600 p-4 flex justify-between items-center shadow-lg">
            <h1 className="text-white text-2xl font-bold">AuthApp</h1>
            <div>
                {isAuthenticated ? (
                    <button
                        onClick={handleLogout}
                        className="text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        {pathname !== '/login' && (
                            <Link href="/login" className="text-white px-4 py-2 rounded hover:bg-blue-700">
                                Login
                            </Link>
                        )}
                        {pathname !== '/signup' && (
                            <Link href="/signup" className="text-white px-4 py-2 rounded hover:bg-blue-700">
                                Sign Up
                            </Link>
                        )}
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
