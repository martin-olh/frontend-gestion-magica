import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import { modificarCuotaInscripcionService } from '../services/services'
import { actualizarInscripcion } from '../redux/features/inscripcionesSlice'

export const ModificarCuotaInscripcion = () => {

    const { idInscripcion } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [alerta, setAlerta] = useState('')
    const [exito, setExito] = useState('')

    const listaInscripciones = useSelector(store => store.listaInscripciones)
    const listaCursos = useSelector(store => store.listaCursos)
    const listaAlumnos = useSelector(store => store.listaAlumnos)

    const [inscripcion, setInscripcion] = useState(null)
    const [alumno, setAlumno] = useState(null)
    const [curso, setCurso] = useState(null)
    const [montoActual, setMontoActual] = useState(0)

    useEffect(() => {
        const inscFind = listaInscripciones.find(i => i.id == idInscripcion)
        if (inscFind) {
            setInscripcion(inscFind)
            setMontoActual(inscFind.montoCuota)
            const alumnoFind = listaAlumnos.find(a => a.id == inscFind.alumnoId)
            if (alumnoFind) {
                setAlumno(alumnoFind)
            }
            const cursoFind = listaCursos.find(c => c.id == inscFind.cursoId)
            if (cursoFind) {
                setCurso(cursoFind)
            }
        }
    }, [listaInscripciones, listaCursos, listaAlumnos, idInscripcion])

    const handleChange = (e) => {
        const { name, value } = e.target;

        setInscripcion(prevInscripcion => ({ ...prevInscripcion, [name]: value }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (inscripcion.montoCuota <= 0) {
            toast.error("Ingresar un monto válido", { position: "top-center", theme: "dark", })
            return
        }
        try {
            await modificarCuotaInscripcionService(sessionStorage.getItem('token'), inscripcion, idInscripcion)
            dispatch(actualizarInscripcion(inscripcion))
            toast.success("Cuota actualizada exitosamente", { position: "top-center", theme: "dark", })
            setTimeout(() => {
                navigate(`/cursos/inscripciones/${curso.id}`)
            }, 2000)

        } catch (error) {
            toast.error(error.message, { position: "top-center", theme: "dark", })
        }
    }

    return (
        <Container className='container-fluid'>
            <ToastContainer autoClose={2500} />
            <Row className='mb-3'>
                <h2>Aumentar cuota de inscripción</h2>
            </Row>
            <Row>
                <Col xs={12} md={10} lg={10}>
                    {
                        inscripcion && curso && alumno &&
                        <Form onSubmit={onSubmit}>
                            <p>Curso: {curso.grado} - {curso.anio}</p>
                            <p>Alumno: {alumno.nombre} {alumno.apellido}</p>
                            <p>Valor cuota actual: $ {montoActual}</p>
                            <Form.Group className="mb-3" controlId="montoCuota">
                                <FloatingLabel label="Ingresar valor de cuota nuevo">
                                    <Form.Control onChange={handleChange} type="number" value={inscripcion.montoCuota} name="montoCuota" />
                                </FloatingLabel>
                            </Form.Group >


                            <Button variant="primary" type="submit">
                                Confirmar
                            </Button>
                        </Form>
                    }
                </Col>
            </Row>

        </Container>
    )
}
