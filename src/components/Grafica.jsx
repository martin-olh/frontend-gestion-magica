import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PieController,
    ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export const Grafica = ({ etiquetas, valores, nombreGrafica, nombreDatos }) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: nombreGrafica,
            },
        },
    };

    const labels = etiquetas;
    //x

    const data = {
        labels,
        datasets: [
            {
                label: nombreDatos,
                data: valores,
                backgroundColor: [
                    'rgba(239, 124, 32, 1)',
                    'rgba(165, 30, 107, 1)',
                    'rgba(33, 118, 174, 1)',
                    'rgba(226, 207, 234, 1)',
                    'rgba(6, 39, 38, 1)',
                ],
            }
        ],
    };


    return (
        <Doughnut options={options} data={data} />
    )
}