import type React from "react";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import HomeNavbar from "../components/Home/HomeNavbar";

const About: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useUser();
    const [userDetails, setUserDetails] = useState<any>();

    useEffect(() => {
        async function fetchUser() {
            setLoading(true);
            const res = await fetch("http://localhost:3000/", {
                headers: { Authorization: localStorage.getItem("token") as string },
            });
            const data = await res.json();

            // Assuming API returns user info (mocking extra data here)
            const assumedData = {
                ...data.user,
                detail: {
                    experience: "3 years",
                    current_orgainsation: "TechNova Pvt. Ltd.",
                    role: "Frontend Developer",
                },
                work_history: [
                    {
                        organisation_name: "TechNova Pvt. Ltd.",
                        role: "Frontend Developer",
                        from: "2023-06-01",
                        to: "Present",
                    },
                    {
                        organisation_name: "CloudSphere Solutions",
                        role: "React Intern",
                        from: "2022-01-01",
                        to: "2023-05-01",
                    },
                    {
                        organisation_name: "DigitalOrbit",
                        role: "UI Designer",
                        from: "2021-03-01",
                        to: "2021-12-31",
                    },
                    {
                        organisation_name: "Self Learning Projects",
                        role: "MERN Developer (Freelance)",
                        from: "2020-06-01",
                        to: "2021-02-01",
                    },
                ],
            };

            setUserDetails(assumedData);
            setLoading(false);
        }

        if (user) fetchUser();
    }, [user]);

    if (loading || !userDetails)
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <Loader color="white" className="animate-spin" />
            </div>
        );

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-zinc-900 text-white">
            {/* Top Navbar */}
            <HomeNavbar />

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-6 py-10">
                {/* Profile Section */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg text-center">
                    <img
                        src={userDetails?.avatar}
                        alt="User Avatar"
                        className="w-28 h-28 rounded-full border-2 border-lime-400 mx-auto mb-4"
                    />
                    <h1 className="text-3xl font-bold">{userDetails?.name}</h1>
                    <p className="text-sm text-gray-400">@{userDetails?.username}</p>
                    <p className="text-sm text-gray-400 mt-1">{userDetails?.email}</p>

                    {/* Professional Details */}
                    <div className="mt-6 bg-white/5 p-4 rounded-lg border border-white/10 text-left">
                        <h2 className="text-xl font-semibold text-lime-400 mb-2">
                            Professional Details
                        </h2>
                        <p>
                            <span className="font-semibold">Experience:</span>{" "}
                            {userDetails?.detail?.experience}
                        </p>
                        <p>
                            <span className="font-semibold">Current Organisation:</span>{" "}
                            {userDetails?.detail?.current_orgainsation}
                        </p>
                        <p>
                            <span className="font-semibold">Role:</span>{" "}
                            {userDetails?.detail?.role}
                        </p>
                    </div>
                </div>

                {/* Work History Section */}
                <div className="mt-10 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg">
                    <h2 className="text-2xl font-semibold text-lime-400 mb-4">
                        Work History
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userDetails?.work_history?.map((job: any, index: number) => (
                            <div
                                key={index}
                                className="bg-black/30 p-4 rounded-xl border border-white/10 hover:border-lime-400 transition-all"
                            >
                                <h3 className="text-lg font-semibold">{job.organisation_name}</h3>
                                <p className="text-sm text-gray-400 mb-1">{job.role}</p>
                                <p className="text-xs text-gray-500">
                                    {new Date(job.from).toLocaleDateString()} →{" "}
                                    {job.to === "Present"
                                        ? "Present"
                                        : new Date(job.to).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default About;
