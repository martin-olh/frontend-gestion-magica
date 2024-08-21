import React, { useEffect, useState } from 'react'
import { obtenerGastosService } from '../services/services'
import { Button, Card, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import { GraficaGastos } from './GraficaGastos'
import { TablaGastos } from './TablaGastos'
import { Alertas } from './Alertas'

export const ResumenGastos = () => {

    const [alerta, setAlerta] = useState('')

    const [fechaInicio, setFechaInicio] = useState('')
    const [fechaFin, setFechaFin] = useState('')

    const [listaGastos, setListaGastos] = useState([])
    const [listaFiltrada, setListaFiltrada] = useState([])

    useEffect(() => {

        const fetchGastos = async () => {
            try {
                const token = sessionStorage.getItem('token')
                const gastos = await obtenerGastosCall(token)
                if (gastos) {
                    setListaGastos(gastos)
                    setListaFiltrada(gastos)
                }
            } catch (error) {
                console.error('Error al obtener gastos:', error)
                setAlerta(error.mensaje)
            }
        }

        fetchGastos()

    }, [])

    const obtenerGastosCall = async (token) => {
        try {
            const gastos = await obtenerGastosService(token)
            return gastos
        } catch (error) {
            setAlerta(error.mensaje)
            return []
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (fechaInicio && fechaFin) {
            const inicio = new Date(fechaInicio)
            const fin = new Date(fechaFin)

            fin.setHours(23, 59, 59, 999)



            const filtrados = listaGastos.filter(gasto => {
                const fechaGasto = new Date(gasto.fecha)
                return fechaGasto >= inicio && fechaGasto <= fin
            })

            setListaFiltrada(filtrados)

        } else {
            setAlerta('Por favor, seleccione ambas fechas para filtrar los gastos.');
        }

    }

    const handleChangeIni = (e) => {
        setFechaInicio(e.target.value)
    }

    const handleChangeFin = (e) => {
        setFechaFin(e.target.value)
    }

    const resetFiltro = () => {
        setListaFiltrada(listaGastos)
    }

    return (
        <Container>
            <Row><Alertas error={alerta}></Alertas></Row>

            <Row className='mb-3'><h2>Resumen de gastos</h2></Row>

            <Row className='mb-2'>
                <Card>
                    <Card.Body>
                        <Form onSubmit={onSubmit}>
                            <Row className="align-items-center">
                                <Col xs={4}>
                                    <Form.Group controlId="fechaInicio">
                                        <FloatingLabel label="Desde">
                                            <Form.Control onChange={handleChangeIni} type="date" placeholder="Seleccione fecha inicio" value={fechaInicio} name="fechaInicio" />
                                        </FloatingLabel>
                                    </Form.Group >
                                </Col>
                                <Col xs={4}>
                                    <Form.Group controlId="fechaFin">
                                        <FloatingLabel label="Hasta">
                                            <Form.Control onChange={handleChangeFin} type="date" placeholder="Seleccione fecha final" value={fechaFin} name="fechaFin" />
                                        </FloatingLabel>
                                    </Form.Group >
                                </Col>
                                <Col xs={4} className='d-flex justify-content-evenly'>
                                    <Button variant="primary" type="submit">Filtrar</Button>
                                    <Button variant="secondary" type="button" onClick={resetFiltro}>Restaurar filtro</Button>
                                </Col>
                            </Row>
                        </Form>

                    </Card.Body>
                </Card>
            </Row>

            <Row className='mb-2'>
                <Card>
                    <Card.Body>
                        <TablaGastos listaFiltrada={listaFiltrada}></TablaGastos>
                    </Card.Body>
                </Card>
            </Row>

            <Row className='mb-2'>
                <Card>
                    <Card.Body>
                        <GraficaGastos listaFiltrada={listaFiltrada}></GraficaGastos>
                    </Card.Body>
                </Card>
            </Row>

        </Container>
    )
}
