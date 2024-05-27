import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const Header = () => {

    const navigate = useNavigate();

    const cerrarSesion = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    return (
        <>
            <Navbar className="bg-violeta mb-4">
                <Container>

                    <Navbar.Brand >
                        <img
                            src="/src/assets/logo-h.png"
                            height="50"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <a href="" onClick={cerrarSesion} className='blanco' style={{ textDecoration: "none" }}><img src="/src/assets/logout.svg" height="25" /> Cerrar sesión</a>

                </Container>
            </Navbar>
        </>
    )


}
