import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { agregarUsuario } from '../redux/features/usuariosSlice'
import { agregarUsuarioService } from '../services/services'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Alertas } from './Alertas'
import { useNavigate } from 'react-router-dom'

export const AgregarUsuario = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [alerta, setAlerta] = useState('')
    const [exito, setExito] = useState('')

    const usuarioVacio = {
        id: 0,
        email: "",
        password: "",
        nombre: "",
        apellido: "",
        telefono: "",
        direccion: "",
        tipoUsuario: ""
    }

    const [usuario, setUsuario] = useState(usuarioVacio)

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value })
        setAlerta('')
        setExito('')
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            validarDatosUsuario()

            const resultado = await agregarUsuarioService(sessionStorage.getItem('token'), usuario)
            usuario.id = resultado.id //guardo id del usuario creado, devuelto por la API
            dispatch(agregarUsuario(usuario))
            setUsuario(usuarioVacio)
            setExito("Usuario creado con éxito")
            setAlerta('')
            setTimeout(() => {
                navigate(`/usuarios/listado/`)
            }, 2000)


        } catch (error) {
            setAlerta(error.message)
            setExito('')

        }
    }

    const validarDatosUsuario = () => {
        if (usuario.email == "") {
            throw new Error("El email no puede estar vacío")
        }
        if (usuario.password == "") {
            throw new Error("La contraseña no puede estar vacía")
        }
        if (usuario.password.length < 8) {
            throw new Error("La contraseña debe tener al menos 8 caracteres")
        }
        if (usuario.nombre == "") {
            throw new Error("El nombre no puede estar vacío")
        }
        if (usuario.apellido == "") {
            throw new Error("El apellido no puede estar vacío")
        }
        if (usuario.tipoUsuario == "") {
            throw new Error("El tipo de usuario no puede estar vacío")
        }
    }

    return (
        <Container className='container-fluid'>
            <Row>
                <h2>Crear usuario</h2>
            </Row>
            <Row>
                <Alertas error={alerta} exito={exito}></Alertas>
            </Row>
            <Row>
                <Col xs={12} md={10} lg={10}>
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>* Email</Form.Label>
                            <Form.Control onChange={handleChange} type="email" placeholder="Ingrese email" value={usuario.email} name="email" />
                        </Form.Group >
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>* Contraseña</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Ingrese password" value={usuario.password} name="password" />
                        </Form.Group >
                        <Form.Group className="mb-3" controlId="nombre">
                            <Form.Label>* Nombre(s)</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Ingrese nombre" value={usuario.nombre} name="nombre" />
                        </Form.Group >
                        <Form.Group className="mb-3" controlId="apellido">
                            <Form.Label>* Apellido(s)</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Ingrese apellido" value={usuario.apellido} name="apellido" />
                        </Form.Group >
                        <Form.Group className="mb-3" controlId="telefono">
                            <Form.Label>Télefono</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Ingrese télefono" value={usuario.telefono} name="telefono" />
                        </Form.Group >
                        <Form.Group className="mb-3" controlId="direccion">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Ingrese dirección" value={usuario.direccion} name="direccion" />
                        </Form.Group >
                        <Form.Group className="mb-3" controlId="tipoUsuario">
                            <Form.Label>* Tipo de usuario</Form.Label>
                            <Form.Select onChange={handleChange} value={usuario.tipoUsuario} name="tipoUsuario">
                                <option>Seleccione tipo de usuario</option>
                                <option key={'Administrador'} value={'Administrador'}>Administrador</option>
                                <option key={'Coordinador'} value={'Coordinador'}>Coordinador</option>
                                <option key={'Maestro'} value={'Maestro'}>Maestro</option>
                            </Form.Select>
                        </Form.Group >

                        <Button variant="primary" type="submit">
                            Crear usuario
                        </Button>
                    </Form>


                </Col>
            </Row>
            <Row>
                <p className='mt-3'><small>• Los campos con * son obligatorios</small></p>
            </Row>



        </Container>
    )
}