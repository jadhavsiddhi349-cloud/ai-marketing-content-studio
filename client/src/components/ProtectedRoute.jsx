import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    const user = localStorage.getItem(
        "brandai_current_user"
    );

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return children;
}

export default ProtectedRoute;