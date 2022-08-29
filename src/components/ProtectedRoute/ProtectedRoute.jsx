import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    if (!JSON.parse(window.localStorage.getItem("userMe"))?.permission.includes("ADMIN")) {
        // user is not authenticated
        return <Navigate to="/teaching-materials-students" />;
    }
    return children;
};

export default ProtectedRoute;