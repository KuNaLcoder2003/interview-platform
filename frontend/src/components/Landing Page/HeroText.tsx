import type React from "react";

const HeroText: React.FC = () => {
    return (
        <div className="w-full lg:max-w-4xl m-auto flex flex-col items-center gap-3 px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white text-center font-bold leading-tight">
                Take your interview prep to the next level with{" "}
                <span className="bg-gradient-to-r from-lime-400 to-lime-500 bg-clip-text text-transparent">
                    InterviewGPT
                </span>
            </h1>

            <p className="text-stone-300 text-base sm:text-lg md:text-xl lg:text-2xl text-center font-thin mt-2 w-full sm:w-4/5 md:w-3/5 lg:w-1/2">
                All your interview prep, finally in one place — practice, learn, and land your dream job with confidence.
            </p>
        </div>
    );
};

export default HeroText;
