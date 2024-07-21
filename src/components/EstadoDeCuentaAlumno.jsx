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

    const formatMonto = (monto) => {
        return new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU' }).format(monto);
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
                {inscAlumno.length > 0 ?
                    <Accordion className='estado-cuenta-body' defaultActiveKey={inscAlumno.length > 0 ? inscAlumno[0].id.toString() : "0"}>
                        {inscAlumno.map(i =>
                        (
                            <Accordion.Item key={i.id} eventKey={i.id.toString()}>
                                <Accordion.Header className='estado-cuenta-body mb-1'>{nombreCurso(i.cursoId)} {i.activa ? `(Activa)` : ``}</Accordion.Header>
                                <Accordion.Body>
                                    <h5 className='negro'>Cuotas</h5>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Concepto</th>
                                                <th>Monto</th>
                                                <th>Fecha</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pagosDeInscripcion(i.id)
                                                .filter(p => p.esCuota === true)
                                                .map(p => (
                                                    <tr key={p.id}>
                                                        <td>{p.concepto}</td>
                                                        <td>{formatMonto(p.monto)}</td>
                                                        <td>{formatDate(p.fecha)}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>

                                    <p className='negro'>Saldo a pagar: {formatMonto(i.montoTotal - i.montoPagado)}</p>
                                    <hr className='negro' />

                                    <h5 className='negro'>Otros pagos</h5>

                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Concepto</th>
                                                <th>Monto</th>
                                                <th>Fecha</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pagosDeInscripcion(i.id)
                                                .filter(p => p.esCuota === false)
                                                .map(p => (
                                                    <tr key={p.id}>
                                                        <td>{p.concepto}</td>
                                                        <td>{formatMonto(p.monto)}</td>
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
                    :
                    <></>}

            </Container>
        </>
    )
}