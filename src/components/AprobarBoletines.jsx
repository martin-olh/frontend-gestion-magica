import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, Table } from 'react-bootstrap'
import { obtenerBoletinesPendientesService } from '../services/services'
import { ToastContainer, toast } from 'react-toastify'


export const AprobarBoletines = () => {

    const token = sessionStorage.getItem('token')

    const listaInscripciones = useSelector(store => store.listaInscripciones)
    const listaCursos = useSelector(store => store.listaCursos)
    const listaAlumnos = useSelector(store => store.listaAlumnos)


    const [boletinesPend, setBoletinesPend] = useState()
    //const [boletinesMostrar, setBoletinesMostrar] = useState()

    const obtenerBoletinesPendientesCall = async (token) => {
        try {
            const boletinesFind = await obtenerBoletinesPendientesService(token)
            if (boletinesFind && boletinesFind.length > 0) {
                return boletinesFind
            }
            return []
        } catch (error) {
            toast.error(error.message, { position: "top-center", theme: "dark", })
            return []
        }
    }

    useEffect(() => {
        const fetchBoletines = async () => {
            const boletines = await obtenerBoletinesPendientesCall(token)
            setBoletinesPend(boletines)
        }
        fetchBoletines()
    }, [listaInscripciones, listaCursos])


    const getCurso = (idInsc) => {
        let curso = ''
        const inscFind = listaInscripciones.find(i => i.id == idInsc)
        if (inscFind) {
            const cursoFind = listaCursos.find(c => c.id == inscFind.cursoId)
            curso = cursoFind
        }

        return curso ? `${curso.grado} (${curso.anio}) - ${curso.tipoCurso}` : ``
    }

    const obtenerNombreAlumno = (idInsc) => {
        let nombreAlumno = ''
        const inscFind = listaInscripciones.find(i => i.id == idInsc)
        if (inscFind) {
            const alumno = listaAlumnos.find(a => a.id == inscFind.alumnoId)
            if (alumno) {
                nombreAlumno = `${alumno.apellido}, ${alumno.nombre}`
            }
        }
        return nombreAlumno
    }

    return (
        <>
            <Container>
                <ToastContainer autoClose={2500} />
                <h2 className='mb-3'>Boletines pendientes de aprobar</h2>
                {boletinesPend && boletinesPend.length > 0 ?

                    <Table>
                        <thead>
                            <tr>
                                <th>Curso</th>
                                <th>Alumno</th>
                                <th>Boletin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {boletinesPend.slice().sort((a, b) => getCurso(a.inscripcionId).localeCompare(getCurso(b.inscripcionId))).map(b =>
                                <tr key={b.id}>
                                    <td>{getCurso(b.inscripcionId)}</td>
                                    <td>{obtenerNombreAlumno(b.inscripcionId)}</td>
                                    <td><a href={`/boletines/editar/${b.inscripcionId}/${b.id}`}>Aprobar boletín</a></td>

                                </tr>
                            )}
                        </tbody>
                    </Table>
                    :
                    <><p>No hay boletines pendientes</p></>
                }
            </Container>
        </>
    )
}

//obtenerNombreAlumno(a.alumnoId).localeCompare(obtenerNombreAlumno(b.alumnoId))

//getCurso(b.inscripcionId) - getCurso(a.inscripcionId)