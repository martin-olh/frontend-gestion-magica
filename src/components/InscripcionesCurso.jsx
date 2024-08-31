import React, { useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import imgEdit from '/src/assets/edit.svg'

export const InscripcionesCurso = () => {

    const { id } = useParams()

    const navigate = useNavigate()

    const [listaInscCurso, setListaInscCurso] = useState(null)
    const [cursoActual, setCursoActual] = useState({ anio: '', grado: '', tipoCurso: '' })

    const listaCursos = useSelector(store => store.listaCursos)
    const listaAlumnos = useSelector(store => store.listaAlumnos)
    const listaInscripciones = useSelector(store => store.listaInscripciones)
    // const listaBoletines = useSelector(store => store.listaBoletines)

    const tipoUsuario = sessionStorage.getItem("tipoUsuario")

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

    const handleModificar = (id) => {
        navigate(`/inscripciones/modificarCuota/${id}`)
    }


    return (
        <>
            <Container>
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
                                        {
                                            tipoUsuario === "Administrador" &&
                                            <th>Modificar cuota</th>
                                        }
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
                                            {
                                                tipoUsuario === "Administrador" &&
                                                <td><Button className='btn-edit' title="Modificar" onClick={() => handleModificar(i.id)}><img src={imgEdit} alt="Modificar" /></Button></td>

                                            }
                                        </tr>
                                    )}
                                </tbody>

                            </Table>
                        </>
                        :
                        <>
                            {cursoActual &&
                                <Table >
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>{cursoActual.tipoCurso == "Primaria" ? `Primer boletín` : `Boletín`}</th>
                                            {cursoActual.tipoCurso == "Primaria" &&
                                                <>
                                                    <th>Segundo boletín</th>
                                                    <th>Tercer boletín</th>
                                                </>}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {listaInscCurso.slice().sort((a, b) => obtenerNombreAlumno(a.alumnoId).localeCompare(obtenerNombreAlumno(b.alumnoId))).map(i =>
                                            <tr key={i.id}>
                                                <td>
                                                    <a href={`/alumnos/detalles/${i.alumnoId}`}>{obtenerNombreAlumno(i.alumnoId)}</a>
                                                </td>
                                                <td><a href={`/boletines/editar/${i.id}/${i.boletin1Id}`}>Editar boletín</a></td>
                                                {cursoActual.tipoCurso == "Primaria" &&
                                                    <>
                                                        <td><a href={`/boletines/editar/${i.id}/${i.boletin2Id}`}>Editar boletín</a></td>
                                                        <td><a href={`/boletines/editar/${i.id}/${i.boletin3Id}`}>Editar boletín</a></td>
                                                    </>}
                                            </tr>
                                        )}
                                    </tbody>

                                </Table>
                            }
                        </>
                    :
                    <p>Curso sin inscripciones</p>
                }

            </Container>
        </>
    )
}
