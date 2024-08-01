import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Alertas } from './Alertas'
import { actualizarCursoService } from '../services/services'
import { actualizarCurso } from '../redux/features/cursosSlice'
import imgDelete from '/src/assets/delete.svg'

export const EditarCurso = () => {

    const { id } = useParams()
    const listaCursos = useSelector(store => store.listaCursos)
    const listaUsuarios = useSelector(store => store.listaUsuarios)
    const listaMaestros = listaUsuarios.filter(u => u.tipoUsuario === 'Maestro')
    const dispatch = useDispatch()
    const navigate = useNavigate()

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

    useEffect(() => {
        const cursoAEditar = listaCursos.find(c => c.id == id)
        if (cursoAEditar) {
            setCurso({ ...cursoAEditar })
        }
    }, [listaCursos]);



    const handleChange = (e) => {
        setCurso({ ...curso, [e.target.name]: e.target.value })
        setAlerta('')
        setExito('')
    }

    const handleEliminar = (nombre) => {
        console.log('nombre', nombre)
        switch (nombre) {
            case 'maestroPrincipalId':
                setCurso({ ...curso, maestroPrincipalId: "0" })
                break;
            case 'maestroSecundarioId':
                setCurso({ ...curso, maestroSecundarioId: "0" })
                break;
            case 'maestroInglesId':
                setCurso({ ...curso, maestroInglesId: "0" })
                break;
            case 'maestroEdFisicaId':
                setCurso({ ...curso, maestroEdFisicaId: "0" })
                break;
            default:
                break;
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            validarDatosCurso()
            await actualizarCursoService(id, curso, sessionStorage.getItem('token'))
            dispatch(actualizarCurso(curso))
            setExito("Curso actualizado exitosamente")
            setAlerta('')
            setTimeout(() => {
                navigate(`/cursos/listado`)
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
                <h2>Editar curso</h2>
            </Row>
            <Row>
                <Alertas error={alerta} exito={exito}></Alertas>
            </Row>
            <Row>
                <Col xs={12} md={10} lg={10}>
                    <Form onSubmit={onSubmit}>
                        <p>Tipo: {curso.tipoCurso}</p>
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

                        <Form.Group className="mb-3 inline-group" controlId="maestroPrincipalId">
                            {/* <Form.Label>Maestro principal</Form.Label> */}
                            <Form.Select required onChange={handleChange} value={curso.maestroPrincipalId} name="maestroPrincipalId">
                                <option>Seleccionar maestro principal</option>
                                {
                                    listaMaestros.map(m => <option key={m.id} value={m.id}>{`${m.nombre} ${m.apellido}`}</option>)
                                }
                            </Form.Select>
                            <Button className='btn-delete' onClick={() => handleEliminar('maestroPrincipalId')}><img src={imgDelete} alt="Eliminar" /></Button>
                        </Form.Group >
                        <Form.Group className="mb-3 inline-group" controlId="maestroSecundarioId">
                            {/* <Form.Label>Maestro secundario</Form.Label> */}
                            <Form.Select required onChange={handleChange} value={curso.maestroSecundarioId} name="maestroSecundarioId">
                                <option>Seleccionar maestro secundario</option>
                                {
                                    listaMaestros.map(m => <option key={m.id} value={m.id}>{`${m.nombre} ${m.apellido}`}</option>)
                                }
                            </Form.Select>
                            <Button className='btn-delete' onClick={() => handleEliminar('maestroSecundarioId')}><img src={imgDelete} alt="Eliminar" /></Button>
                        </Form.Group>
                        <Form.Group className="mb-3 inline-group" controlId="maestroInglesId">
                            {/* <Form.Label>Teacher</Form.Label> */}
                            <Form.Select required onChange={handleChange} value={curso.maestroInglesId} name="maestroInglesId">
                                <option>Seleccionar teacher</option>
                                {
                                    listaMaestros.map(m => <option key={m.id} value={m.id}>{`${m.nombre} ${m.apellido}`}</option>)
                                }
                            </Form.Select>
                            <Button className='btn-delete' onClick={() => handleEliminar('maestroInglesId')}><img src={imgDelete} alt="Eliminar" /></Button>
                        </Form.Group>
                        <Form.Group className="mb-3 inline-group" controlId="maestroEdFisicaId">
                            {/* <Form.Label>Educación física</Form.Label> */}
                            <Form.Select required onChange={handleChange} value={curso.maestroEdFisicaId} name="maestroEdFisicaId">
                                <option>Seleccionar maestro Educación Física</option>
                                {
                                    listaMaestros.map(m => <option key={m.id} value={m.id}>{`${m.nombre} ${m.apellido}`}</option>)
                                }
                            </Form.Select>
                            <Button className='btn-delete' onClick={() => handleEliminar('maestroEdFisicaId')}><img src={imgDelete} alt="Eliminar" /></Button>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Editar curso
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
