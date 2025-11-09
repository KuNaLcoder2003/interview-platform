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
        <nav className="w-full p-3 max-w-7xl mx-auto text-white">
            <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">
                    <img src="/logo.svg" alt="logo" className="w-8 h-8" />
                    <p className="text-2xl font-semibold">Interview GPT</p>
                </div>


                <div className="hidden md:flex items-center gap-8">
                    {Links.map((link) => (
                        <p
                            key={link.id}
                            className="text-lg cursor-pointer hover:font-semibold hover:text-lime-400 transition-all"
                        >
                            {link.title}
                        </p>
                    ))}
                </div>


                <div className="hidden md:flex items-center gap-4">
                    <button className="bg-lime-500 py-2.5 px-6 rounded-full text-center text-white font-semibold hover:bg-lime-600 hover:scale-[1.03] transition-all">
                        Start Interview
                    </button>
                    <UserButton afterSignOutUrl="/" />
                </div>


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

            {menuOpen && (
                <div className="md:hidden mt-4 flex flex-col items-center gap-4 bg-black/80 py-4 rounded-xl">
                    {Links.map((link) => (
                        <p
                            key={link.id}
                            className="text-lg cursor-pointer hover:font-semibold hover:text-lime-400 transition-all"
                        >
                            {link.title}
                        </p>
                    ))}
                    <button className="bg-lime-500 py-2 px-6 rounded-full text-white font-semibold hover:bg-lime-600 transition-all">
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
