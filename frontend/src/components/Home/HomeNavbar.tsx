import React, { useState } from "react";
import { UserButton } from "@clerk/clerk-react";

const HomeNavbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const Links = [
        { id: 1, title: "Dashboard" },
        { id: 2, title: "My Interviews" },
        { id: 3, title: "Resources" },
        { id: 4, title: "About" },
    ];

    return (
        <nav className="w-full max-w-6xl mx-auto mt-6 px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg text-white transition-all duration-300">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src="/logo.svg" alt="logo" className="w-9 h-9" />
                    <p className="text-2xl font-semibold tracking-wide bg-gradient-to-r from-lime-400 to-teal-400 bg-clip-text text-transparent">
                        Interview GPT
                    </p>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {Links.map((link) => (
                        <p
                            key={link.id}
                            className="relative text-lg cursor-pointer hover:text-lime-400 transition-all after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-lime-400 after:transition-all"
                        >
                            {link.title}
                        </p>
                    ))}
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <button className="bg-gradient-to-r from-lime-400 to-teal-400 py-2.5 px-6 rounded-full text-black font-semibold hover:shadow-[0_0_10px_#84cc16] transition-all">
                        Start Interview
                    </button>
                    <UserButton afterSignOutUrl="/" />
                </div>

                {/* Mobile Menu Icon */}
                <div
                    className="md:hidden flex flex-col gap-[5px] cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span
                        className={`w-6 h-[2px] bg-white transition-all ${menuOpen ? "rotate-45 translate-y-[6px]" : ""
                            }`}
                    />
                    <span
                        className={`w-6 h-[2px] bg-white transition-all ${menuOpen ? "opacity-0" : ""
                            }`}
                    />
                    <span
                        className={`w-6 h-[2px] bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
                            }`}
                    />
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden mt-4 flex flex-col items-center gap-4 bg-black/70 border border-white/10 rounded-2xl py-5 backdrop-blur-md">
                    {Links.map((link) => (
                        <p
                            key={link.id}
                            className="text-lg cursor-pointer hover:text-lime-400 transition-all"
                        >
                            {link.title}
                        </p>
                    ))}
                    <button className="bg-gradient-to-r from-lime-400 to-teal-400 py-2 px-6 rounded-full text-black font-semibold hover:shadow-[0_0_10px_#84cc16] transition-all">
                        Start Interview
                    </button>
                    <div className="mt-2">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default HomeNavbar;
