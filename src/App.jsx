import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'
import { AgregarAlumno } from './components/AgregarAlumno'
import { AgregarUsuario } from './components/AgregarUsuario'
import { Home } from './components/Home'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AgregarCurso } from './components/AgregarCurso'
import { ListadoUsuarios } from './components/ListadoUsuarios'
import { EditarUsuario } from './components/EditarUsuario'
import { SettingsUsuario } from './components/SettingsUsuario'

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
          <Route path="/usuarios/agregar" element={<AgregarUsuario />}></Route>
          <Route path="/usuarios/listado" element={<ListadoUsuarios />}></Route>
          <Route path="/usuarios/editar/:id" element={<EditarUsuario />}></Route>
          <Route path="/usuarios/settings/:id" element={<SettingsUsuario />}></Route>
          <Route path="/alumnos/agregar" element={<AgregarAlumno />}></Route>
          <Route path="/cursos/agregar" element={<AgregarCurso />}></Route>
        </Route>
        <Route path="*" element={<Navigate replace to={"/"}></Navigate>} />

      </Routes>
    </BrowserRouter >
  )
}

// <Route path="/usuarios/agregar" element={<ProtectedRoute component={AgregarUsuario} allowedRoles={['Administrador']} />}></Route>
//           <Route path="/usuarios/listado" element={<ProtectedRoute component={ListadoUsuarios} allowedRoles={['Administrador']} />}></Route>
//           <Route path="/usuarios/editar/:id" element={<ProtectedRoute component={EditarUsuario} allowedRoles={['Administrador']} />}></Route>
//           <Route path="/usuarios/settings/:id" element={<ProtectedRoute component={SettingsUsuario} allowedRoles={['Administrador', 'Maestro', 'Coordinador']} />}></Route>
//           <Route path="/alumnos/agregar" element={<ProtectedRoute component={AgregarAlumno} allowedRoles={['Administrador', 'Maestro', 'Coordinador']} />}></Route>
//           <Route path="/cursos/agregar" element={<ProtectedRoute component={AgregarCurso} allowedRoles={['Administrador']} />}></Route>