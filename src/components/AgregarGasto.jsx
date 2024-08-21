import React, { useState } from 'react'
import { Alertas } from './Alertas'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { agregarGastoService } from '../services/services'

export const AgregarGasto = () => {

    const [alerta, setAlerta] = useState('')
    const [exito, setExito] = useState('')

    const gastoVacio = {
        id: 0,
        monto: 0,
        fecha: '',
        concepto: '',
        categoriaGastoId: 0
    }

    const categorias = useSelector(store => store.listaCategorias)

    const [gasto, setGasto] = useState(gastoVacio)

    const handleChange = (e) => {
        const { name, value } = e.target;

        setGasto(prevGasto => ({ ...prevGasto, [name]: value }))
        setAlerta('')
        setExito('')
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            validarDatosGasto()
            const resultado = await agregarGastoService(sessionStorage.getItem('token'), gasto)
            setExito("Gasto registrado correctamente")
            setAlerta('')
            setGasto(gastoVacio)
        } catch (error) {
            setAlerta(error.message)
            setExito('')
        }
    }

    const validarDatosGasto = () => {
        if (gasto.concepto == "") {
            throw new Error("Debe ingresar un concepto")
        }
        if (gasto.monto <= 0) {
            throw new Error("Debe ingresar un monto válido")
        }
        if (gasto.fecha == "") {
            throw new Error("Debe ingresar una fecha")
        }
    }


    return (
        <Container className='container-fluid'>
            <Row>
                <h2>Registrar gasto</h2>
            </Row>
            <Row>
                <Alertas error={alerta} exito={exito}></Alertas>
            </Row>

            <Row>
                <Col xs={12} md={10} lg={10}>
                    <Form onSubmit={onSubmit}>

                        <Form.Group className="mb-3" controlId="categoriaGastoId">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Select required onChange={handleChange} value={gasto.categoriaGastoId} name="categoriaGastoId">
                                <option>Seleccionar</option>
                                {categorias.length > 0 &&
                                    categorias.map(c => <option key={c.id} value={c.id}>{`${c.nombre}`}</option>)
                                }
                            </Form.Select>
                        </Form.Group >

                        <Form.Group className="mb-3" controlId="concepto">
                            <Form.Label>* Concepto</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Ingrese el concepto" value={gasto.concepto} name="concepto" />
                        </Form.Group >
                        <Form.Group className="mb-3" controlId="fecha">
                            <Form.Label>* Fecha</Form.Label>
                            <Form.Control onChange={handleChange} type="date" placeholder="Seleccione fecha" value={gasto.fecha} name="fecha" />
                        </Form.Group >
                        <Form.Group className="mb-3" controlId="monto">
                            <Form.Label>* Monto</Form.Label>
                            <Form.Control onChange={handleChange} type="number" placeholder="Ingrese el monto" value={gasto.monto} name="monto" />
                        </Form.Group >

                        <Button variant="primary" type="submit">
                            Registrar pago
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

