import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, allowedRoles }) => {

    const tipoUsuario = sessionStorage.getItem('tipoUsuario');

    return (
        allowedRoles.includes(tipoUsuario) ? <Component /> : <Navigate to={"/dashboard"} />
    );
}

