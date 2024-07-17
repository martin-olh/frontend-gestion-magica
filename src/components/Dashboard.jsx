import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import { Col } from 'react-bootstrap'
import { Header } from './Header'
import { obtenerUsuariosService, obtenerAlumnosService, obtenerCursosService, obtenerInscripcionesService } from '../services/services'
import { cargaInicialUsuarios } from '../redux/features/usuariosSlice'
import { cargaInicialAlumnos } from '../redux/features/alumnosSlice'
import { Menu } from './Menu'
import { Alertas } from './Alertas'
import { cargaInicialInscripciones } from '../redux/features/inscripcionesSlice'
import { cargaInicialCursos } from '../redux/features/cursosSlice'


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
            obtenerAlumnosCall(loggedAux)
            obtenerCursosCall(loggedAux)
            obtenerInscripcionesCall(loggedAux)
            // Llamadas a obtener cursos, alumnos, etc.
        }
    }, [])

    const obtenerUsuariosCall = async (token) => {
        try {
            const usuarios = await obtenerUsuariosService(token)
            dispatch(cargaInicialUsuarios(usuarios))

        } catch (error) {
            setAlerta(error.mensaje)
        }
    }

    const obtenerAlumnosCall = async (token) => {
        try {
            const alumnos = await obtenerAlumnosService(token)
            dispatch(cargaInicialAlumnos(alumnos))

        } catch (error) {
            setAlerta(error.mensaje)
        }
    }

    const obtenerCursosCall = async (token) => {
        try {
            const cursos = await obtenerCursosService(token)
            dispatch(cargaInicialCursos(cursos))
        } catch (error) {
            setAlerta(error.mensaje)
        }
    }

    const obtenerInscripcionesCall = async (token) => {
        try {
            const inscripciones = await obtenerInscripcionesService(token)
            dispatch(cargaInicialInscripciones(inscripciones))
        } catch (error) {
            setAlerta(error.mensaje)
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
                            <Row className='justify-content-center contenido'>
                                <Col xs={2}>
                                    <Menu></Menu>
                                </Col>
                                <Col className='mt-2'>
                                    <Alertas error={alerta}></Alertas>
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
