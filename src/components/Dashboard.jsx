import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
// import { Menu } from './Menu'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import { Header } from './Header'
import { obtenerUsuariosService } from '../services/services'
import { cargaInicialUsuarios } from '../redux/features/usuariosSlice'


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
            console.log(usuarios)
            dispatch(cargaInicialUsuarios(usuarios));

        } catch (error) {
            //setAlerta(error.message);
            alert(error.message);
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
                                {
                                    alerta && <Alert variant='danger'>{alerta}</Alert>
                                }
                            </Row>
                            <Outlet></Outlet>
                        </>
                    )
                    : <h2>Esperando autenticación</h2>
            }

        </>
    )
}
