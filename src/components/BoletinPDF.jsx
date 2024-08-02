// BoletinPDF.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    section: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
    },
    text: {
        fontSize: 12,
    },
});

const BoletinPDF = ({ boletin }) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}>Boletín</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Espacio Científico Matemático: {boletin.espCientificoMatematico}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Comunicación: {boletin.espComunicacion}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Ciencias Sociales: {boletin.espCienciasSociales}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Desarrollo Personal: {boletin.espDesarrolloPersonal}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Inglés: {boletin.espIngles}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Valoración Final: {boletin.valoracionFinal}</Text>
            </View>
        </Page>
    </Document>
);

export default BoletinPDF;