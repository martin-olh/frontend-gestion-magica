import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { agregarCursoService } from '../services/services'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Alertas } from './Alertas'
import { agregarCurso } from '../redux/features/cursosSlice'


export const AgregarCurso = () => {

    const dispatch = useDispatch()
    const listaUsuarios = useSelector(store => store.listaUsuarios)
    const listaMaestros = listaUsuarios.filter(u => u.tipoUsuario === 'Maestro')

    const [alerta, setAlerta] = useState('')
    const [exito, setExito] = useState('')

    const cursoVacio = {
        id: 0,
        grado: "",
        anio: "",
        tipoCurso: "",
        maestrosId: [],
        inscripcionesId: []
    }

    const [curso, setCurso] = useState(cursoVacio)
    const [maestro1Id, setMaestro1Id] = useState(0)
    const [maestro2Id, setMaestro2Id] = useState(0)
    const [maestro3Id, setMaestro3Id] = useState(0)

    const handleChange = (e) => {
        setCurso({ ...curso, [e.target.name]: e.target.value })
        setAlerta('')
        setExito('')
    }

    const handleChangeMaestro = (index) => (e) => {
        const value = e.target.value;
        if (index === 1) {
            setMaestro1Id(value);
        } else if (index === 2) {
            setMaestro2Id(value);
        } else if (index === 3) {
            setMaestro3Id(value);
        }
        curso.maestrosId[index - 1] = value;
        setAlerta('');
        setExito('');
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            validarDatosCurso()
            console.log("ASI QUEDO EL CURSO:", curso)
            const resultado = await agregarCursoService(sessionStorage.getItem('token'), curso)
            curso.id = resultado.id //guardo id del curso creado, devuelto por la API   
            dispatch(agregarCurso(curso))
            setCurso(cursoVacio)
            setMaestro1Id(0)
            setMaestro2Id(0)
            setMaestro3Id(0)
            setExito("Curso registrado exitosamente")
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

                        <Form.Group className="mb-3" controlId="maestro1Id">
                            <Form.Label>Maestro principal</Form.Label>
                            <Form.Select required onChange={handleChangeMaestro(1)} value={maestro1Id} name="maestro1Id">
                                <option>Seleccione maestro principal</option>
                                {
                                    listaMaestros.map(m => <option key={m.id} value={m.id}>{`${m.nombre} ${m.apellido}`}</option>)
                                }
                            </Form.Select>
                        </Form.Group >
                        <Form.Group className="mb-3" controlId="maestro2Id">
                            <Form.Label>Maestro secundario</Form.Label>
                            <Form.Select required onChange={handleChangeMaestro(2)} value={maestro2Id} name="maestro2Id">
                                <option>Seleccione maestro secundario</option>
                                {
                                    listaMaestros.map(m => <option key={m.id} value={m.id}>{`${m.nombre} ${m.apellido}`}</option>)
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="maestro3Id">
                            <Form.Label>Teacher</Form.Label>
                            <Form.Select required onChange={handleChangeMaestro(3)} value={maestro3Id} name="maestro3Id">
                                <option>Seleccione teacher</option>
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