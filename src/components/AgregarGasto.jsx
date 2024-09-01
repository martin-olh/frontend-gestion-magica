import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { agregarGastoService } from '../services/services'
import { ToastContainer, toast } from 'react-toastify'

export const AgregarGasto = () => {

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
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            validarDatosGasto()
            const resultado = await agregarGastoService(sessionStorage.getItem('token'), gasto)
            toast.success("Gasto registrado correctamente", { position: "top-center", theme: "dark", })
            setGasto(gastoVacio)
        } catch (error) {
            toast.error(error.message, { position: "top-center", theme: "dark", })
        }
    }

    const validarDatosGasto = () => {
        if (gasto.categoriaGastoId == 0) {
            throw new Error("Debe selecciona una categoría")
        }
        if (gasto.concepto == "") {
            throw new Error("Debe ingresar un concepto")
        }
        if (gasto.fecha == "") {
            throw new Error("Debe ingresar una fecha")
        }
        if (gasto.monto <= 0) {
            throw new Error("Debe ingresar un monto válido")
        }
    }


    return (
        <Container className='container-fluid'>
            <ToastContainer autoClose={2500} />
            <Row>
                <h2>Registrar gasto</h2>
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
                            Registrar gasto
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

