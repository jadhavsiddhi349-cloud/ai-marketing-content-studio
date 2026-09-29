import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import BrandBrain from "./pages/BrandBrain";
import CreateCampaign from "./pages/CreateCampaign";
import CampaignDetails from "./pages/CampaignDetails";
import Dashboard from "./pages/Dashboard";

import "./index.css";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* ================= PUBLIC ================= */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />


                {/* ================= PROTECTED ================= */}

                <Route
                    path="/brand-brain"
                    element={
                        <ProtectedRoute>
                            <BrandBrain />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/create-campaign"
                    element={
                        <ProtectedRoute>
                            <CreateCampaign />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/campaign/:id"
                    element={
                        <ProtectedRoute>
                            <CampaignDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;