import {
    Navigate,
    useLocation
} from "react-router-dom";


function ProtectedRoute({ children }) {

    const location = useLocation();

    const user =
        localStorage.getItem(
            "brandai_current_user"
        );


    if (!user) {

        return (
            <Navigate
                to="/login"
                state={{
                    from: location
                }}
                replace
            />
        );

    }


    return children;
}


export default ProtectedRoute;