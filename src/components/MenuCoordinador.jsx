import React, { useEffect, useState } from 'react'
import { Accordion, Nav } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'


export const MenuCoordinador = () => {

    const location = useLocation();

    const getInitialActiveKey = (pathname) => {
        switch (pathname) {
            case '/alumnos/listado':
                return "0";
            case '/cursos/listado':
                return "1";
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
                        <Accordion.Header className='accHeader'>Alumnos</Accordion.Header>
                        <Accordion.Body className='bg-negro'>
                            <Nav.Link href="/alumnos/listado" eventKey="link-1" className='nav-link-custom'>Listado alumnos</Nav.Link>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1" >
                        <Accordion.Header className='accHeader'>Cursos</Accordion.Header>
                        <Accordion.Body className='bg-negro'>
                            <Nav.Link href="/cursos/listado" eventKey="link-1" className='nav-link-custom'>Listado cursos</Nav.Link>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Nav>
        </div>
    )
}
