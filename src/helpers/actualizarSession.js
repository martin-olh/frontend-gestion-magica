export const actualizarSession = (usuario) => {
    sessionStorage.setItem("id", usuario.id)
    sessionStorage.setItem("email", usuario.email)
    sessionStorage.setItem("password", usuario.password)
    sessionStorage.setItem("nombre", usuario.nombre)
    sessionStorage.setItem("apellido", usuario.apellido)
    sessionStorage.setItem("telefono", usuario.telefono)
    sessionStorage.setItem("direccion", usuario.direccion)
    sessionStorage.setItem("tipoUsuario", usuario.tipoUsuario)
}