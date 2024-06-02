import React from 'react'

export const Home = () => {

    const nombre = sessionStorage.getItem('nombre')

    return (
        <div>
            <h1>Bienvenido {nombre}!</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex totam eius minima a distinctio sunt recusandae? Maiores at dolor qui, odit, quae nemo excepturi unde rerum nam distinctio, obcaecati tenetur.</p>
        </div>
    )
}
