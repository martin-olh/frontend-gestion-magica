import { Routes, Route, Navigate } from "react-router-dom"
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

  return (

    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/usuarios/agregar" element={<ProtectedRoute component={AgregarUsuario} allowedRoles={['Administrador']} />}></Route>
        <Route path="/usuarios/listado" element={<ProtectedRoute component={ListadoUsuarios} allowedRoles={['Administrador']} />}></Route>
        <Route path="/usuarios/editar/:id" element={<ProtectedRoute component={EditarUsuario} allowedRoles={['Administrador']} />}></Route>
        <Route path="/usuarios/settings/:id" element={<ProtectedRoute component={SettingsUsuario} allowedRoles={['Administrador', 'Maestro', 'Coordinador']} />}></Route>
        <Route path="/alumnos/agregar" element={<ProtectedRoute component={AgregarAlumno} allowedRoles={['Administrador', 'Maestro', 'Coordinador']} />}></Route>
        <Route path="/cursos/agregar" element={<ProtectedRoute component={AgregarCurso} allowedRoles={['Administrador']} />}></Route>
      </Route>
      <Route path="*" element={<Navigate replace to={"/"}></Navigate>} />

    </Routes>

  )
}