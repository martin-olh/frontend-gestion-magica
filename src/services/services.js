const urlBase = 'https://localhost:7250/api'


export const loginService = (email, password) => {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "email": email,
        "password": password,
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    return fetch(`${urlBase}/Usuarios/login`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.codigo != 200) {
                return Promise.reject(result);
            } else {
                return result;
            }
        })
        .catch(
            (error) => {
                throw new Error(error.mensaje ? error.mensaje : "Hubo un error");
            }
        );
}

export const obtenerUsuariosService = (token) => {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(`${urlBase}/usuarios`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error ? error : "Hubo un error");
                });
            }
            return response.json();
        })
        .then(result => result)
        .catch(
            (error) => {
                throw new Error(error ? error : "Hubo un error");
            }
        );


}