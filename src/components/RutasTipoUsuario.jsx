export const RutasTipoUsuario = ({ tipoUsuario }) => {

    console.log("testestsetest")

    if (tipoUsuario === "Administrador") {
        console.log(tipoUsuario)
        return (
            <>
                <Route index element={<AgregarAlumno />}></Route>
                <Route path="/alumno/agregar" element={<AgregarAlumno />}></Route>
                <Route path="/usuario/agregar" element={<AgregarUsuario />}></Route>
            </>
        )
    }
    else if (tipoUsuario === "Coordinador") {
        return (
            <>
                <Route index element={<AgregarAlumno />}></Route>
                <Route path="/alumno/agregar" element={<AgregarAlumno />}></Route>
            </>
        )
    }
    else if (tipoUsuario === "Maestro") {
        return (
            <>
                <Route index element={<AgregarAlumno />}></Route>
                <Route path="/alumno/agregar" element={<AgregarAlumno />}></Route>
            </>
        )
    }
}
