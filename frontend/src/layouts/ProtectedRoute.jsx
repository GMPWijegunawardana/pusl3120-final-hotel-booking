import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userRole = user.role || 'user';

    if (!roles.includes(userRole)) {
        return <Navigate to="/auth/login" replace />
    }

    return children
}

export default ProtectedRoute;