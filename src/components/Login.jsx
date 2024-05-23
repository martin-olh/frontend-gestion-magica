import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginService } from '../services/services'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import { jwtHelper } from '../helpers/jwtHelper'

export const Login = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [alerta, setAlerta] = useState('')

    const handleUserChange = (e) => {
        setUser(e.target.value)
    }

    const handlePassChange = (e) => {
        setPass(e.target.value)
    }

    const loginDisabled = !user || !pass;

    const onSubmit = async (event) => {
        event.preventDefault()

        try {
            const resultado = await loginService(user, pass)
            let localStorage = window.localStorage
            //const tokenDecoded = jwtHelper(resultado)

            localStorage.setItem("token", resultado.token)
            localStorage.setItem("id", resultado.usuario.id)
            localStorage.setItem("email", resultado.usuario.email)
            localStorage.setItem("nombre", resultado.usuario.nombre)
            localStorage.setItem("apellido", resultado.usuario.apellido)

            setAlerta(`Bienvenido ${resultado.usuario.nombre}!`)
            //navigate('/dashboard')
        } catch (error) {
            setAlerta(error.message)

        }
    }


    return (
        <Container className='container-fluid'>
            <Row className='justify-content-center'>
                <Col xs={6}>
                    <h2>Login</h2>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col xs={6}>
                    {
                        alerta ? <Alert variant='danger'>{alerta}</Alert>
                            : <></>
                    }
                </Col>
            </Row>
            <Row className='justify-content-center mb-3'>
                <Col xs={6}>
                    <Card  >
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicUser">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control onChange={handleUserChange} type="email" placeholder="Ingrese nombre" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={handlePassChange} type="password" placeholder="Password" />
                                </Form.Group>
                                <Button variant="primary" type="submit" disabled={loginDisabled}>
                                    Ingresar
                                </Button>
                            </Form>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='justify-content-center mb-5'>
                <Col xs={6}>
                    <Card>
                        <Card.Body>
                            <p>No tiene usuario? <a href='/registro'>Registrarse</a></p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}