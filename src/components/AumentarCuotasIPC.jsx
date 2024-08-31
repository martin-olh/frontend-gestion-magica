import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { aumentarCuotasIPCService } from '../services/services'
import { ToastContainer, toast } from 'react-toastify'

export const AumentarCuotasIPC = () => {

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
                toast.success("Incremento aplicado exitosamente", { position: "top-center", theme: "dark", })
            }
        } catch (error) {
            toast.error(error.message, { position: "top-center", theme: "dark", })
        }
    }


    return (

        <Container className='container-fluid'>
            <ToastContainer autoClose={2500} />
            <Row>
                <h2>Aumentar cuotas - Ajuste IPC</h2>
            </Row>
            <Row>
                <Col xs={4}>
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
