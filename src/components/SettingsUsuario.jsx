import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actualizarUsuario, agregarUsuario } from '../redux/features/usuariosSlice'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { actualizarUsuarioService } from '../services/services'
import { actualizarSession } from '../helpers/actualizarSession'

export const SettingsUsuario = () => {

    const { id } = useParams()
    const idUsuarioLogged = sessionStorage.getItem('id')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    if (id !== idUsuarioLogged) {
        navigate('/')
    }

    const [usuario, setUsuario] = useState({
        id: sessionStorage.getItem('id'),
        email: sessionStorage.getItem('email'),
        password: sessionStorage.getItem('password'),
        nombre: sessionStorage.getItem('nombre'),
        apellido: sessionStorage.getItem('apellido'),
        telefono: sessionStorage.getItem('telefono'),
        direccion: sessionStorage.getItem('direccion'),
        tipoUsuario: sessionStorage.getItem('tipoUsuario')
    })

    const [password2, setPassword2] = useState(usuario.password)

    const [alerta, setAlerta] = useState('')
    const [exito, setExito] = useState('')

    const handleChange = (e) => {
        if (e.target.name === "password2") {
            setPassword2(e.target.value)
        }
        else {
            setUsuario({ ...usuario, [e.target.name]: e.target.value })
        }
        setAlerta('')
        setExito('')
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            if (usuario.email == "") {
                throw new Error("El email no puede estar vacío")
            }
            if (usuario.password == "") {
                throw new Error("La contraseña no puede estar vacía")
            }
            if (usuario.password.length < 8) {
                throw new Error("La contraseña debe tener al menos 8 caracteres")
            }
            if (usuario.password !== password2) {
                throw new Error("Las contraseñas no coinciden")
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

            const resultado = await actualizarUsuarioService(id, usuario, sessionStorage.getItem('token'))
            dispatch(actualizarUsuario(usuario))
            actualizarSession(usuario)
            setExito("Usuario actualizado con éxito")
            setAlerta('')

        } catch (error) {
            setAlerta(error.message)
            setExito('')
        }
    }

    return (

        <Container className='container-fluid'>
            <Row>
                <h2>Editar usuario</h2>
            </Row>
            <Row>
                <Col xs={12} md={10} lg={10}>
                    {
                        alerta ? <Alert variant='danger'>{alerta}</Alert>
                            : <></>
                    }
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={10} lg={10}>
                    {
                        exito ? <Alert variant='success'>{exito}</Alert>
                            : <></>
                    }
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={10} lg={10}>
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={handleChange} type="email" placeholder="Ingrese email" value={usuario.email} name="email" />
                        </Form.Group >
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control onChange={handleChange} type="password" placeholder="Ingrese contraseña" value={usuario.password} name="password" />
                        </Form.Group >
                        <Form.Group className="mb-3" controlId="formPassword2">
                            <Form.Label>Confirmar contraseña</Form.Label>
                            <Form.Control onChange={handleChange} type="password" placeholder="Confrmar contraseña" value={password2} name="password2" />
                        </Form.Group >
                        <Form.Group className="mb-3" controlId="formNombre">
                            <Form.Label>Nombre(s)</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Ingrese nombre" value={usuario.nombre} name="nombre" />
                        </Form.Group >
                        <Form.Group className="mb-3" controlId="formApellido">
                            <Form.Label>Apellido(s)</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Ingrese apellido" value={usuario.apellido} name="apellido" />
                        </Form.Group >
                        <Form.Group className="mb-3" controlId="formTelefono">
                            <Form.Label>Télefono</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Ingrese télefono" value={usuario.telefono} name="telefono" />
                        </Form.Group >
                        <Form.Group className="mb-3" controlId="formDireccion">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Ingrese dirección" value={usuario.direccion} name="direccion" />
                        </Form.Group >
                        <Button variant="primary" type="submit">
                            Confirmar
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>

    )
}
