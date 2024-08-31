import React, { useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { eliminarUsuarioService } from '../services/services'
import { eliminarUsuario } from '../redux/features/usuariosSlice'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import imgEdit from '/src/assets/edit.svg'
import imgDelete from '/src/assets/delete.svg'

export const ListadoUsuarios = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [alerta, setAlerta] = useState()
    const [warning, setWarning] = useState()

    const listaUsuarios = useSelector(store => store.listaUsuarios)

    const handleEliminar = async (id) => {
        const token = sessionStorage.getItem('token')
        try {
            const confirmar = window.confirm("Esta seguro de eliminar?")
            if (confirmar) {
                await eliminarUsuarioService(id, token)
                dispatch(eliminarUsuario(id))
                toast.warn("Usuario eliminado", { position: "top-center", theme: "dark", })
            }
        } catch (error) {
            toast.error(error.message, { position: "top-center", theme: "dark", })
        }
    }

    const handleEditar = (id) => {
        navigate(`/usuarios/editar/${id}`)
    }

    return (
        <>
            <Container>
                <ToastContainer autoClose={2500} />
                <h2>Lista de usuarios</h2>
                <Table >
                    <thead>
                        <tr>
                            <th>Nombre completo</th>
                            <th>Email</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>Tipo de usuario</th>
                            <th>Acciones</th>
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
                                    <Button className='btn-edit' onClick={() => handleEditar(u.id)}> <img src={imgEdit} alt="Editar" /> </Button>
                                    <Button className='btn-delete' onClick={() => handleEliminar(u.id)}><img src={imgDelete} alt="Eliminar" /></Button>
                                </td>
                            </tr>
                        )}
                    </tbody>

                </Table>
            </Container>
        </>
    )
}