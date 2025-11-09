import { useUser, useAuth, } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import HomeNavbar from "../components/Home/HomeNavbar";
import { LoaderCircle } from "lucide-react";

export default function Home() {
    const [loading, setLoading] = useState<Boolean>(false);
    const { user } = useUser();
    const { getToken } = useAuth();
    async function setAuthToken() {
        setLoading(true);
        const token = await getToken();
        console.log(user);
        console.log(token)
        localStorage.setItem("token", `Bearer ${token}`)
        setLoading(false);
    }
    useEffect(() => {
        setAuthToken()
    }, [user])
    return (
        <div className="flex items-center gap-4" style={{ padding: "40px" }}>
            {
                loading ? <LoaderCircle color="white" /> : <HomeNavbar />
            }
        </div>
    );
}
