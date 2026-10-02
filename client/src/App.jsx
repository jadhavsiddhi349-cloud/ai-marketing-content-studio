// import {
//     BrowserRouter,
//     Routes,
//     Route,
//     useLocation
// } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import ProtectedRoute from "./components/ProtectedRoute";

// import Home from "./pages/Home";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import BrandBrain from "./pages/BrandBrain";
// import CreateCampaign from "./pages/CreateCampaign";
// import CampaignDetails from "./pages/CampaignDetails";
// import Dashboard from "./pages/Dashboard";
// import CampaignCalendar from "./pages/CampaignCalendar";
// import ContentChecker from "./pages/ContentChecker";
// import AIAssistant from "./pages/AIAssistant";
// import Settings from "./pages/Settings";

// import "./index.css";


// function AppContent() {
//     const location = useLocation();

//     const isDashboard =
//         location.pathname === "/dashboard";

//     return (
//         <>
//             {!isDashboard && <Navbar />}

//             <Routes>

//                 <Route
//                     path="/"
//                     element={<Home />}
//                 />

//                 <Route
//                     path="/signup"
//                     element={<Signup />}
//                 />

//                 <Route
//                     path="/login"
//                     element={<Login />}
//                 />

//                 <Route
//                     path="/brand-brain"
//                     element={
//                         <ProtectedRoute>
//                             <BrandBrain />
//                         </ProtectedRoute>
//                     }
//                 />

//                 <Route
//                     path="/create-campaign"
//                     element={
//                         <ProtectedRoute>
//                             <CreateCampaign />
//                         </ProtectedRoute>
//                     }
//                 />

//                 <Route
//                     path="/campaign/:id"
//                     element={
//                         <ProtectedRoute>
//                             <CampaignDetails />
//                         </ProtectedRoute>
//                     }
//                 />

//                 <Route
//                     path="/dashboard"
//                     element={
//                         <ProtectedRoute>
//                             <Dashboard />
//                         </ProtectedRoute>
//                     }
//                 />

//                 <Route
//                     path="/campaign-calendar"
//                     element={
//                         <ProtectedRoute>
//                             <CampaignCalendar />
//                         </ProtectedRoute>
//                     }
//                 />
//                 <Route
//                     path="/content-checker"
//                     element={
//                         <ProtectedRoute>
//                             <ContentChecker />
//                         </ProtectedRoute>
//                     }
//                 />
//                 <Route
//                     path="/ai-assistant"
//                     element={
//                         <ProtectedRoute>
//                             <AIAssistant />
//                         </ProtectedRoute>
//                     }
//                 />
//                 <Route
//                     path="/settings"
//                     element={
//                         <ProtectedRoute>
//                             <Settings />
//                         </ProtectedRoute>
//                     }
//                 />

//             </Routes>
//         </>
//     );
// }


// function App() {
//     return (
//         <BrowserRouter>
//             <AppContent />
//         </BrowserRouter>
//     );
// }


// // export default App;
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import FeatureDetails from "./pages/FeatureDetails";

import BrandBrain from "./pages/BrandBrain";
import CreateCampaign from "./pages/CreateCampaign";
import CampaignDetails from "./pages/CampaignDetails";
import Dashboard from "./pages/Dashboard";
import CampaignCalendar from "./pages/CampaignCalendar";
import ContentChecker from "./pages/ContentChecker";
import AIAssistant from "./pages/AIAssistant";
import Settings from "./pages/Settings";

import "./index.css";




function AppContent() {

    const location = useLocation();

    const isDashboard =
        location.pathname === "/dashboard";

    const isAuthPage =
        location.pathname === "/login" ||
        location.pathname === "/signup";

    return (
        <>
            {!isDashboard && !isAuthPage && <Navbar />}

            <Routes>

                {/* =========================================
                    HOME
                ========================================= */}

                <Route
                    path="/"
                    element={<Home />}
                />


                {/* =========================================
                    AUTH
                ========================================= */}

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* =========================================
                    PUBLIC FEATURE INFORMATION PAGES
                ========================================= */}

                <Route
                    path="/feature/:feature"
                    element={<FeatureDetails />}
                />


                {/* =========================================
                    PROTECTED FEATURES
                ========================================= */}

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


                <Route
                    path="/campaign-calendar"
                    element={
                        <ProtectedRoute>
                            <CampaignCalendar />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/content-checker"
                    element={
                        <ProtectedRoute>
                            <ContentChecker />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/ai-assistant"
                    element={
                        <ProtectedRoute>
                            <AIAssistant />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </>
    );
}


function App() {

    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}


export default App;