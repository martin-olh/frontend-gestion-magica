import React, { useEffect, useState } from 'react'
import { Accordion, Nav } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import imgUsuarios from '/src/assets/usuarios.svg'
import imgAlumnos from '/src/assets/alumnos.svg'
import imgCursos from '/src/assets/cursos.svg'
import imgBoletines from '/src/assets/boletines.svg'
import imgAdmin from '/src/assets/admin.svg'

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
                        <Accordion.Header className='accHeader'>
                            <img className='m-1' src={imgUsuarios} alt="Usuarios" />
                            Usuarios
                        </Accordion.Header>
                        <Accordion.Body className='bg-negro'>
                            <Nav.Link href="/usuarios/agregar" eventKey="link-1" className='nav-link-custom'>Agregar usuario</Nav.Link>
                            <Nav.Link href="/usuarios/listado" eventKey="link-2" className='nav-link-custom'>Listado usuarios</Nav.Link>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1" >
                        <Accordion.Header className='accHeader'>
                            <img className='m-1' src={imgAlumnos} alt="Alumnos" />
                            Alumnos
                        </Accordion.Header>
                        <Accordion.Body className='bg-negro'>
                            <Nav.Link href="/alumnos/registrar" eventKey="link-1" className='nav-link-custom'>Registrar alumno</Nav.Link>
                            <Nav.Link href="/alumnos/listado" eventKey="link-2" className='nav-link-custom'>Listado alumnos</Nav.Link>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2" >
                        <Accordion.Header className='accHeader'>
                            <img className='m-1' src={imgCursos} alt="Cursos" />
                            Cursos
                        </Accordion.Header>
                        <Accordion.Body className='bg-negro'>
                            <Nav.Link href="/cursos/agregar" eventKey="link-1" className='nav-link-custom'>Crear curso</Nav.Link>
                            <Nav.Link href="/cursos/listado" eventKey="link-2" className='nav-link-custom'>Listado cursos</Nav.Link>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3" >
                        <Accordion.Header className='accHeader'>
                            <img className='m-1' src={imgBoletines} alt="Boletines" />
                            Boletines
                        </Accordion.Header>
                        <Accordion.Body className='bg-negro'>
                            <Nav.Link href="/boletines/aprobar" eventKey="link-1" className='nav-link-custom'>Aprobar boletines</Nav.Link>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4" >
                        <Accordion.Header className='accHeader'>
                            <img className='m-1' src={imgAdmin} alt="Administración" />
                            Administración
                        </Accordion.Header>
                        <Accordion.Body className='bg-negro'>
                            <Nav.Link href="/inscripciones/aumentarCuotasIPC" eventKey="link-1" className='nav-link-custom'>Aumento IPC</Nav.Link>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Nav>
        </div>
    )
}
