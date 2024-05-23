import React from 'react'
import { jwtDecode } from "jwt-decode";

export const jwtHelper = (token) => {
    return {
        email: jwtDecode(token).email,
        nombre: jwtDecode(token).nombre,
        apellido: jwtDecode(token).apellido,
        tipoUsuario: jwtDecode(token).tipoUsuario,
        id: jwtDecode(token).id
    }
}
