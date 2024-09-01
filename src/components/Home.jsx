import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import imgHome from '/src/assets/home.svg'

export const Home = () => {

    const nombre = sessionStorage.getItem('nombre')

    return (

        <Container className='container-fluid mt-4'>

            <Row className='justify-content-center mb-3'>
                <Col xs={6}>
                    <Card className='welcome'>
                        <Card.Body >
                            <h3 className='mb-3'>Bienvenido/a {nombre}!</h3>
                            <p> Seleccionar una opción del menú para comenzar</p>
                            <img className='mb-3' src={imgHome} alt="" />


                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    )
}