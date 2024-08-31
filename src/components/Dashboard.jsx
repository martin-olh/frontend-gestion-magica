import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { Header } from './Header'
import { Menu } from './Menu'
import {
    obtenerUsuariosService,
    obtenerAlumnosService,
    obtenerCursosService,
    obtenerInscripcionesService,
    obtenerPagosService,
    obtenerCategoriasGastosService,
    obtenerEspaciosConocimientoService
} from '../services/services'
import { cargaInicialUsuarios } from '../redux/features/usuariosSlice'
import { cargaInicialAlumnos } from '../redux/features/alumnosSlice'
import { cargaInicialInscripciones } from '../redux/features/inscripcionesSlice'
import { cargaInicialCursos } from '../redux/features/cursosSlice'
import { cargaInicialPagos } from '../redux/features/pagosSlice'
import { cargaInicialCategorias } from '../redux/features/categoriasSlice'
import { cargaInicialEspaciosConocimiento } from '../redux/features/espaciosConocimientoSlice'
import { ToastContainer, toast } from 'react-toastify'

export const Dashboard = () => {

    const [logged, setLogged] = useState(undefined)

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
            obtenerPagosCall(loggedAux)
            obtenerCategoriasCall(loggedAux)
            obtenerEspaciosConocimientoCall(loggedAux);

            // Llamadas a obtener cursos, alumnos, etc.
        }
    }, [])

    const obtenerUsuariosCall = async (token) => {
        try {
            const usuarios = await obtenerUsuariosService(token)
            dispatch(cargaInicialUsuarios(usuarios))

        } catch (error) {
            toast.error(error.message, { position: "top-center", theme: "dark", })
        }
    }

    const obtenerAlumnosCall = async (token) => {
        try {
            const alumnos = await obtenerAlumnosService(token)
            dispatch(cargaInicialAlumnos(alumnos))

        } catch (error) {
            toast.error(error.message, { position: "top-center", theme: "dark", })
        }
    }

    const obtenerCursosCall = async (token) => {
        try {
            const cursos = await obtenerCursosService(token)
            dispatch(cargaInicialCursos(cursos))
        } catch (error) {
            toast.error(error.message, { position: "top-center", theme: "dark", })
        }
    }

    const obtenerInscripcionesCall = async (token) => {
        try {
            const inscripciones = await obtenerInscripcionesService(token)
            dispatch(cargaInicialInscripciones(inscripciones))
        } catch (error) {
            toast.error(error.message, { position: "top-center", theme: "dark", })
        }
    }

    const obtenerPagosCall = async (token) => {
        try {
            const pagos = await obtenerPagosService(token)
            dispatch(cargaInicialPagos(pagos))
        } catch (error) {
            toast.error(error.message, { position: "top-center", theme: "dark", })
        }
    }

    const obtenerCategoriasCall = async (token) => {
        try {
            const cat = await obtenerCategoriasGastosService(token)
            dispatch(cargaInicialCategorias(cat))

        } catch (error) {
            toast.error(error.message, { position: "top-center", theme: "dark", })
        }
    }

    const obtenerEspaciosConocimientoCall = async (token) => {
        try {
            const espCon = await obtenerEspaciosConocimientoService(token)
            dispatch(cargaInicialEspaciosConocimiento(espCon))

        } catch (error) {
            toast.error(error.message, { position: "top-center", theme: "dark", })
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
                                <ToastContainer autoClose={2500} />
                                <Col xs={2}>
                                    <Menu></Menu>
                                </Col>
                                <Col className='mt-2'>
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
