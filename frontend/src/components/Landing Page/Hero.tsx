import type React from "react";
import HeroToast from "./HeroToast";
import HeroText from "./HeroText";
import Button from "./Button";
import HeroImage from "./HeroImage";
import Working from "./Working/Woking";


const Hero: React.FC = () => {
    return (
        <>
            <div className="w-full flex flex-col items-center gap-4 mt-10">
                <HeroToast />
                <div className="flex flex-col items-center gap-6">
                    <HeroText />
                    <Button className="bg-lime-400 shadow-md/80 shadow-lime-300 cursor-pointer py-2 px-6 rounded-full text-center text-black font-thin hover:scale-[1.03]  w-[30%]" text="Get started for free" />
                </div>
                <HeroImage />

            </div>
            <Working />
        </>


    )
}

export default Hero;