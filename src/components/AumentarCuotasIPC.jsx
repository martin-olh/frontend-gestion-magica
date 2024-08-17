import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Alertas } from './Alertas'
import { aumentarCuotasIPCService } from '../services/services'

export const AumentarCuotasIPC = () => {

    const [alerta, setAlerta] = useState('')
    const [exito, setExito] = useState('')
    const [porcentaje, setPorcentaje] = useState(0)

    const handleChange = (e) => {
        const { value } = e.target;

        setPorcentaje(value)
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            const confirmar = window.confirm("Confirmar aumento de cuotas?")
            if (confirmar) {
                await aumentarCuotasIPCService(sessionStorage.getItem('token'), porcentaje)
                setExito("Incremento aplicado exitosamente")
                setAlerta('')
            }
        } catch (error) {
            setAlerta(error.message)
            setExito('')
        }
    }


    return (

        <Container className='container-fluid'>
            <Row>
                <h2>Aumentar cuotas - Ajuste IPC</h2>
            </Row>
            <Row>
                <Alertas error={alerta} exito={exito}></Alertas>
            </Row>

            <Row>
                <Col>
                    <Form onSubmit={onSubmit}>

                        <Form.Group className="mb-3" controlId="porcentaje">
                            <Form.Label>* Porcentaje incremento</Form.Label>
                            <Form.Control onChange={handleChange} type="number" placeholder="Ingrese el porcentaje" value={porcentaje} name="porcentaje" />
                        </Form.Group >

                        <Button variant="primary" type="submit">
                            Confirmar
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <p className='mt-3'><small>• Esta acción impactará al valor de las cuotas de TODAS las inscripciones. Tenga cuidado.</small></p>
            </Row>
        </Container>


    )
}
