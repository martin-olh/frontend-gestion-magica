import React from 'react'

export const Home = () => {

    const nombre = sessionStorage.getItem('nombre')

    return (
        <div>
            <h1>Bienvenido {nombre}!</h1>
        </div>
    )
}
