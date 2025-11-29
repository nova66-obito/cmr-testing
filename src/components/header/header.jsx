import React from "react";
import { Link } from "react-router-dom";
export default function Header() {
    return (
        <>
            <header>
                <nav className="flex items-center justify-center px-4 py-6 bg-blue-300">
                    <div className="flex gap-4">
                        <Link to="/login" className="bg-blue-600 px-2 py-1 rounded-sm font-bold text-white">login</Link>
                        <Link to="/salesexecutive" className="bg-blue-600 px-2 py-1 rounded-sm font-bold text-white">Sales Executive</Link>
                        <Link to="/teamlead" className="bg-blue-600 px-2 py-1 rounded-sm font-bold text-white">Team Lead</Link>
                        <Link to="/manager" className="bg-blue-600 px-2 py-1 rounded-sm font-bold text-white">Manager</Link>
                        <Link to="/admin" className="bg-blue-600 px-2 py-1 rounded-sm font-bold text-white">admin</Link>
                    </div>
                </nav>
            </header>
        </>
    )
}