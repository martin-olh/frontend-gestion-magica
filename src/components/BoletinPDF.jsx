// BoletinPDF.js
import React, { useMemo } from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import imgLogo from '/src/assets/logo.jpg'
import fontRobotoReg from '/src/assets/Roboto-Regular.ttf'
import fontRobotoBold from '/src/assets/Roboto-Bold.ttf'


const colVioleta = '#840e66'
const colNaranja = '#ef7c16'
const colNegro = '#1B2432'
const colNegroSuave = '#363d46'
const colBlanco = '#E6E8E6'

Font.register({
    family: 'Roboto',
    src: fontRobotoReg,
});

Font.register({
    family: 'Roboto-bold',
    src: fontRobotoBold,
});

const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Roboto'
    },
    section: {
        marginBottom: 30,
    },
    title: {
        fontSize: 14,
        marginBottom: 20,
        marginTop: 20,
        color: colNegro,
        textAlign: 'center',
        fontFamily: 'Roboto-bold'
    },
    subTitulo: {
        fontSize: 14,
        marginBottom: 10,
        color: colNegro,
        fontFamily: 'Roboto-bold',
        textDecoration: 'underline'
    },
    header: {
        fontSize: 14,
    },
    text: {
        fontSize: 11,
        color: colNegro,
    },
    textArea: {
        fontSize: 12,
        border: 1,
    },
    image: {
        maxHeight: 70,
        maxWidth: 70,
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderWidth: 1,
        marginBottom: 10
    },
    tableCurso: {
        display: "table",
        width: "40%",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderWidth: 1,
        fontFamily: 'Roboto-bold',
        marginBottom: 20
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableCol: {
        width: "100%",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderBottomWidth: 1
    },
    tableHeader: {
        width: "100%",
        padding: 5,
        margin: "auto",
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 'heavy',
        backgroundColor: colVioleta,
        color: "#FFFFFF",
        fontFamily: 'Roboto-bold'
    },
    tableHeaderCurso: {
        width: "100%",
        padding: 5,
        margin: "auto",
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 'heavy',
        backgroundColor: colNegro,
        color: "#FFFFFF",
    },
    tableCell: {
        fontSize: 11,
        textAlign: 'justify',
        padding: 5,
        color: colNegro,
    },
    tableCellCurso: {
        fontSize: 12,
        textAlign: 'center',
        padding: 5,
        fontFamily: 'Roboto-bold',
        color: colNegro,
    }
});

const nombreTrimestre = (numero) => {
    switch (numero) {
        case 1:
            return 'Primer trimestre'
        case 2:
            return 'Segundo trimestre'
        case 3:
            return 'Tercer trimestre'
        default:
            break;
    }

}


const BoletinPDF = ({ boletin, espaciosConocimiento, curso, alumno }) => {

    const groupedAsignaturas = useMemo(() => {
        return espaciosConocimiento.map(espacio => ({
            ...espacio,
            asignaturas: boletin.asignaturas.filter(asig => asig.espacioConocimientoId === espacio.id),
        })).filter(espacio => espacio.asignaturas.length > 0);  // Filtrar espacios sin asignaturas
    }, [boletin, espaciosConocimiento]);

    return (
        curso.tipoCurso == 'Primaria' ?
            <Document>
                <Page style={styles.page}>
                    <View style={styles.image}>
                        <Image src={imgLogo}></Image>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.title}>REPORTE DEL DESEMPEÑO DEL ESTUDIANTE</Text>
                        <View style={styles.tableCurso}>
                            <View style={styles.tableRow}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableHeaderCurso}>{nombreTrimestre(boletin.trimestre)} - {curso.grado} - {curso.anio}</Text>
                                </View>
                            </View>
                            <View style={styles.tableRow}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCellCurso}>{alumno.apellido}, {alumno.nombre}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {groupedAsignaturas.map(espacio => (
                        <View key={espacio.id} style={styles.section}>
                            <Text style={styles.subTitulo}>{espacio.nombre}</Text>
                            {espacio.asignaturas.map(asig => (
                                <View key={asig.id}>
                                    <View style={styles.table}>
                                        <View style={styles.tableRow}>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableHeader}>{asig.titulo}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.tableRow}>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{asig.juicio}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ))}
                </Page>
            </Document>
            :
            <Document>
                <Page style={styles.page}>
                    <View style={styles.image}>
                        <Image src={imgLogo}></Image>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.title}>REPORTE DEL DESEMPEÑO DEL ESTUDIANTE</Text>
                        <View style={styles.tableCurso}>
                            <View style={styles.tableRow}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableHeaderCurso}>{curso.grado} - {curso.anio}</Text>
                                </View>
                            </View>
                            <View style={styles.tableRow}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCellCurso}>{alumno.apellido}, {alumno.nombre}</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.text}>
                            La finalidad de este reporte es informar a la familia sobre los logros alcanzados por
                            el alumno, su progreso, los aprendizajes que todavía no ha logrado y
                            recomendaciones para mejorar.
                        </Text>
                    </View>
                    {groupedAsignaturas.map(espacio => (
                        <View key={espacio.id} style={styles.section}>
                            <Text style={styles.subTitulo}>{espacio.nombre}</Text>
                            {espacio.asignaturas.map(asig => (
                                <View key={asig.id}>
                                    <View style={styles.table}>
                                        <View style={styles.tableRow}>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableHeader}>{asig.titulo}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.tableRow}>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{asig.juicio}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ))}
                </Page>
            </Document>
    );
};

export default BoletinPDF;


