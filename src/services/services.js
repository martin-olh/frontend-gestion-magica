const urlBase = 'https://localhost:7250/api'

// https://colegiocirculomagicoapi.azurewebsites.net/api
// https://localhost:7250/api


//LOGIN
//---------------------------------------
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

//USUARIOS
//---------------------------------------
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

//ALUMNOS
//---------------------------------------

export const obtenerAlumnosService = (token) => {
    let myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", `Bearer ${token}`)

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    }

    return fetch(`${urlBase}/alumnos`, requestOptions)
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

export const agregarAlumnoService = (token, a) => {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", `Bearer ${token}`)

    let raw = JSON.stringify({
        "id": a.id,
        "cedula": a.cedula,
        "nombre": a.nombre,
        "apellido": a.apellido,
        "direccion": a.direccion,
        "fechaNac": a.fechaNac,
        "infoDetalle": {
            "id": a.infoDetalle.id,
            "mutualista": a.infoDetalle.mutualista,
            "emergencia": a.infoDetalle.emergencia,
            "certVacuna": a.infoDetalle.certVacuna,
            "hermanos": a.infoDetalle.hermanos,
            "personasHogar": a.infoDetalle.personasHogar,
            "embarazo": a.infoDetalle.embarazo,
            "crecimiento": a.infoDetalle.crecimiento,
            "peso": a.infoDetalle.peso,
            "lactancia": a.infoDetalle.lactancia,
            "esfinteres": a.infoDetalle.esfinteres,
            "destete": a.infoDetalle.destete,
            "crecimiento": a.infoDetalle.crecimiento,
            "marcha": a.infoDetalle.marcha,
            "primerasPalabras": a.infoDetalle.primerasPalabras,
            "enfermedades": a.infoDetalle.enfermedades,
            "observaciones": a.infoDetalle.observaciones,
            "logrosEsperados": a.infoDetalle.logrosEsperados,
            "horarioConcurre": a.infoDetalle.horarioConcurre,
            "personaQueRetira": a.infoDetalle.personaQueRetira,
            "telPersonaQueRetira": a.infoDetalle.telPersonaQueRetira,
            "habilitadoPublicidad": a.infoDetalle.habilitadoPublicidad
        },
        "infoDetalleId": a.infoDetalle.id,
        "responsables": [
            {
                "id": a.responsables[0].id,
                "nombre": a.responsables[0].nombre,
                "apellido": a.responsables[0].apellido,
                "telefono": a.responsables[0].telefono,
                "email": a.responsables[0].email,
                "ocupacion": a.responsables[0].ocupacion,
                "horarioTrabajo": a.responsables[0].horarioTrabajo,
                "horarioNino": a.responsables[0].horarioNino
            },
            {
                "id": a.responsables[1].id,
                "nombre": a.responsables[1].nombre,
                "apellido": a.responsables[1].apellido,
                "telefono": a.responsables[1].telefono,
                "email": a.responsables[1].email,
                "ocupacion": a.responsables[1].ocupacion,
                "horarioTrabajo": a.responsables[1].horarioTrabajo,
                "horarioNino": a.responsables[1].horarioNino
            }
        ]
    })

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    }

    return fetch(`${urlBase}/alumnos/`, requestOptions)
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