import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
// import { Menu } from './Menu'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import { Header } from './Header'
import { obtenerUsuariosService } from '../services/services'
import { cargaInicialUsuarios } from '../redux/features/usuariosSlice'
import { Menu } from './Menu'
import { Col } from 'react-bootstrap'


export const Dashboard = () => {

    const [logged, setLogged] = useState(undefined)
    const [alerta, setAlerta] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        const id = sessionStorage.getItem('id');
        const loggedAux = sessionStorage.getItem('token')

        setLogged(loggedAux)

        if (!loggedAux) {
            navigate("/login")
        }
        else {
            obtenerUsuariosCall(loggedAux)
            // obtenerDepartamentosCall(loggedAux, id)
            // obtenerCiudadesCall(loggedAux, id)
            // obtenerPersonasCall(loggedAux, id)
            // obtenerOcupacionesCall(loggedAux, id)
        }
    }, [])

    const obtenerUsuariosCall = async (token) => {

        try {
            const usuarios = await obtenerUsuariosService(token);
            dispatch(cargaInicialUsuarios(usuarios));

        } catch (error) {
            setAlerta(error.mensaje);
            //alert(error.message);
        }
    }

    return (

        <>
            {
                logged
                    ?
                    (
                        <>
                            <Header></Header>
                            <Row className='justify-content-center'>
                                <Col xs={2}>
                                    <Menu></Menu>

                                </Col>
                                <Col>
                                    {
                                        alerta && <Alert variant='danger'>{alerta}</Alert>
                                    }

                                    <Outlet></Outlet>
                                </Col>

                            </Row>
                        </>
                    )
                    : <h2>Esperando autenticación</h2>
            }

        </>
    )
}
