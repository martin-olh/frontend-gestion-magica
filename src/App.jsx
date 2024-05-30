import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'
import { AgregarAlumno } from './components/AgregarAlumno'
import { AgregarUsuario } from './components/AgregarUsuario'
import { Home } from './components/Home'
import { ProtectedRoute } from './components/ProtectedRoute'

export const App = () => {

  const [tipoUsuario, setTipoUsuario] = useState(undefined)

  useEffect(() => {
    const tipoUsuarioAux = sessionStorage.getItem('tipoUsuario')
    setTipoUsuario(tipoUsuarioAux)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/alumno/agregar" element={<ProtectedRoute component={AgregarAlumno} allowedRoles={['Administrador', 'Maestro', 'Coordinador']} />}></Route>
          <Route path="/usuario/agregar" element={<ProtectedRoute component={AgregarUsuario} allowedRoles={['Administrador']} />}></Route>
        </Route>
        <Route path="*" element={<Navigate replace to={"/"}></Navigate>} />

      </Routes>
    </BrowserRouter >
  )
}