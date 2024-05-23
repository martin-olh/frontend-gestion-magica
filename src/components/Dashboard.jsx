import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom'
import { Menu } from './Menu'
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';


export const Dashboard = () => {

    const [logged, setLogged] = useState(undefined);
    const [alerta, setAlerta] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const loggedAux = localStorage.getItem('token');
        //const id = localStorage.getItem('id');

        setLogged(loggedAux);
        if (!loggedAux) {
            navigate("/login");
        }
        else {
            // obtenerDepartamentosCall(loggedAux, id);
            // obtenerCiudadesCall(loggedAux, id);
            // obtenerPersonasCall(loggedAux, id);
            // obtenerOcupacionesCall(loggedAux, id);
        }
    }, [])

    return (

        <>
            {
                logged ? (<>
                    <Menu className='menu'></Menu>
                    <Row className='justify-content-center'>
                        {
                            alerta ? <Alert variant='danger'>{alerta}</Alert>
                                : <></>
                        }
                    </Row>
                    <Outlet></Outlet>
                </>)
                    : <h2>Esperando autenticación</h2>
            }

        </>
    )
}
