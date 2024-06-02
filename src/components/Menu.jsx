import React from 'react'
import { Accordion, Nav } from 'react-bootstrap'

export const Menu = () => {

    const itemsMenu = [
        { title: "Usuarios" },
        { title: "Alumnos" },
        { title: "Cursos" },

    ]

    const itemsMenuUsuario = [
        { path: "/usuarios/agregar", title: "Agregar usuario" },
        { path: "/usuarios/listado", title: "Lista de usuarios" }
    ]



    return (
        <div className='menu'>

            <Nav defaultActiveKey="/home" className="flex-column">
                <Accordion defaultActiveKey="0" >
                    <Accordion.Item eventKey="0" >
                        <Accordion.Header className='accHeader'>Accordion Item #1</Accordion.Header>
                        <Accordion.Body className='bg-negro'>
                            <Nav.Link href="/home" className='nav-link-custom'>Active</Nav.Link>
                            <Nav.Link eventKey="link-1" className='nav-link-custom'>Link</Nav.Link>
                            <Nav.Link eventKey="link-2" className='nav-link-custom'>Link</Nav.Link>
                            <Nav.Link eventKey="disabled" className='nav-link-custom' disabled>
                                Disabled
                            </Nav.Link>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Nav>
        </div>

    )
}


<Accordion defaultActiveKey="0">
    <Accordion.Item eventKey="0">
        <Accordion.Header>Accordion Item #1</Accordion.Header>
        <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="1">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
    </Accordion.Item>
</Accordion>


