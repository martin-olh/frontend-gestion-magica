import React, { useState } from 'react'
import { Alert, Button, Container, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
//import { eliminarAlumnoService } from '../services/services'
//import { eliminarAlumno } from '../redux/features/alumnosSlice'
import { useNavigate } from 'react-router-dom'

export const ListadoAlumno = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [alert, setAlert] = useState()

    const listaAlumnos = useSelector(store => store.listaAlumnos)

    const tipoUsuario = sessionStorage.getItem('tipoUsuario')

    const handleEliminar = async (id) => {
        const token = sessionStorage.getItem('token')
        try {
            const confirmar = window.confirm("Esta seguro de eliminar?");
            if (confirmar) {
                await eliminarUsuarioService(id, token);
                dispatch(eliminarUsuario(id));
                setAlert('Alumno eliminado');
            }
        } catch (error) {
            setAlert(error.message);
        }
    }

    const handleEditar = (id) => {
        navigate(`/alumnos/editar/${id}`)
    }

    const handleDetalles = (id) => {
        navigate(`/alumnos/detalles/${id}`)
    }


    return (
        <>
            <Container>
                {alert && <Alert variant='warning'>{alert}</Alert>}
                <h2>Lista de alumnos</h2>
                <Table >
                    <thead>
                        <tr>
                            <th>Apellido</th>
                            <th>Nombre</th>
                            <th>Cédula</th>
                            <th>Nombre responsable</th>
                            <th>Teléfono</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {listaAlumnos.slice().sort((a, b) => a.apellido.localeCompare(b.apellido)).map(a =>
                            <tr key={a.id}>
                                <td>{a.apellido}</td>
                                <td>{a.nombre}</td>
                                <td>{a.cedula}</td>
                                <td>{`${a.responsables[0].nombre} ${a.responsables[0].apellido}`}</td>
                                <td>{a.responsables[0].telefono}</td>
                                <td>
                                    <Button className='btn-detalles' onClick={() => handleDetalles(a.id)}> <img src="../src/assets/info.svg" alt="Detalles" /> </Button>
                                    {tipoUsuario === 'Administrador' &&
                                        <>
                                            <Button className='btn-edit' onClick={() => handleEditar(a.id)}> <img src="../src/assets/edit.svg" alt="Editar" /> </Button>
                                            <Button className='btn-delete' onClick={() => handleEliminar(a.id)}><img src="../src/assets/delete.svg" alt="Eliminar" /></Button>
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
