import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Alertas } from './Alertas'
import { Button, Container, Table } from 'react-bootstrap'

export const ListadoCursos = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [alerta, setAlerta] = useState()
    const [warning, setWarning] = useState()

    const listaCursos = useSelector(store => store.listaCursos)
    const listaUsuarios = useSelector(store => store.listaUsuarios)
    const listaMaestros = listaUsuarios.filter(u => u.tipoUsuario === 'Maestro')

    const handleEliminar = async (id) => {
        const token = sessionStorage.getItem('token')
        try {
            const confirmar = window.confirm("Esta seguro de eliminar?");
            if (confirmar) {
                await eliminarCursoService(id, token);
                dispatch(eliminarCurso(id));
                setWarning('Curso eliminado');
            }
        } catch (error) {
            setAlerta(error.message);
        }
    }

    const handleEditar = (id) => {
        navigate(`/cursos/editar/${id}`)
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
                            <th>Maestros</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {listaCursos.slice().sort((a, b) => b.anio - a.anio).map(c =>
                            <tr key={c.id}>
                                <td>{c.tipoCurso}</td>
                                <td>{c.grado}</td>
                                <td>{c.anio}</td>
                                <td>{c.maestrosId.map(maestroId => {
                                    const maestro = listaMaestros.find(m => m.id === maestroId);
                                    return maestro ? `${maestro.nombre} ${maestro.apellido}` : 'N/A';
                                }).join(', ')}</td>
                                <td><a href={`/cursos/inscripciones/${c.id}`}>Ver inscripciones</a></td>
                                <td>
                                    <Button className='btn-edit' onClick={() => handleEditar(c.id)}> <img src="../src/assets/edit.svg" alt="Editar" /> </Button>
                                    <Button className='btn-delete' onClick={() => handleEliminar(c.id)}><img src="../src/assets/delete.svg" alt="Eliminar" /></Button>
                                </td>
                            </tr>
                        )}
                    </tbody>

                </Table>
            </Container>
        </>
    )
}
