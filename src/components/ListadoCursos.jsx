import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Alertas } from './Alertas'
import { Button, Container, Table } from 'react-bootstrap'
import imgEdit from '/src/assets/edit.svg'
import imgDelete from '/src/assets/delete.svg'
import imgInasistencias from '/src/assets/inasistencias.svg'
import imgAlumnos from '/src/assets/alumnos-b.svg'

import { eliminarCursoService } from '../services/services'
import { eliminarCurso } from '../redux/features/cursosSlice'

export const ListadoCursos = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [alerta, setAlerta] = useState()
    const [warning, setWarning] = useState()
    const [listaCursosMostrar, setListaCursosMostrar] = useState([])

    const listaCursos = useSelector(store => store.listaCursos)
    const listaUsuarios = useSelector(store => store.listaUsuarios)
    const listaMaestros = listaUsuarios.filter(u => u.tipoUsuario === 'Maestro')

    const tipoUsuario = sessionStorage.getItem("tipoUsuario")
    const idUsuario = sessionStorage.getItem("id")

    useEffect(() => {
        let cursos = [];
        if (tipoUsuario === "Maestro") {
            cursos = cursosMaestro(idUsuario);
        } else {
            cursos = listaCursos;
        }
        setListaCursosMostrar(cursos);
    }, [listaCursos, tipoUsuario, idUsuario])

    const cursosMaestro = (idMaestro) => {
        const listaFiltrada = listaCursos.filter(c => esMaestroEnCurso(idMaestro, c.id))
        return listaFiltrada
    }

    const esMaestroEnCurso = (idMaestro, idCurso) => {

        const curso = listaCursos.find(c => c.id === idCurso);

        const maestroPrincipal = curso.maestroPrincipalId.toString()
        const maestroSecundario = curso.maestroSecundarioId.toString()
        const maestroIngles = curso.maestroInglesId.toString()
        const maestroEdFisica = curso.maestroEdFisicaId.toString()

        const resultado = maestroPrincipal === idMaestro ||
            maestroSecundario === idMaestro ||
            maestroIngles === idMaestro ||
            maestroEdFisica === idMaestro

        return resultado;
    }


    const handleEliminar = async (id) => {
        const token = sessionStorage.getItem('token')
        try {
            const confirmar = window.confirm("Esta seguro de eliminar?")
            if (confirmar) {
                await eliminarCursoService(id, token)
                dispatch(eliminarCurso(id))
                setWarning('Curso eliminado')
            }
        } catch (error) {
            setAlerta(error.message)
        }
    }

    const handleEditar = (id) => {
        navigate(`/cursos/editar/${id}`)
    }

    const handleInasistencias = (id) => {
        navigate(`/cursos/inasistencias/agregar/${id}`)
    }

    const handleAlumnos = (id) => {
        navigate(`/cursos/inscripciones/${id}`)
    }

    const obtenerNombreMaestro = (id) => {
        const maestro = listaMaestros.find(m => m.id === id)
        return maestro ? `${maestro.apellido}, ${maestro.nombre}` : 'N/A'
    }

    return (
        <>
            <Container>
                <Alertas error={alerta} warning={warning}></Alertas>
                <h2>Lista de cursos</h2>
                <Table >
                    <thead>
                        <tr>
                            <th>Nivel</th>
                            <th>Grado</th>
                            <th>Año</th>
                            <th>Maestro Princ.</th>
                            <th>Maestro Sec.</th>
                            <th>Teacher</th>
                            <th>Maestro Ed. Fis.</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {listaCursosMostrar.length > 0 &&
                            listaCursosMostrar.slice().sort((a, b) => b.anio - a.anio).map(c =>
                                <tr key={c.id}>
                                    <td>{c.tipoCurso}</td>
                                    <td>{c.grado}</td>
                                    <td>{c.anio}</td>
                                    <td>{obtenerNombreMaestro(c.maestroPrincipalId)}</td>
                                    <td>{obtenerNombreMaestro(c.maestroSecundarioId)}</td>
                                    <td>{obtenerNombreMaestro(c.maestroInglesId)}</td>
                                    <td>{obtenerNombreMaestro(c.maestroEdFisicaId)}</td>
                                    {tipoUsuario === "Administrador" ?
                                        <td>
                                            <Button className='btn-edit' title="Ver alumnos" onClick={() => handleAlumnos(c.id)}> <img src={imgAlumnos} alt="Alumnos" /></Button>
                                            <Button className='btn-edit' title="Inasistencias" onClick={() => handleInasistencias(c.id)}><img src={imgInasistencias} alt="Inasistencias" /></Button>
                                            <Button className='btn-edit' title="Editar" onClick={() => handleEditar(c.id)}> <img src={imgEdit} alt="Editar" /> </Button>
                                            <Button className='btn-delete' title="Eliminar" onClick={() => handleEliminar(c.id)}><img src={imgDelete} alt="Eliminar" /></Button>
                                        </td>
                                        :
                                        <></>
                                    }
                                    {tipoUsuario === "Coordinador" ?
                                        <td>
                                            <Button className='btn-edit' title="Ver alumnos" onClick={() => handleAlumnos(c.id)}> <img src={imgAlumnos} alt="Alumnos" /></Button>
                                            <Button title="Inasistencias" onClick={() => handleInasistencias(c.id)}><img src={imgInasistencias} alt="Inasistencias" /></Button>
                                        </td>
                                        :
                                        <></>
                                    }
                                    {tipoUsuario === "Maestro" ?
                                        <td>
                                            <Button className='btn-edit' title="Ver alumnos" onClick={() => handleAlumnos(c.id)}> <img src={imgAlumnos} alt="Alumnos" /></Button>
                                        </td>
                                        :
                                        <></>
                                    }
                                </tr>
                            )}
                    </tbody>

                </Table>
            </Container>
        </>
    )
}
