import React, { useState } from "react";
import Button from "./Button";

const Links = [
    { id: 1, title: "How it works" },
    { id: 2, title: "Features" },
    { id: 3, title: "Pricing" },
    { id: 4, title: "Blog" },
];

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="w-full p-3 max-w-7xl mx-auto text-white">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src="" alt="logo" className="w-8 h-8" />
                    <p className="text-2xl font-semibold">Interview GPT</p>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {Links.map((link) => (
                        <p
                            key={link.id}
                            className="text-lg cursor-pointer hover:font-semibold hover:text-xl hover:text-stone-300 "
                        >
                            {link.title}
                        </p>
                    ))}
                </div>

                {/* Buttons (hidden on small screens) */}
                <div className="hidden md:flex items-center gap-4">
                    <Button
                        className="bg-white/20 py-2.5 px-6 rounded-full text-center text-white font-thin cursor-pointer hover:bg-white/30 hover:scale-[1.03]"
                        text="Waitlist"
                    />
                    <Button
                        className="bg-lime-500 py-2.5 px-6 rounded-full text-center text-white font-bold hover:scale-[1.03] cursor-pointer border border-lime-400 "
                        text="Contact"
                    />
                </div>

                {/* Hamburger (visible on mobile) */}
                <div
                    className="md:hidden flex flex-col gap-[5px] cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className={`w-6 h-[2px] bg-white transition-all ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
                    <span className={`w-6 h-[2px] bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
                    <span className={`w-6 h-[2px] bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden mt-4 flex flex-col items-center gap-4 bg-black/80 py-4 rounded-xl">
                    {Links.map((link) => (
                        <p
                            key={link.id}
                            className="text-lg cursor-pointer hover:font-semibold hover:text-stone-300 transition-all"
                        >
                            {link.title}
                        </p>
                    ))}
                    <div className="flex flex-col items-center gap-3 mt-2">
                        <Button
                            className="bg-white/20 py-2 px-6 rounded-full text-center text-white font-thin hover:bg-white/30 transition-all"
                            text="Waitlist"
                        />
                        <Button
                            className="bg-lime-500 py-2 px-6 rounded-full text-center text-white font-bold hover:scale-[1.03] border border-lime-400 transition-all"
                            text="Contact"
                        />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
