import { createContext, useEffect, useState } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';

const AuthContext = createContext({
    signedIn: false,
    token: "",
    userDetails: {},

})

const AuthContextProvider = ({ children }: any) => {
    const { isSignedIn, user } = useUser();
    const { getToken } = useAuth()
    const [userDetails, setUserDetails] = useState<any>(user ? user : "");
    const [signedIn, setSignedIn] = useState<boolean>(false)
    const [token, setToken] = useState<string>("");


    useEffect(() => {
        async function syncAuthState() {
            console.log('IS signed in : ', isSignedIn)
            if (isSignedIn && user) {
                const authToken = await getToken();
                setToken(authToken as string);
                setSignedIn(true);
                setUserDetails(user);
                localStorage.setItem("token", `Bearer ${authToken}`);
            } else {

                setToken("");
                setSignedIn(false);
                setUserDetails({});
                localStorage.removeItem("token");
            }
        }

        syncAuthState();
    }, [isSignedIn, user]);
    return (
        <AuthContext.Provider value={{ signedIn, token, userDetails }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };

