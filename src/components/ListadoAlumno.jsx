import React, { useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { eliminarAlumnoService } from '../services/services'
import { eliminarAlumno } from '../redux/features/alumnosSlice'
import { useNavigate } from 'react-router-dom'
import { Alertas } from './Alertas'
import imgEdit from '/src/assets/edit.svg'
import imgDelete from '/src/assets/delete.svg'
import imgInfo from '/src/assets/info.svg'

export const ListadoAlumno = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [alerta, setAlerta] = useState()
    const [warning, setWarning] = useState()

    const listaAlumnos = useSelector(store => store.listaAlumnos)

    const tipoUsuario = sessionStorage.getItem('tipoUsuario')

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

    const handleEditar = (id) => {
        navigate(`/alumnos/editar/${id}`)
    }

    const handleDetalles = (id) => {
        navigate(`/alumnos/detalles/${id}`)
    }


    return (
        <>
            <Container>
                <Alertas error={alerta} warning={warning}></Alertas>
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
                                    <Button className='btn-detalles' onClick={() => handleDetalles(a.id)}> <img src={imgInfo} alt="Detalles" /> </Button>
                                    {tipoUsuario === 'Administrador' &&
                                        <>
                                            <Button className='btn-edit' onClick={() => handleEditar(a.id)}> <img src={imgEdit} alt="Editar" /> </Button>
                                            <Button className='btn-delete' onClick={() => handleEliminar(a.id)}><img src={imgDelete} alt="Eliminar" /></Button>
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
