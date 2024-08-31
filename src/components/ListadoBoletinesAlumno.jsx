import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import pdfIcon from '/src/assets/pdf-icon.svg'
import { obtenerBoletinService } from '../services/services'
import { PDFViewer, pdf } from '@react-pdf/renderer'
import BoletinPDF from './BoletinPDF'
import { ToastContainer, toast } from 'react-toastify'


export const ListadoBoletinesAlumno = () => {
    const { id } = useParams()

    const token = sessionStorage.getItem('token')

    const listaInscripciones = useSelector(store => store.listaInscripciones)
    const listaAlumnos = useSelector(store => store.listaAlumnos)
    const listaCursos = useSelector(store => store.listaCursos)
    const listaEspaciosConocimiento = useSelector(store => store.listaEspaciosConocimiento)
    const [inscAlumno, setInscAlumno] = useState([])
    const [alumno, setAlumno] = useState()
    const [boletin, setBoletin] = useState(null)

    useEffect(() => {
        const inscFind = listaInscripciones.filter(i => i.alumnoId == id)
        if (inscFind && inscFind.length > 0) {
            setInscAlumno(inscFind)
        }
        const alumnoFind = listaAlumnos.find(a => a.id == id)
        if (alumnoFind) {
            setAlumno(alumnoFind)
        }
    }, [listaInscripciones, listaAlumnos, listaCursos, id])

    const nombreCurso = (cursoId) => {
        let curso = null
        curso = listaCursos.find(c => c.id == cursoId)
        return curso ? `${curso.anio} - ${curso.grado} - ${curso.tipoCurso}` : ''
    }

    const tipoCurso = (cursoId) => {
        let curso = null
        curso = listaCursos.find(c => c.id == cursoId)
        return curso ? `${curso.tipoCurso}` : ''
    }

    const handleOpenPDF = async (boletinId, cursoId) => {
        try {
            const boletinData = await obtenerBoletinService(token, boletinId)
            const blob = await pdf(
                <BoletinPDF
                    boletin={boletinData}
                    espaciosConocimiento={listaEspaciosConocimiento}
                    curso={listaCursos.find(c => c.id == cursoId)}
                    alumno={alumno}
                />
            ).toBlob()
            const url = URL.createObjectURL(blob)
            window.open(url, '_blank')
        } catch (error) {
            toast.error(error.message, { position: "top-center", theme: "dark", })
        }
    }

    return (
        <Container>
            <ToastContainer autoClose={2500} />
            <h2>Boletines</h2>
            {alumno ? <p><strong>{`${alumno.nombre} ${alumno.apellido}`}</strong></p> : <></>}
            <Table>
                <thead>
                    <tr>
                        <th>Curso</th>
                        <th>Primer boletín</th>
                        <th>Segundo boletín</th>
                        <th>Tercer boletín</th>
                    </tr>
                </thead>
                {inscAlumno.length > 0 ? (
                    <tbody>
                        {inscAlumno.sort((a, b) => b.id - a.id).map(i => (
                            <tr key={i.id}>
                                <td>{nombreCurso(i.cursoId)}</td>
                                <td>
                                    <Button className='btn-secondary' onClick={() => handleOpenPDF(i.boletin1Id, i.cursoId)}>
                                        Exportar <img src={pdfIcon} alt="Exportar PDF" />
                                    </Button>
                                </td>
                                {tipoCurso(i.cursoId) == "Primaria" &&
                                    <>
                                        <td>
                                            <Button className='btn-secondary' onClick={() => handleOpenPDF(i.boletin2Id, i.cursoId)}>
                                                Exportar <img src={pdfIcon} alt="Exportar PDF" />
                                            </Button>
                                        </td>
                                        <td>
                                            <Button className='btn-secondary' onClick={() => handleOpenPDF(i.boletin3Id, i.cursoId)}>
                                                Exportar <img src={pdfIcon} alt="Exportar PDF" />
                                            </Button>
                                        </td>
                                    </>
                                }
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <></>
                )}
            </Table>
        </Container>
    );
};