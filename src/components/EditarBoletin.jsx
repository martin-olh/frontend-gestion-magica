import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { actualizarBoletinService, obtenerBoletinService } from '../services/services';
import { Form, Col, Container, Row, Button, FloatingLabel } from 'react-bootstrap';
import { Alertas } from './Alertas';
import BoletinPDF from './BoletinPDF';
import { pdf } from '@react-pdf/renderer';

export const EditarBoletin = () => {
    const { idInscripcion, idBoletin } = useParams();
    const token = sessionStorage.getItem("token");
    const tipoUsuario = sessionStorage.getItem("tipoUsuario");

    const navigate = useNavigate();

    const [alerta, setAlerta] = useState('');
    const [exito, setExito] = useState('');

    const listaInscripciones = useSelector(store => store.listaInscripciones);
    const listaAlumnos = useSelector(store => store.listaAlumnos);
    const listaCursos = useSelector(store => store.listaCursos);
    const listaEspaciosConocimiento = useSelector(store => store.listaEspaciosConocimiento);

    const [alumno, setAlumno] = useState(null);
    const [curso, setCurso] = useState(null);
    const [boletin, setBoletin] = useState(null);

    const asignaturaVacia = {
        id: 0,
        titulo: "",
        juicio: "",
        espacioConocimientoId: 0
    };

    useEffect(() => {
        const insc = listaInscripciones.find(i => i.id == idInscripcion);
        if (insc) {
            const alumnoFind = listaAlumnos.find(a => a.id == insc.alumnoId);
            if (alumnoFind) {
                setAlumno(alumnoFind);
            }
            const cursoFind = listaCursos.find(c => c.id == insc.cursoId);
            if (cursoFind) {
                setCurso(cursoFind);
            }
        }
        obtenerBoletinCall(token, idBoletin);
    }, [listaInscripciones, listaAlumnos, listaCursos, idInscripcion, idBoletin]);

    const obtenerBoletinCall = async (token, id) => {
        try {
            const boletinFind = await obtenerBoletinService(token, id);
            setBoletin(boletinFind);
        } catch (error) {
            setAlerta(error.mensaje);
        }
    };

    const handleChangeAsignatura = (e, index) => {
        const { name, value } = e.target;
        const nuevasAsignaturas = [...boletin.asignaturas];
        nuevasAsignaturas[index] = { ...nuevasAsignaturas[index], [name]: value };
        setBoletin(prevBoletin => ({ ...prevBoletin, asignaturas: nuevasAsignaturas }));
        setAlerta('');
        setExito('');
    };

    const agregarAsignatura = () => {
        setBoletin(prevBoletin => ({
            ...prevBoletin,
            asignaturas: [...prevBoletin.asignaturas, asignaturaVacia]
        }));
    };

    const handleOpenPDF = async (boletinId) => {
        try {
            const boletinData = await obtenerBoletinService(token, boletinId);
            const blob = await pdf(<BoletinPDF boletin={boletinData} />).toBlob();
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        } catch (error) {
            setAlerta(error.message);
        }
    };

    const handleAprobar = (e) => {
        const { name, type, checked, value } = e.target;
        const inputValue = type === 'checkbox' ? checked : value
        setBoletin(prevBoletin => ({ ...prevBoletin, [name]: inputValue }))

    }

    const onSubmit = async (event) => {
        event.preventDefault();

        const asignaturasInvalidas = boletin.asignaturas.some(asignatura => asignatura.espacioConocimientoId === "" || asignatura.espacioConocimientoId === 0);
        if (asignaturasInvalidas) {
            setAlerta("Debes seleccionar un espacio de conocimiento válido para todas las asignaturas.");
            return;
        }

        try {
            const updatedBol = { ...boletin, editado: true };
            setBoletin(updatedBol);
            await actualizarBoletinService(idBoletin, updatedBol, token);
            setExito("Boletin actualizado exitosamente");
            if (boletin.finalizado) {
                handleOpenPDF(idBoletin); //Exporta PDF antes de redirigir
            }
            setAlerta('');
            if (tipoUsuario == 'Maestro') {
                setTimeout(() => {
                    const inscRedirect = listaInscripciones.find(i => i.id == idInscripcion);
                    navigate(`/cursos/inscripciones/${inscRedirect.cursoId}`);
                }, 2000);
            } else {
                setTimeout(() => {
                    navigate(`/boletines/aprobar/`);
                }, 2000);
            }
        } catch (error) {
            setAlerta(error.message);
            setExito('');
        }
    };

    return (
        <>
            {boletin ?
                <Container className='container-fluid'>
                    <Row className='mb-3'>
                        <h2>Editar boletín</h2>
                    </Row>
                    <Row>
                        <Alertas error={alerta} exito={exito}></Alertas>
                    </Row>
                    <Row>
                        {curso ?
                            <p>Boletin {boletin.trimestre} - {curso.grado} {`(${curso.anio})`}</p> : ""
                        }
                        {alumno ?
                            <p>Alumno: <strong>{alumno.nombre} {alumno.apellido}</strong></p> : ""
                        }
                    </Row>
                    <hr />
                    <Row>
                        <Col xs={10}>
                            <Form onSubmit={onSubmit}>
                                {boletin.asignaturas.map((asignatura, index) => (
                                    <Row key={`row-${index}`}>
                                        <Form.Group className="mb-3">
                                            <Form.Group className="mb-2" controlId={`espacioConocimientoId-${index}`}>
                                                {/* <Form.Label>Asignatura</Form.Label> */}
                                                <FloatingLabel label="Espacio de conocimiento">
                                                    <Form.Select onChange={(e) => handleChangeAsignatura(e, index)} disabled={boletin.finalizado} value={asignatura.espacioConocimientoId} name="espacioConocimientoId">
                                                        <option>Seleccionar espacio de conocimiento</option>
                                                        {curso && curso.tipoCurso == "Primaria" && listaEspaciosConocimiento.length > 0 ?
                                                            listaEspaciosConocimiento.filter(e => e.tipoCurso == "Primaria" || e.tipoCurso == "General")
                                                                .map(e => <option key={e.id} value={e.id}>{`${e.nombre}`}</option>)
                                                            :
                                                            listaEspaciosConocimiento.filter(e => e.tipoCurso == "Inicial" || e.tipoCurso == "General")
                                                                .map(e => <option key={e.id} value={e.id}>{`${e.nombre}`}</option>)
                                                        }
                                                    </Form.Select>
                                                </FloatingLabel>
                                            </Form.Group >
                                            <Form.Group className="mb-2" controlId={`titulo-${index}`}>
                                                <FloatingLabel label="Ingresar título">
                                                    <Form.Control onChange={(e) => handleChangeAsignatura(e, index)} disabled={boletin.finalizado} type="text" value={asignatura.titulo ?? ""} name="titulo" />
                                                </FloatingLabel>
                                            </Form.Group>
                                            <Form.Group className="mb-2" label="juicio">
                                                <FloatingLabel label="Ingresar juicio">
                                                    <Form.Control className='text-area-boletin' onChange={(e) => handleChangeAsignatura(e, index)} disabled={boletin.finalizado} as="textarea" value={asignatura.juicio ?? ""} name="juicio" />
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Form.Group>
                                        <hr />
                                    </Row>
                                ))}
                                <Row>
                                    <Col xs={4}>
                                        <Button disabled={boletin.finalizado} variant="secondary" className="mb-3" onClick={agregarAsignatura}>
                                            Agregar Asignatura
                                        </Button>
                                        <hr />
                                    </Col>
                                </Row>

                                {tipoUsuario != "Maestro" &&
                                    <Row>
                                        <Form.Group className="mb-3" controlId="finalizado">
                                            <Form.Check onChange={handleAprobar} type="switch" checked={boletin.finalizado} name="finalizado" label="Aprobar boletín" />
                                        </Form.Group >
                                    </Row>
                                }
                                <Row>
                                    <Col>
                                        <Button variant="primary" type="submit">
                                            Guardar
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                :
                <></>
            }
        </>
    );
};
