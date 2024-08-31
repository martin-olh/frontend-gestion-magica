import React, { useEffect, useState } from 'react'
import { listadoInasistenciasService } from '../services/services';
import { Accordion, Container, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ListadoInasistenciasAlumno = () => {

    const { idAlumno } = useParams();

    const token = sessionStorage.getItem('token')

    const listaAlumnos = useSelector(store => store.listaAlumnos)
    const [alumno, setAlumno] = useState()

    const [inasistenciasAlumno, setInasistenciasAlumno] = useState([])


    useEffect(() => {

        const alumnoFind = listaAlumnos.find(a => a.id == idAlumno);
        if (alumnoFind) {
            setAlumno(alumnoFind);
        }
        const fetchInasistencias = async () => {
            const inasistencias = await listadoInasistenciasService(token, idAlumno)
            setInasistenciasAlumno(inasistencias)
        }
        fetchInasistencias()

    }, [listaAlumnos, idAlumno]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }


    return (
        <Container>
            <Row>
                <h2 className='mb-3'>Resumen de inasistencias</h2>
            </Row>
            <Row >
                {alumno && <p><a href={`../../alumnos/detalles/${idAlumno}`}>{`${alumno.nombre} ${alumno.apellido} `}</a></p>}
            </Row>
            {inasistenciasAlumno.length > 0 ?
                <Accordion className='estado-cuenta-body' defaultActiveKey="0">
                    {inasistenciasAlumno.map((inasistenciasAlumno, index) =>
                    (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                            <Accordion.Header className='estado-cuenta-body mb-1'>{`${inasistenciasAlumno.cursoNombre} - ${inasistenciasAlumno.inasistencias.length} inasistencias`}</Accordion.Header>
                            {inasistenciasAlumno.inasistencias.length > 0 ?
                                <Accordion.Body>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Fecha</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {inasistenciasAlumno.inasistencias.map((inasistencias, index2) =>
                                            (
                                                <tr key={index2}>
                                                    <td>
                                                        {formatDate(inasistencias.fecha)}
                                                    </td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </Table>
                                </Accordion.Body>
                                :
                                <></>
                            }
                        </Accordion.Item>
                    ))
                    }
                </Accordion>
                :
                <>
                    <p>El alumno no tiene ninguna inasistencia</p>
                </>}
        </Container>
    )
}
