import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { actualizarBoletinService, obtenerBoletinService } from '../services/services'
import { Form, Col, Container, Row, Button } from 'react-bootstrap'
import { Alertas } from './Alertas'

export const EditarBoletin = () => {

    const { idInscripcion, idBoletin } = useParams()
    const token = sessionStorage.getItem("token")

    const tipoUsuario = sessionStorage.getItem("tipoUsuario")

    const navigate = useNavigate()

    const [alerta, setAlerta] = useState('')
    const [exito, setExito] = useState('')

    const listaInscripciones = useSelector(store => store.listaInscripciones)
    const listaAlumnos = useSelector(store => store.listaAlumnos)
    const listaCursos = useSelector(store => store.listaCursos)

    const [alumno, setAlumno] = useState(null)
    const [curso, setCurso] = useState(null)
    const [boletin, setBoletin] = useState(null)

    useEffect(() => {
        const insc = listaInscripciones.find(i => i.id == idInscripcion)
        if (insc) {
            const alumnoFind = listaAlumnos.find(a => a.id == insc.alumnoId)
            if (alumnoFind) {
                setAlumno(alumnoFind)
            }
            const cursoFind = listaCursos.find(c => c.id == insc.cursoId)
            if (cursoFind) {
                setCurso(cursoFind)
            }
        }
        obtenerBoletinCall(token, idBoletin)

    }, [listaInscripciones, listaAlumnos, listaCursos, idInscripcion, idBoletin])

    const obtenerBoletinCall = async (token, id) => {
        try {
            const boletinFind = await obtenerBoletinService(token, id)
            setBoletin(boletinFind)
        } catch (error) {
            setAlerta(error.mensaje)
        }
    }

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setBoletin(prevBoletin => ({ ...prevBoletin, [name]: inputValue }))
        setAlerta('')
        setExito('')
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            const updatedBol = { ...boletin, editado: true }
            setBoletin(updatedBol)
            await actualizarBoletinService(idBoletin, updatedBol, token)
            setExito("Boletin actualizado exitosamente")
            setAlerta('')
            if (tipoUsuario == 'Maestro') {
                setTimeout(() => {
                    const inscRedirect = listaInscripciones.find(i => i.id == idInscripcion)
                    navigate(`/cursos/inscripciones/${inscRedirect.cursoId}`)
                }, 2000)

            } else {
                setTimeout(() => {
                    navigate(`/boletines/aprobar/`)
                }, 2000)

            }
        } catch (error) {
            setAlerta(error.message)
            setExito('')
        }
    }


    return (
        <>
            {boletin ?
                <Container className='container-fluid'>
                    <Row className='mb-3'>
                        <h2>Editar boletín</h2>
                    </Row>
                    <Row>
                        <Alertas error={alerta} exito={exito}></Alertas>
                    </Row>
                    <Row>
                        {curso ?
                            <p>Boletin {boletin.trimestre} - {curso.grado} {`(${curso.anio})`}</p> : ""
                        }
                        {alumno ?
                            <p>Alumno: <strong>{alumno.nombre} {alumno.apellido}</strong></p> : ""
                        }
                    </Row>
                    <Row>
                        <Col xs={12} md={10} lg={10}>
                            <Form onSubmit={onSubmit}>
                                <Form.Group className="mb-3" controlId="espCientificoMatematico">
                                    <Form.Label>Ciencia y matemática</Form.Label>
                                    <Form.Control onChange={handleChange} disabled={boletin.finalizado} as="textarea" placeholder="Ingresar juicio" value={boletin.espCientificoMatematico ?? ""} name="espCientificoMatematico" />
                                </Form.Group >
                                <Form.Group className="mb-3" controlId="espComunicacion">
                                    <Form.Label>Comunicación</Form.Label>
                                    <Form.Control onChange={handleChange} disabled={boletin.finalizado} as="textarea" placeholder="Ingresar juicio" value={boletin.espComunicacion ?? ""} name="espComunicacion" />
                                </Form.Group >
                                <Form.Group className="mb-3" controlId="espCienciasSociales">
                                    <Form.Label>Ciencias sociales</Form.Label>
                                    <Form.Control onChange={handleChange} disabled={boletin.finalizado} as="textarea" placeholder="Ingresar juicio" value={boletin.espCienciasSociales ?? ""} name="espCienciasSociales" />
                                </Form.Group >
                                <Form.Group className="mb-3" controlId="espDesarrolloPersonal">
                                    <Form.Label>Desarrollo personal</Form.Label>
                                    <Form.Control onChange={handleChange} disabled={boletin.finalizado} as="textarea" placeholder="Ingresar juicio" value={boletin.espDesarrolloPersonal ?? ""} name="espDesarrolloPersonal" />
                                </Form.Group >
                                <Form.Group className="mb-3" controlId="espIngles">
                                    <Form.Label>Inglés</Form.Label>
                                    <Form.Control onChange={handleChange} disabled={boletin.finalizado} as="textarea" placeholder="Ingresar juicio" value={boletin.espIngles ?? ""} name="espIngles" />
                                </Form.Group >
                                {boletin.trimestre == 3 &&
                                    <Form.Group className="mb-3" controlId="valoracionFinal">
                                        <Form.Label>Valoración final</Form.Label>
                                        <Form.Control onChange={handleChange} disabled={boletin.finalizado} as="textarea" placeholder="Ingresar juicio" value={boletin.valoracionFinal ?? ""} name="valoracionFinal" />
                                    </Form.Group >
                                }
                                {tipoUsuario != "Maestro" &&
                                    <Form.Group className="mb-3" controlId="finalizado">
                                        <Form.Check onChange={handleChange} type="switch" checked={boletin.finalizado} name="finalizado" label="Aprobar boletín" />
                                    </Form.Group >
                                }
                                <Button variant="primary" type="submit">
                                    Guardar
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                :
                <></>
            }
        </>

    )
}
