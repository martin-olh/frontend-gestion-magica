import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { agregarCursoService } from '../services/services'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Alertas } from './Alertas'
import { agregarCurso } from '../redux/features/cursosSlice'
import { useNavigate } from 'react-router-dom'


export const AgregarCurso = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const listaUsuarios = useSelector(store => store.listaUsuarios)
    const listaMaestros = listaUsuarios.filter(u => u.tipoUsuario === 'Maestro')

    const [alerta, setAlerta] = useState('')
    const [exito, setExito] = useState('')

    const cursoVacio = {
        id: 0,
        grado: "",
        anio: "",
        tipoCurso: "",
        maestroPrincipalId: "0",
        maestroSecundarioId: "0",
        maestroInglesId: "0",
        maestroEdFisicaId: "0",
        inscripcionesId: []
    }

    const [curso, setCurso] = useState(cursoVacio)

    const handleChange = (e) => {
        setCurso({ ...curso, [e.target.name]: e.target.value })
        setAlerta('')
        setExito('')
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            validarDatosCurso()
            const resultado = await agregarCursoService(sessionStorage.getItem('token'), curso)
            curso.id = resultado.id //guardo id del curso creado, devuelto por la API   
            dispatch(agregarCurso(curso))
            setExito("Curso registrado exitosamente")
            setAlerta('')
            setTimeout(() => {
                navigate(`/cursos/listado/`)
                window.location.reload()
            }, 2000)
        } catch (error) {
            setAlerta(error.message)
            setExito('')
        }
    }

    const validarDatosCurso = () => {
        if (curso.tipoCurso == "") {
            throw new Error("El tipo de curso no puede estar vacío")
        }
        if (curso.grado == "") {
            throw new Error("El grado no puede estar vacío")
        }
        if (curso.anio < 2013) { //2013 fecha de fundacion del colegio
            throw new Error("Año inválido")
        }
    }

    return (
        <Container className='container-fluid'>
            <Row>
                <h2>Crear curso</h2>
            </Row>
            <Row>
                <Alertas error={alerta} exito={exito}></Alertas>
            </Row>
            <Row>
                <Col xs={12} md={10} lg={10}>
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="tipoCurso">
                            <Form.Label>* Tipo</Form.Label>
                            <Form.Select onChange={handleChange} value={curso.tipoCurso} name="tipoCurso">
                                <option>Seleccione el tipo de curso</option>
                                <option key={'Inicial'} value={'Inicial'}>Inicial</option>
                                <option key={'Primaria'} value={'Primaria'}>Primaria</option>
                            </Form.Select>
                        </Form.Group >
                        <Form.Group className="mb-3" controlId="grado">
                            <Form.Label>* Grado</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Ingrese grado" value={curso.grado} name="grado" />
                        </Form.Group >
                        <Form.Group className="mb-4" controlId="anio">
                            <Form.Label>* Año</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Ingrese año" value={curso.anio} name="anio" />
                        </Form.Group >
                        <hr />

                        <h5 className="mb-3">Maestros</h5>

                        <Form.Group className="mb-3" controlId="maestroPrincipalId">
                            <Form.Label>Maestro principal</Form.Label>
                            <Form.Select required onChange={handleChange} value={curso.maestroPrincipalId} name="maestroPrincipalId">
                                <option>Seleccionar</option>
                                {
                                    listaMaestros.map(m => <option key={m.id} value={m.id}>{`${m.nombre} ${m.apellido}`}</option>)
                                }
                            </Form.Select>
                        </Form.Group >
                        <Form.Group className="mb-3" controlId="maestroSecundarioId">
                            <Form.Label>Maestro secundario</Form.Label>
                            <Form.Select required onChange={handleChange} value={curso.maestroSecundarioId} name="maestroSecundarioId">
                                <option>Seleccionar</option>
                                {
                                    listaMaestros.map(m => <option key={m.id} value={m.id}>{`${m.nombre} ${m.apellido}`}</option>)
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="maestroInglesId">
                            <Form.Label>Teacher</Form.Label>
                            <Form.Select required onChange={handleChange} value={curso.maestroInglesId} name="maestroInglesId">
                                <option>Seleccionar</option>
                                {
                                    listaMaestros.map(m => <option key={m.id} value={m.id}>{`${m.nombre} ${m.apellido}`}</option>)
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="maestroEdFisicaId">
                            <Form.Label>Educación física</Form.Label>
                            <Form.Select required onChange={handleChange} value={curso.maestroEdFisicaId} name="maestroEdFisicaId">
                                <option>Seleccionar</option>
                                {
                                    listaMaestros.map(m => <option key={m.id} value={m.id}>{`${m.nombre} ${m.apellido}`}</option>)
                                }
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Crear curso
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <p className='mt-3'><small>• Los campos con * son obligatorios</small></p>
            </Row>
        </Container>
    )
}