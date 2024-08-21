import React, { useEffect, useState } from 'react'
import { Container, Table, Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Alertas } from './Alertas'
import { agregarInasistenciasDiaService } from '../services/services'

export const AgregarInasistencias = () => {

    const { idCurso } = useParams()

    const listaCursos = useSelector(store => store.listaCursos)
    const listaInscripciones = useSelector(store => store.listaInscripciones)
    const listaAlumnos = useSelector(store => store.listaAlumnos)

    const [curso, setCurso] = useState()
    const [listaInscCurso, setListaInscCurso] = useState()

    const [alerta, setAlerta] = useState('')
    const [exito, setExito] = useState('')

    const inasistenciasDiaVacio = {
        fecha: "",
        inscripcionesId: []
    }

    const [inasistenciasDia, setInasistenciasDia] = useState(inasistenciasDiaVacio)

    useEffect(() => {
        const cursoFind = listaCursos.find(c => c.id == idCurso)
        if (cursoFind) {
            setCurso(cursoFind)
            const listaAux = listaInscripciones.filter(i => i.cursoId == idCurso)
            if (listaAux.length > 0) {
                setListaInscCurso(listaAux)
            }
        }
    }, [listaCursos, listaInscripciones, listaAlumnos])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'date') {
            setInasistenciasDia(prevState => ({
                ...prevState,
                fecha: value
            }));
            console.log("inasDia", inasistenciasDia)
        } else if (type === 'checkbox') {
            const inscripcionId = parseInt(name);
            setInasistenciasDia(prevState => {
                const newInscripcionesId = checked
                    ? [...prevState.inscripcionesId, inscripcionId]
                    : prevState.inscripcionesId.filter(id => id !== inscripcionId);
                return {
                    ...prevState,
                    inscripcionesId: newInscripcionesId
                };
            });
        }
    }

    const obtenerNombreAlumno = (idAlumno) => {
        const alumno = listaAlumnos.find(a => a.id == idAlumno)
        return alumno ? `${alumno.apellido}, ${alumno.nombre}` : ''
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            validarDatosInasistencias()
            const resultado = await agregarInasistenciasDiaService(sessionStorage.getItem("token"), inasistenciasDia)
            setExito("Inasistencias registradas exitosamente")
            setInasistenciasDia(inasistenciasDiaVacio)

        } catch (error) {
            setAlerta(error.message)
            setExito("")
        }
    }

    const validarDatosInasistencias = () => {
        if (inasistenciasDia.fecha === "") {
            throw new Error("Debe seleccionar una fecha")
        }
        if (inasistenciasDia.inscripcionesId.length === 0) {
            throw new Error("Debe seleccionar al menos un alumno.")
        }
    }


    return (
        <>
            <Container>
                <Alertas error={alerta} exito={exito}></Alertas>
                {curso ?
                    <>
                        <h2>Registrar inasistencias</h2>
                        <h5>{`${curso.anio} - ${curso.grado} - ${curso.tipoCurso}`}</h5>
                        <hr />
                    </>
                    :
                    <></>
                }
                <Form onSubmit={onSubmit}>

                    <Form.Group className="mb-3" controlId="fecha">
                        <Form.Label>* Fecha</Form.Label>
                        <Form.Control onChange={handleChange} type="date" placeholder="Seleccione una fecha" value={inasistenciasDia.fecha} name="fecha" />
                    </Form.Group >
                    <Table >
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>No asistió</th>
                            </tr>
                        </thead>
                        {listaInscCurso &&
                            <tbody>
                                {listaInscCurso.slice().sort((a, b) => obtenerNombreAlumno(a.alumnoId).localeCompare(obtenerNombreAlumno(b.alumnoId))).map(i =>
                                    <tr key={i.id}>
                                        <td>
                                            {obtenerNombreAlumno(i.alumnoId)}
                                        </td>
                                        <td>
                                            <Form.Group>
                                                <Form.Check
                                                    onChange={handleChange}
                                                    type="checkbox"
                                                    name={i.id.toString()}
                                                    checked={inasistenciasDia.inscripcionesId.includes(i.id)}
                                                />
                                            </Form.Group>
                                        </td>
                                    </tr>
                                )}
                            </tbody>}

                    </Table>
                    <Button variant="primary" type="submit">
                        Registrar inasistencias
                    </Button>
                </Form>


            </Container >
        </>
    )
}
