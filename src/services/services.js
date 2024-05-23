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