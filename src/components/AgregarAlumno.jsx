import React from 'react'
import { useNavigate } from 'react-router-dom'

export const AgregarAlumno = () => {

    const navigate = useNavigate();
    const rol = sessionStorage.getItem('tipoUsuario')

    if (rol !== "Administrador") {
        navigate('/dashboard')
    }

    return (
        <div>AgregarAlumno</div>
    )
}
