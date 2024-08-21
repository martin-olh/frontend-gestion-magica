import React from 'react'
import { Grafica } from './Grafica'
import { Col, Container, Row } from 'react-bootstrap';

export const GraficaGastos = ({ listaFiltrada }) => {

    const callback = (acumulador, gasto) => {
        if (acumulador[gasto.categoriaNombre]) {
            acumulador[gasto.categoriaNombre] = acumulador[gasto.categoriaNombre] + gasto.monto;
        } else {
            acumulador[gasto.categoriaNombre] = gasto.monto;
        }
        return acumulador;
    }

    const resultado = listaFiltrada.reduce(callback, {});

    const etiquetas = Object.keys(resultado);
    const valores = Object.values(resultado);


    return (
        <>

            <Row className='justify-content-center'>
                <Col xs={6}>
                    <Grafica etiquetas={etiquetas} valores={valores} nombreGrafica="Totales por categoría" nombreDatos="Monto total"></Grafica>
                </Col>
            </Row>

        </>
    )
}
