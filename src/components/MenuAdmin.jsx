import React, { useEffect, useState } from 'react'
import { Accordion, Nav } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

export const MenuAdmin = () => {

    const location = useLocation();

    const getInitialActiveKey = (pathname) => {
        switch (pathname) {
            case '/usuarios/agregar':
            case '/usuarios/listado':
                return "0"; // índice del Accordion para Usuarios
            case '/alumnos/registrar':
            case '/alumnos/listado':
                return "1"; // índice del Accordion para Alumnos
            case '/cursos/agregar':
            case '/cursos/listado':
                return "2"; // índice del Accordion para Cursos
            default:
                return null;
        }
    };

    const [activeKey, setActiveKey] = useState(getInitialActiveKey(location.pathname));

    useEffect(() => {
        setActiveKey(getInitialActiveKey(location.pathname));
    }, [location]);

    const handleSelect = (eventKey) => {
        setActiveKey(activeKey === eventKey ? null : eventKey);
    };

    return (
        <div className='menu'>
            <Nav defaultActiveKey="/home" className="flex-column">
                <Accordion className="mt-2" activeKey={activeKey} onSelect={handleSelect}>
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
                    <Accordion.Item eventKey="2" >
                        <Accordion.Header className='accHeader'>Cursos</Accordion.Header>
                        <Accordion.Body className='bg-negro'>
                            <Nav.Link href="/cursos/agregar" eventKey="link-1" className='nav-link-custom'>Crear curso</Nav.Link>
                            <Nav.Link href="/cursos/listado" eventKey="link-2" className='nav-link-custom'>Listado cursos</Nav.Link>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Nav>
        </div>
    )
}
