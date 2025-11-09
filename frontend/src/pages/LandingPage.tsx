import type React from "react";
import Navbar from "../components/Landing Page/Navbar";
import Hero from "../components/Landing Page/Hero";


const LandingPage: React.FC = () => {
    return (
        <div className="w-screen h-screen bg-black">
            <div className="w-full flex justify-center items-center">
                <div className="w-full flex flex-col items-center gap-10">
                    <Navbar />
                    <div className="max-w-6xl">
                        <Hero />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;