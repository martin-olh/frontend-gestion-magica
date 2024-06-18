import React, { useState } from 'react'
import { Alert, Button, Container, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { eliminarUsuarioService } from '../services/services'
import { eliminarUsuario } from '../redux/features/usuariosSlice'
import { useNavigate } from 'react-router-dom'

export const ListadoUsuarios = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [alert, setAlert] = useState()

    const listaUsuarios = useSelector(store => store.listaUsuarios)

    const handleEliminar = async (id) => {
        const token = sessionStorage.getItem('token')
        try {
            const confirmar = window.confirm("Esta seguro de eliminar?");
            if (confirmar) {
                await eliminarUsuarioService(id, token);
                dispatch(eliminarUsuario(id));
                setAlert('Usuario eliminado');
            }
        } catch (error) {
            setAlert(error.message);
        }
    }

    const handleEditar = (id) => {
        navigate(`/usuarios/editar/${id}`)
    }

    return (
        <>
            <Container>
                {alert && <Alert variant='warning'>{alert}</Alert>}
                <h2>Lista de usuarios</h2>
                <Table >
                    <thead>
                        <tr>
                            <th>Nombre completo</th>
                            <th>Email</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>Tipo de usuario</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {listaUsuarios.slice().sort((a, b) => a.apellido.localeCompare(b.apellido)).map(u =>
                            <tr key={u.id}>
                                <td>{`${u.apellido}, ${u.nombre}`}</td>
                                <td>{u.email}</td>
                                <td>{u.direccion}</td>
                                <td>{u.telefono}</td>
                                <td>{u.tipoUsuario}</td>
                                <td>
                                    <Button className='btn-edit' onClick={() => handleEditar(u.id)}> <img src="../src/assets/edit.svg" alt="Editar" /> </Button>
                                    <Button className='btn-delete' onClick={() => handleEliminar(u.id)}><img src="../src/assets/delete.svg" alt="Eliminar" /></Button>
                                </td>
                            </tr>
                        )}
                    </tbody>

                </Table>
            </Container>
        </>
    )
}