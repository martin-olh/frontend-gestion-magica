import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { eliminarAlumnoService } from '../services/services'
import { eliminarAlumno } from '../redux/features/alumnosSlice'
import { useNavigate } from 'react-router-dom'
import { Alertas } from './Alertas'
import imgEdit from '/src/assets/edit.svg'
import imgDelete from '/src/assets/delete.svg'
import imgInfo from '/src/assets/info.svg'
import imgInscribir from '/src/assets/inscribir.svg'

export const ListadoAlumno = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [alerta, setAlerta] = useState()
    const [warning, setWarning] = useState()
    const [filtro, setFiltro] = useState('')

    const [listaAlumnosFiltro, setListaAlumnosFiltro] = useState([])

    const listaAlumnos = useSelector(store => store.listaAlumnos)
    const listaCursos = useSelector(store => store.listaCursos)
    const listaInscripciones = useSelector(store => store.listaInscripciones)

    const tipoUsuario = sessionStorage.getItem('tipoUsuario')

    useEffect(() => {
        if (listaAlumnos.length >= 0) {
            setListaAlumnosFiltro(listaAlumnos)
        }
    }, [listaAlumnos, listaInscripciones, listaCursos])


    const handleEliminar = async (id) => {
        const token = sessionStorage.getItem('token')
        try {
            const confirmar = window.confirm("Esta seguro de eliminar?");
            if (confirmar) {
                await eliminarAlumnoService(id, token);
                dispatch(eliminarAlumno(id));
                setWarning('Alumno eliminado');
            }
        } catch (error) {
            setAlerta(error.message);
        }
    }

    const handleChange = (e) => {

        const { value } = e.target;
        setFiltro(value)

        const listaAux = listaAlumnos.filter(a =>
            a.nombre.toLowerCase().includes(value.toLowerCase()) ||
            a.apellido.toLowerCase().includes(value.toLowerCase())
        )

        setListaAlumnosFiltro(listaAux)
    }

    const nombreCurso = (idAlumno) => {
        let cursoActivo = null
        const inscActiva = listaInscripciones.find(i => i.alumnoId == idAlumno && i.activa)
        if (inscActiva) {
            cursoActivo = listaCursos.find(c => c.id == inscActiva.cursoId)
        }
        return cursoActivo ? `${cursoActivo.anio} - ${cursoActivo.grado} - ${cursoActivo.tipoCurso}` : <span className="text-danger fw-bold">Sin inscripción</span>
    }

    const handleEditar = (id) => {
        navigate(`/alumnos/editar/${id}`)
    }

    const handleDetalles = (id) => {
        navigate(`/alumnos/detalles/${id}`)
    }

    const handleInscribir = (id) => {
        navigate(`/inscripciones/agregar/${id}`)
    }


    return (
        <>
            <Container>
                <Alertas error={alerta} warning={warning}></Alertas>
                <h2 className='mb-3'>Lista de alumnos</h2>

                <Form.Group className="mb-3" controlId="filtro">
                    <Form.Control onChange={handleChange} type="text" placeholder="Buscar por nombre o apellido" value={filtro} name="filtro" />
                </Form.Group >

                <Table >
                    <thead>
                        <tr>
                            <th>Apellido</th>
                            <th>Nombre</th>
                            <th>Cédula</th>
                            <th>Curso inscripto</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {listaAlumnosFiltro.slice().sort((a, b) => a.apellido.localeCompare(b.apellido)).map(a =>
                            <tr key={a.id}>
                                <td>{a.apellido}</td>
                                <td>{a.nombre}</td>
                                <td>{a.cedula}</td>
                                <td>{nombreCurso(a.id)}</td>

                                <td>
                                    <Button className='btn-detalles' title="Detalles" onClick={() => handleDetalles(a.id)}> <img src={imgInfo} alt="Detalles" /> </Button>
                                    {tipoUsuario === 'Administrador' &&
                                        <>
                                            <Button className='btn-edit' title="Editar" onClick={() => handleEditar(a.id)}> <img src={imgEdit} alt="Editar" /> </Button>
                                            <Button className='btn-edit' title="Inscribir a curso" onClick={() => handleInscribir(a.id)}><img src={imgInscribir} alt="Inscribir" /></Button>
                                            <Button className='btn-delete' title="Eliminar" onClick={() => handleEliminar(a.id)}><img src={imgDelete} alt="Eliminar" /></Button>
                                        </>
                                    }
                                </td>
                            </tr>
                        )}
                    </tbody>

                </Table>
            </Container>
        </>
    )
}
