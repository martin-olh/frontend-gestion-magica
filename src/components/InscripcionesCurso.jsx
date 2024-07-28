import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { Alertas } from './Alertas'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const InscripcionesCurso = () => {

    const { id } = useParams()

    const [listaInscCurso, setListaInscCurso] = useState(null)
    const [cursoActual, setCursoActual] = useState({ anio: '', grado: '', tipoCurso: '' })

    const [alerta, setAlerta] = useState()
    const [warning, setWarning] = useState()

    const listaCursos = useSelector(store => store.listaCursos)
    const listaAlumnos = useSelector(store => store.listaAlumnos)
    const listaInscripciones = useSelector(store => store.listaInscripciones)
    // const listaBoletines = useSelector(store => store.listaBoletines)

    const tipoUsuario = sessionStorage.getItem("tipoUsuario")

    const navigate = useNavigate()


    useEffect(() => {
        const cursoFind = listaCursos.find(c => c.id == id)
        setCursoActual(cursoFind)
        const listaInscAux = listaInscripciones.filter(i => i.cursoId == id)
        if (listaInscAux.length > 0) {
            setListaInscCurso(listaInscAux)
        }

    }, [listaAlumnos, listaInscripciones, listaCursos, id])

    const obtenerNombreAlumno = (idAlumno) => {
        const alumno = listaAlumnos.find(a => a.id == idAlumno)
        return alumno ? `${alumno.apellido}, ${alumno.nombre}` : ''
    }

    const formatMonto = (monto) => {
        return new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU' }).format(monto);
    }


    return (
        <>
            <Container>
                <Alertas error={alerta} warning={warning}></Alertas>
                {cursoActual ?
                    <>
                        <h2>Listado de inscriptos</h2>
                        <h5>{`${cursoActual.anio} - ${cursoActual.grado} - ${cursoActual.tipoCurso}`}</h5>
                        <hr />
                    </>
                    :
                    <></>
                }
                {listaInscCurso ?
                    tipoUsuario === "Administrador" || tipoUsuario === "Coordinador" ?
                        <>
                            <Table >
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Doble Horario</th>
                                        <th>Piscina</th>
                                        <th>Monto cuota</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {listaInscCurso.slice().sort((a, b) => obtenerNombreAlumno(a.alumnoId).localeCompare(obtenerNombreAlumno(b.alumnoId))).map(i =>
                                        <tr key={i.id}>
                                            <td>
                                                <a href={`/alumnos/detalles/${i.alumnoId}`}>{obtenerNombreAlumno(i.alumnoId)}</a>
                                            </td>
                                            <td>{i.dobleHorario ? '✅' : '❌'}</td>
                                            <td>{i.piscina ? '✅' : '❌'}</td>
                                            <td>{formatMonto(i.montoCuota)}</td>
                                        </tr>
                                    )}
                                </tbody>

                            </Table>
                        </>
                        :
                        <>
                            <Table >
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Primer boletín</th>
                                        <th>Segundo boletín</th>
                                        <th>Tercer boletín</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {listaInscCurso.slice().sort((a, b) => obtenerNombreAlumno(a.alumnoId).localeCompare(obtenerNombreAlumno(b.alumnoId))).map(i =>
                                        <tr key={i.id}>
                                            <td>
                                                <a href={`/alumnos/detalles/${i.alumnoId}`}>{obtenerNombreAlumno(i.alumnoId)}</a>
                                            </td>
                                            <td><a href={`/boletines/editar/${i.id}/${i.boletin1Id}`}>Editar boletín</a></td>
                                            <td><a href={`/boletines/editar/${i.id}/${i.boletin2Id}`}>Editar boletín</a></td>
                                            <td><a href={`/boletines/editar/${i.id}/${i.boletin3Id}`}>Editar boletín</a></td>
                                        </tr>
                                    )}
                                </tbody>

                            </Table>
                        </>
                    :
                    <p>Curso sin inscripciones</p>
                }

            </Container>
        </>
    )
}
