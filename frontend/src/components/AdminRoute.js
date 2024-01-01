import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";

const AdminRoute = ({ children }) => {
    const { user } = useSelector((state) => state.user);

    if (user.role !== "admin") {
        return <Navigate to="/" />;
    }

    return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default AdminRoute;
