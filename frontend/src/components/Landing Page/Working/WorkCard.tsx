import type React from "react";


interface Props {
    img: string,
    step: number,
    title: string,
    desc: string
}

const WorkCard: React.FC<Props> = ({ img, step, title, desc }) => {
    return (
        <div className="flex items-center justify-center p-6">
            <div className="bg-[#0c0c0c] rounded-2xl p-6 w-[350px] h-auto flex flex-col items-start gap-6 border border-white/5 shadow-[0_0_20px_rgba(0,0,0,0.5)]">


                <div className="relative w-full flex justify-center h-[300px] p-2 bg-black rounded-xl">
                    <div className="h-full">
                        <img src={img} />
                    </div>
                </div>


                <div className="flex items-center gap-2 bg-lime-500/10 text-lime-400 text-sm px-3 py-1 rounded-full shadow-[0_0_10px_rgba(132,204,22,0.5)]">
                    <span className="w-2 h-2 bg-lime-400 rounded-full"></span>
                    <p className="font-medium">Step {step}</p>
                </div>


                <div>
                    <h2 className="text-white text-2xl font-semibold mb-2">{title}</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        {desc}
                    </p>
                </div>
            </div>
        </div>

    )
}

export default WorkCard;