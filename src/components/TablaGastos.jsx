import React, { useState } from 'react'
import { Container, Table, Pagination, Row, Col, Button } from 'react-bootstrap'
import imgDelete from '/src/assets/delete.svg'
import { ToastContainer, toast } from 'react-toastify'
import { eliminarGastoService } from '../services/services'

export const TablaGastos = ({ listaFiltrada }) => {

    const [paginaActual, setPaginaActual] = useState(1)
    const itemsPorPagina = 10

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const formatMonto = (monto) => {
        return new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU' }).format(monto)
    }

    const handleClick = (numero) => {
        setPaginaActual(numero)
    }

    // Calcular los elementos a mostrar en la página actual
    const indiceUltimoItem = paginaActual * itemsPorPagina
    const indicePrimerItem = indiceUltimoItem - itemsPorPagina
    const itemsActuales = listaFiltrada.slice(indicePrimerItem, indiceUltimoItem)

    // Calcular la cantidad total de páginas
    const totalPagina = Math.ceil(listaFiltrada.length / itemsPorPagina)

    // Crear los elementos de la paginación
    const paginationItems = []
    for (let number = 1; number <= totalPagina; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === paginaActual} onClick={() => handleClick(number)}>
                {number}
            </Pagination.Item>
        )
    }

    const handleEliminar = async (id) => {
        const token = sessionStorage.getItem('token')
        try {
            const confirmar = window.confirm("Esta seguro de eliminar?")
            if (confirmar) {
                await eliminarGastoService(token, id)
                    .then(toast.warn("Gasto eliminado", { position: "top-center", theme: "dark", })
                    )
            }
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        } catch (error) {
            toast.error(error.message, { position: "top-center", theme: "dark", })
        }
    }

    return (
        <Container>
            <ToastContainer autoClose={2500} />
            {listaFiltrada.length > 0 ?
                <>
                    <Table>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Categoría</th>
                                <th>Concepto</th>
                                <th>Monto</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsActuales.map(g =>
                                <tr key={g.id}>
                                    <td>{formatDate(g.fecha)}</td>
                                    <td>{g.categoriaNombre}</td>
                                    <td>{g.concepto}</td>
                                    <td>{formatMonto(g.monto)}</td>
                                    <td><Button className='btn-delete' title="Eliminar" onClick={() => handleEliminar(g.id)}><img src={imgDelete} alt="Eliminar" /></Button></td>
                                </tr>
                            )}


                        </tbody>

                    </Table>
                    <Row className="justify-content-center">
                        <Col xs="auto">
                            <Pagination>{paginationItems}</Pagination>
                        </Col>
                    </Row>
                </>
                :
                <p>No hay datos para mostrar</p>
            }
        </Container>
    )
}
