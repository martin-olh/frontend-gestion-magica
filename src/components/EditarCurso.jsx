import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Alertas } from './Alertas'
import { actualizarCursoService } from '../services/services'
import { actualizarCurso } from '../redux/features/cursosSlice'

export const EditarCurso = () => {


    const { id } = useParams()
    const dispatch = useDispatch()

    const [alerta, setAlerta] = useState('')
    const [exito, setExito] = useState('')

    const [curso, setCurso] = useState({
        id: "",
        grado: "",
        anio: "",
        tipoCurso: "",
        maestrosId: "",
        inscripciones: ""
    })

    const [maestroId, setMaestroId] = useState(0)

    const listaCursos = useSelector(store => store.listaCursos)

    const listaUsuarios = useSelector(store => store.listaUsuarios)
    const listaMaestros = listaUsuarios.filter(u => u.tipoUsuario === 'Maestro')

    useEffect(() => {
        const cursoAEditar = listaCursos.find(c => c.id == id)
        if (cursoAEditar) {
            setCurso(cursoAEditar)
            setMaestroId(cursoAEditar.maestrosId[0])
        }
    }, [listaCursos]);

    const handleChange = (e) => {
        setCurso({ ...curso, [e.target.name]: e.target.value })
        setAlerta('')
        setExito('')
    }

    const handleChangeMaestro = (e) => {
        setMaestroId(e.target.value)
        let maestrosIdAActualizar = [...curso.maestrosId]
        maestrosIdAActualizar[0] = e.target.value
        setCurso({ ...curso, maestrosId: maestrosIdAActualizar })
        setAlerta('')
        setExito('')
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            validarDatosCurso()
            await actualizarCursoService(id, curso, sessionStorage.getItem('token'))
            dispatch(actualizarCurso(curso))
            setExito("Curso actualizado exitosamente")
            setAlerta('')
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
        if (curso.anio < 2013) {
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
                        <Form.Group className="mb-3" controlId="anio">
                            <Form.Label>* Año</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Ingrese año" value={curso.anio} name="anio" />
                        </Form.Group >
                        <Form.Group className="mb-3" controlId="maestroId">
                            <Form.Label>* Maestro</Form.Label>
                            <Form.Select required onChange={handleChangeMaestro} value={maestroId} name="maestroId">
                                <option>Seleccione un maestro</option>
                                {
                                    listaMaestros.map(m => <option key={m.id} value={m.id}>{`${m.nombre} ${m.apellido}`}</option>)
                                }
                            </Form.Select>
                        </Form.Group >
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
