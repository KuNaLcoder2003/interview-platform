import type React from "react";
import WorkHeading from "./WorkHeading";
import WorkCard from "./WorkCard";
import Section from "./Section";

const Working: React.FC = () => {
    return (
        <div className="max-w-8xl flex flex-col items-baseline gap-2 -mt-25">
            <WorkHeading />
            <div className="p-2 flex flex-wrap lg:flex-nowrap items-center gap-4 w-full">
                <WorkCard
                    img="https://framerusercontent.com/images/P1qNt7Ekw32hupYRsI2SCBlCfy4.png?scale-down-to=1024"
                    title="Fill your details"
                    desc="Start by entering your personal information, experience, and job role to create your profile."
                    step={1}
                />

                <WorkCard
                    img="https://framerusercontent.com/images/hMPoyCv6VmDZsVOXxuAY9UT3oU.png?scale-down-to=1024"
                    title="Take Interviews"
                    desc="Participate in interviews tailored to your skills and showcase your expertise with confidence."
                    step={2}
                />

                <WorkCard
                    img="https://framerusercontent.com/images/i6ZM7EQvDGC7nqAwDL2yF68lM.png?scale-down-to=1024"
                    title="Track your journey"
                    desc="Monitor your progress, review past interviews, and see how your career path evolves over time."
                    step={3}
                />
            </div>

            <div className="w-full flex items-center ">
                <Section />
            </div>

        </div>
    )
}

export default Working;