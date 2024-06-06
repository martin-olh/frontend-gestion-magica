import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const Header = () => {

    const navigate = useNavigate()

    const cerrarSesion = () => {
        sessionStorage.clear()
        navigate('/login')
    }

    const editarUsuario = () => {
        const id = sessionStorage.getItem('id')
        navigate(`/usuarios/settings/${id}`)
    }



    return (
        <>
            <Navbar className="bg-violeta">
                <Container className='justify-content-between'>
                    <Navbar.Brand >
                        <img
                            src="/src/assets/logo-h.png"
                            height="50"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <div>
                        <a href="" onClick={editarUsuario} className='blanco p-2' style={{ textDecoration: "none" }}><img src="/src/assets/settings.svg" height="25" /></a>
                        <a href="" onClick={cerrarSesion} className='blanco p-2' style={{ textDecoration: "none" }}><img src="/src/assets/logout.svg" height="25" /> Cerrar sesión</a>
                    </div>

                </Container>
            </Navbar>
        </>
    )


}
