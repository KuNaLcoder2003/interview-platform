import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import SignInPage from "./pages/SignInPage";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import "./App.css"
import About from "./pages/About";
import Interview from "./components/Interview/Interview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/interview/:id" element={<Interview />} />
        <Route
          path="/home"
          element={
            <>
              <SignedIn>
                <Home />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route path="/sign-in/*" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
