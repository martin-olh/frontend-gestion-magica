import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from './components/Login';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Login />}></Route>

        <Route path="*" element={<Navigate replace to={"/"}></Navigate>} />
      </Routes>
    </BrowserRouter >
  )
}

{/* <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registro" element={<Registro />}></Route>
        <Route path="/" element={<Login />}>
          <Route index element={<AgregarPersona />}></Route>
          <Route path="/agregar" element={<AgregarPersona />}></Route>
          <Route path="/listado" element={<ListadoPersonas />}></Route>
          <Route path="/censados" element={<CensadosTotales />}></Route>
          <Route path="/analisis" element={<Analisis />}></Route>
        </Route>

        <Route path="*" element={<Navigate replace to={"/"}></Navigate>} />
      </Routes>
    </BrowserRouter > */}
