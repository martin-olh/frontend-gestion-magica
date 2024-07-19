import React, { useEffect, useState } from 'react'
import { Accordion, Container, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Alertas } from './Alertas'

export const EstadoDeCuentaAlumno = () => {

    const { id } = useParams()

    const [alerta, setAlerta] = useState('')
    const [exito, setExito] = useState('')

    const listaAlumnos = useSelector(store => store.listaAlumnos)
    const listaInscripciones = useSelector(store => store.listaInscripciones)
    const listaCursos = useSelector(store => store.listaCursos)
    const listaPagos = useSelector(store => store.listaPagos)

    const [alumno, setAlumno] = useState({ nombre: '', apellido: '' })
    const [inscAlumno, setInscAlumno] = useState([])


    useEffect(() => {
        const alumnoFind = listaAlumnos.find(a => a.id == id)
        if (alumnoFind) {
            setAlumno(alumnoFind)
            const inscFind = listaInscripciones.filter(i => i.alumnoId == id)
            if (inscFind.length > 0) {
                inscFind.sort((a, b) => b.id - a.id) //ordeno por id de inscripcion para mostrar primero la mas reciente
                setInscAlumno(inscFind)
            }

        }

    }, [listaAlumnos, listaInscripciones, listaCursos, listaPagos, id])

    const nombreCurso = (cursoId) => {
        let curso = null
        curso = listaCursos.find(c => c.id == cursoId)
        return curso ? `${curso.anio} - ${curso.grado} - ${curso.tipoCurso}` : ''
    }

    const pagosDeInscripcion = (inscId) => {
        let pagos = listaPagos.filter(p => p.inscripcionId == inscId)
        return pagos
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }


    return (
        <>
            <Container>
                <Row>
                    <h2 className='mb-3'>Estado de cuenta</h2>
                </Row>
                <Row className='mb-3'>
                    <a href={`../../alumnos/detalles/${id}`}>{`${alumno.nombre} ${alumno.apellido} `}</a>
                </Row>
                <Row>
                    <Alertas error={alerta} exito={exito}></Alertas>
                </Row>
                <Accordion defaultActiveKey="0">
                    {inscAlumno.map(i =>
                    (
                        <Accordion.Item key={i.id} eventKey={i.id}>
                            <Accordion.Header>{nombreCurso(i.cursoId)} {i.activa ? `(Activa)` : ``}</Accordion.Header>
                            <Accordion.Body>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Concepto</th>
                                            <th>Monto</th>
                                            <th>Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pagosDeInscripcion(i.id).map
                                            (p => (
                                                <tr key={p.id}>
                                                    <td>{p.concepto}</td>
                                                    <td>{p.monto}</td>
                                                    <td>{formatDate(p.fecha)}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>

                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                    }
                </Accordion>
            </Container>
        </>
    )
}


{/* <Table >
                    <thead>
                        <tr></tr> */}