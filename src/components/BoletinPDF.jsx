// BoletinPDF.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import imgLogo from '/src/assets/logo.jpg'
import logoHeader from '/src/assets/logo-h.png'

const colVioleta = '#a51e6b'
const colNaranja = '#ef7c16'
const colNegro = '#1B2432'
const colNegroSuave = '#363d46'
const colBlanco = '#E6E8E6'
const colBlancoFondo = '#bacbe6'

const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: colBlancoFondo,
    },
    section: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        color: colVioleta,
    },
    header: {
        fontSize: 14,
    },
    text: {
        fontSize: 12,
        border: 1,
    },
    image: {
        maxHeight: 100,
    },
});

const BoletinPDF = ({ boletin }) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.section}>
                <Image src={logoHeader}></Image>
            </View>
            <View style={styles.section}>
                <Text style={styles.title}>Boletín</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>Espacio Científico Matemático:</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>{boletin.espCientificoMatematico}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>Comunicación:</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>{boletin.espComunicacion}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>Ciencias Sociales:</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>{boletin.espCienciasSociales}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>Desarrollo Personal:</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>{boletin.espDesarrolloPersonal}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>Inglés:</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>{boletin.espIngles}</Text>
            </View>
            {boletin.trimestre == 3 ?
                <>
                    <View style={styles.section}>
                        <Text style={styles.header}>Valoración Final:</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.text}>{boletin.valoracionFinal}</Text>
                    </View>
                </>
                : <></>
            }
        </Page>
    </Document>
);

export default BoletinPDF;