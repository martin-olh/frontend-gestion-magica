const urlBase = 'https://colegiocirculomagicoapi.azurewebsites.net/api'

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

    let infoDetalle = {
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
        "marcha": a.infoDetalle.marcha,
        "primerasPalabras": a.infoDetalle.primerasPalabras,
        "enfermedades": a.infoDetalle.enfermedades,
        "observaciones": a.infoDetalle.observaciones,
        "logrosEsperados": a.infoDetalle.logrosEsperados,
        "horarioConcurre": a.infoDetalle.horarioConcurre,
        "personaQueRetira": a.infoDetalle.personaQueRetira,
        "telPersonaQueRetira": a.infoDetalle.telPersonaQueRetira,
        "habilitadoPublicidad": a.infoDetalle.habilitadoPublicidad
    };

    let responsables = a.responsables.map(responsable => ({
        "id": responsable.id,
        "nombre": responsable.nombre,
        "apellido": responsable.apellido,
        "cedula": responsable.cedula,
        "telefono": responsable.telefono,
        "email": responsable.email,
        "ocupacion": responsable.ocupacion,
        "horarioTrabajo": responsable.horarioTrabajo,
        "horarioNino": responsable.horarioNino
    }));

    let raw = JSON.stringify({
        "id": a.id,
        "cedula": a.cedula,
        "nombre": a.nombre,
        "apellido": a.apellido,
        "direccion": a.direccion,
        "fechaNac": a.fechaNac,
        "infoDetalle": infoDetalle,
        "infoDetalleId": a.infoDetalle.id,
        "responsables": responsables
    });

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

export const actualizarAlumnoService = (id, a, token) => {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", `Bearer ${token}`)


    let infoDetalle = {
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
        "marcha": a.infoDetalle.marcha,
        "primerasPalabras": a.infoDetalle.primerasPalabras,
        "enfermedades": a.infoDetalle.enfermedades,
        "observaciones": a.infoDetalle.observaciones,
        "logrosEsperados": a.infoDetalle.logrosEsperados,
        "horarioConcurre": a.infoDetalle.horarioConcurre,
        "personaQueRetira": a.infoDetalle.personaQueRetira,
        "telPersonaQueRetira": a.infoDetalle.telPersonaQueRetira,
        "habilitadoPublicidad": a.infoDetalle.habilitadoPublicidad
    };

    let responsables = a.responsables.map(responsable => ({
        "id": responsable.id,
        "nombre": responsable.nombre,
        "apellido": responsable.apellido,
        "cedula": responsable.cedula,
        "telefono": responsable.telefono,
        "email": responsable.email,
        "ocupacion": responsable.ocupacion,
        "horarioTrabajo": responsable.horarioTrabajo,
        "horarioNino": responsable.horarioNino
    }));

    console.log(responsables)

    let raw = JSON.stringify({
        "id": a.id,
        "cedula": a.cedula,
        "nombre": a.nombre,
        "apellido": a.apellido,
        "direccion": a.direccion,
        "fechaNac": a.fechaNac,
        "infoDetalle": infoDetalle,
        "infoDetalleId": a.infoDetalle.id,
        "responsables": responsables
    });


    let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw
    }

    console.log(requestOptions.body)

    return fetch(`${urlBase}/alumnos/${id}`, requestOptions)
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

export const eliminarAlumnoService = (id, token) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", `Bearer ${token}`)

    let requestOptions = {
        method: 'DELETE',
        headers: myHeaders
    }

    return fetch(`${urlBase}/alumnos/${id}`, requestOptions)
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

//CURSOS
//---------------------------------------

export const obtenerCursosService = (token) => {
    let myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", `Bearer ${token}`)

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    }

    return fetch(`${urlBase}/cursos`, requestOptions)
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


export const agregarCursoService = (token, c) => {

    let myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", `Bearer ${token}`)

    let raw = JSON.stringify({
        "id": c.id,
        "grado": c.grado,
        "anio": c.anio,
        "maestrosId": c.maestrosId,
        "inscripcionesId": [],
        "tipoCurso": c.tipoCurso
    })

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    }

    return fetch(`${urlBase}/cursos`, requestOptions)
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

export const actualizarCursoService = (id, c, token) => {

    let myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", `Bearer ${token}`)

    let raw = JSON.stringify({
        "id": c.id,
        "grado": c.grado,
        "anio": c.anio,
        "maestrosId": c.maestrosId,
        "inscripcionesId": c.inscripcionesId,
        "tipoCurso": c.tipoCurso
    })

    let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw
    }

    return fetch(`${urlBase}/cursos/${id}`, requestOptions)
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