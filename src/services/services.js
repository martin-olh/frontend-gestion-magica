const urlBase = 'https://colegiocirculomagicoapi.azurewebsites.net/api'

// https://localhost:7250/api



export const loginService = (email, password) => {

    let myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    let raw = JSON.stringify({
        "email": email,
        "password": password,
    })

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    }

    return fetch(`${urlBase}/Usuarios/login`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.mensaje ? error.mensaje : "Hubo un error")
                })
            }
            return response.json()
        })
        .then(result => result)
        .catch((error) => {
            throw new Error(error ? error : "Hubo un error")
        }
        )
}

export const obtenerUsuariosService = (token) => {

    let myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", `Bearer ${token}`)

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    }

    return fetch(`${urlBase}/usuarios`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.mensaje ? error.mensaje : "Hubo un error")
                })
            }
            return response.json()
        })
        .then(result => result)
        .catch((error) => {
            throw new Error(error ? error : "Hubo un error")
        }
        )
}

export const agregarUsuarioService = (token, u) => {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", `Bearer ${token}`)

    let raw = JSON.stringify({
        "id": u.id,
        "email": u.email,
        "password": u.password,
        "nombre": u.nombre,
        "apellido": u.apellido,
        "telefono": u.telefono,
        "direccion": u.direccion,
        "tipoUsuario": u.tipoUsuario
    })

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    }

    return fetch(`${urlBase}/usuarios/`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.mensaje ? error.mensaje : "Hubo un error")
                })
            }
            return response.json()
        })
        .then(result => result)
        .catch((error) => {
            throw new Error(error ? error : "Hubo un error")
        }
        )

}

export const eliminarUsuarioService = (id, token) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", `Bearer ${token}`)

    let requestOptions = {
        method: 'DELETE',
        headers: myHeaders
    }

    return fetch(`${urlBase}/usuarios/${id}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.mensaje ? error.mensaje : "Hubo un error")
                })
            }
            return response
        })
        .then(result => result)
        .catch((error) => {
            throw new Error(error ? error : "Hubo un error")
        }
        )

}

export const actualizarUsuarioService = (id, usuario, token) => {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", `Bearer ${token}`)

    let raw = JSON.stringify({
        "id": usuario.id,
        "email": usuario.email,
        "password": usuario.password,
        "nombre": usuario.nombre,
        "apellido": usuario.apellido,
        "telefono": usuario.telefono,
        "direccion": usuario.direccion,
        "tipoUsuario": usuario.tipoUsuario
    })

    let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw
    }

    return fetch(`${urlBase}/usuarios/${id}`, requestOptions)
        .then(response => {
            console.log(response)
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.mensaje ? error.mensaje : "Hubo un error")
                })
            }
            return response
        })
        .then(result => result)
        .catch((error) => {
            throw new Error(error ? error : "Hubo un error")
        }
        )

}