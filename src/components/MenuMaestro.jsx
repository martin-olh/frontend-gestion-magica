import React, { useEffect, useState } from 'react'
import { Accordion, Nav } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'


export const MenuMaestro = () => {
    const location = useLocation()
    const [activeKey, setActiveKey] = useState("0")

    useEffect(() => {
        switch (location.pathname) {
            case '/usuarios/agregar':
            case '/usuarios/listado':
                setActiveKey("0"); // índice del Accordion para Usuarios
                break;
            case '/alumnos/agregar':
            case '/alumnos/listado':
                setActiveKey("1"); // índice del Accordion para Alumnos
                break;
            default:
                setActiveKey(null);
        }
    }, [location]);


    //REVISAR ITEMS MENU
    return (
        <div className='menu'>
            <Nav defaultActiveKey="/home" className="flex-column">
                <Accordion className="mt-2" alwaysOpen activeKey={activeKey} onSelect={(eventKey) => setActiveKey(eventKey)}>
                    <Accordion.Item eventKey="0" >
                        <Accordion.Header className='accHeader'>Usuarios</Accordion.Header>
                        <Accordion.Body className='bg-negro'>
                            <Nav.Link href="/usuarios/agregar" eventKey="link-1" className='nav-link-custom'>Agregar usuario</Nav.Link>
                            <Nav.Link href="/usuarios/listado" eventKey="link-2" className='nav-link-custom'>Listado usuarios</Nav.Link>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1" >
                        <Accordion.Header className='accHeader'>Alumnos</Accordion.Header>
                        <Accordion.Body className='bg-negro'>
                            <Nav.Link href="/alumnos/registrar" eventKey="link-1" className='nav-link-custom'>Registrar alumno</Nav.Link>
                            <Nav.Link href="/alumnos/listado" eventKey="link-2" className='nav-link-custom'>Listado alumnos</Nav.Link>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Nav>
        </div>
    )
}
