import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'
import { AgregarAlumno } from './components/AgregarAlumno'
import { AgregarUsuario } from './components/AgregarUsuario'



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
          {
            tipoUsuario === 'Administrador' &&
            <>
              <Route path="/alumno/agregar" element={<AgregarAlumno />}></Route>
              <Route path="/usuario/agregar" element={<AgregarUsuario />}></Route>
            </>
          }
          {
            tipoUsuario === 'Coordinador' &&
            <>
              <Route path="/alumno/agregar" element={<AgregarAlumno />}></Route>
            </>
          }
          {
            tipoUsuario === 'Maestro' &&
            <>
              <Route path="/alumno/agregar" element={<AgregarAlumno />}></Route>
            </>
          }

        </Route>
        <Route path="*" element={<Navigate replace to={"/"}></Navigate>} />
      </Routes>
    </BrowserRouter >
  )
}

{/* <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registro" element={<Registro />}></Route>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<AgregarPersona />}></Route>
          <Route path="/agregar" element={<AgregarPersona />}></Route>
          <Route path="/listado" element={<ListadoPersonas />}></Route>
          <Route path="/censados" element={<CensadosTotales />}></Route>
          <Route path="/analisis" element={<Analisis />}></Route>
        </Route>

        <Route path="*" element={<Navigate replace to={"/"}></Navigate>} />
      </Routes>
    </BrowserRouter > */}
