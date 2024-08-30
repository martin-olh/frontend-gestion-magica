import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginService } from '../services/services'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Alertas } from './Alertas'
import logo from '/src/assets/logo.jpg'
import { Spinner } from 'react-bootstrap'

export const Login = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [alerta, setAlerta] = useState('')
    const [loading, setLoading] = useState(false)

    const handleUserChange = (e) => {
        setUser(e.target.value)
    }

    const handlePassChange = (e) => {
        setPass(e.target.value)
    }

    const loginDisabled = !user || !pass;

    const onSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        try {
            const resultado = await loginService(user, pass)
            let sessionStorage = window.sessionStorage

            sessionStorage.setItem("token", resultado.token)
            sessionStorage.setItem("id", resultado.usuario.id)
            sessionStorage.setItem("email", resultado.usuario.email)
            sessionStorage.setItem("password", resultado.usuario.password)
            sessionStorage.setItem("nombre", resultado.usuario.nombre)
            sessionStorage.setItem("apellido", resultado.usuario.apellido)
            sessionStorage.setItem("telefono", resultado.usuario.telefono)
            sessionStorage.setItem("direccion", resultado.usuario.direccion)
            sessionStorage.setItem("tipoUsuario", resultado.usuario.tipoUsuario)

            setAlerta(`Bienvenido ${resultado.usuario.nombre}!`)
            navigate('/dashboard')
        } catch (error) {
            setAlerta(error.message)
            setLoading(false)
        }
    }


    return (
        <Container className='container-fluid mt-4'>
            <Row className='justify-content-center mb-3'>
                <Col xs={10} sm={10} md={8} lg={6}>
                    <h2>Iniciar sesión</h2>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col xs={10} sm={10} md={8} lg={6}>
                    <Alertas error={alerta}></Alertas>
                </Col>
            </Row>
            <Row className='justify-content-center mb-3'>
                <Col xs={10} sm={10} md={8} lg={6}>
                    <Card  >
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicUser">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control onChange={handleUserChange} type="email" placeholder="Ingrese email" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control onChange={handlePassChange} type="password" placeholder="Ingrese contraseña" />
                                </Form.Group>
                                <Button className='bg-naranja' variant="primary" type="submit" disabled={loginDisabled || loading}>
                                    {loading ? <Spinner animation="border" size="sm" /> : "Ingresar"}
                                </Button>

                            </Form>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col className='text-center' xs={10} sm={10} md={8} lg={6}>
                    <img src={logo} align='center' width="180px" />
                </Col>
            </Row>
        </Container>
    )
}