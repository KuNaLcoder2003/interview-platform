import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { LoaderCircle } from "lucide-react";
import ProfileForm from "../components/forms/Details";
import Dashboard from "../components/DashBoard";

export default function Home() {
    const [loading, setLoading] = useState<boolean>(true);

    const [isFilled, setIsFilled] = useState<boolean>(false);
    const { getToken } = useAuth();

    async function setAuthToken() {
        try {
            const token = await getToken();
            localStorage.setItem("token", `Bearer ${token}`);

            const res = await fetch("http://localhost:3000/api/v1/user/check", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            setIsFilled(data.filled);
        } catch (error) {
            console.error("Auth check failed:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setAuthToken();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4 text-white">
                <LoaderCircle className="animate-spin" size={40} color="lime" />
                <p className="text-gray-300 text-sm">Setting up your environment...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen min-w-full flex text-white">
            {/* Sidebar + Main Content */}
            {!isFilled ? (
                <div className="flex flex-col items-center min-w-full p-8">
                    <div className="w-full max-w-xl mt-16">
                        <ProfileForm />
                    </div>
                </div>
            ) : (
                <Dashboard />
            )}
        </div>
    );
}
