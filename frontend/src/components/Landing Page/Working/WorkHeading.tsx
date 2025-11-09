import type React from "react";
import { PlayIcon } from "lucide-react";

const WorkHeading: React.FC = () => {
    return (
        <div className="flex flex-col items-baseline gap-2 p-1">
            <div className="flex items-center gap-2">
                <div className="bg-lime-400 flex items-center justify-center p-2 rounded-full h-[30px] w-[30px]">
                    <PlayIcon color="black" fill="black" className="cursor-pointer" />
                </div>
                <p className="text-lime-400 cursor-pointer">Watch video</p>
            </div>
            <h3 className="text-4xl text-white p-1">How InterviewGPT works</h3>
        </div>
    )
}

export default WorkHeading;