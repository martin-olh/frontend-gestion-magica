import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { agregarInscripcionService } from "../services/services"
import { Alertas } from "./Alertas"
import { useNavigate, useParams } from "react-router-dom"
import { actualizarInscripcion, agregarInscripcion } from "../redux/features/inscripcionesSlice"


export const AgregarInscripcion = () => {

    const { idAlumno } = useParams()

    const [alerta, setAlerta] = useState('')
    const [exito, setExito] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const anioActual = new Date().getFullYear()
    const listaCursos = useSelector(store => store.listaCursos)
    const listaCursosAnioActual = listaCursos.filter(c => c.anio == anioActual)
    const listaInscripciones = useSelector(store => store.listaInscripciones)
    const listaAlumnos = useSelector(store => store.listaAlumnos)

    const [alumno, setAlumno] = useState({ nombre: '', apellido: '' })
    const [ultimaInsc, setUltimaInsc] = useState(null)

    const inscVacia = {
        id: 0,
        fecha: "",
        cursoId: 0,
        montoCuota: 0,
        dobleHorario: false,
        observaciones: "",
        piscina: false,
        alumnoId: idAlumno,
        boletin1Id: 0,
        boletin2Id: 0,
        boletin3Id: 0,
        activa: true
    }

    const [inscripcion, setInscripcion] = useState(inscVacia)
    const [cursoActivo, setCursoActivo] = useState()
    const [cursoSeleccionado, setCursoSeleccionado] = useState()

    useEffect(() => {
        const alumnoFind = listaAlumnos.find(a => a.id == idAlumno)
        console.log('alumnoFind', alumnoFind)
        if (alumnoFind) {
            setAlumno(alumnoFind)
            const inscFind = listaInscripciones.find(i => i.alumnoId == alumnoFind.id && i.activa)
            console.log('insc Find', inscFind)
            if (inscFind) {
                setUltimaInsc(inscFind)
                const cursoFind = listaCursos.find(c => c.id == inscFind.cursoId)
                if (cursoFind) {
                    console.log('cursoFind', cursoFind)

                    setCursoActivo(cursoFind)
                }
            }

        }

    }, [listaAlumnos, listaCursos, listaInscripciones, idAlumno])

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;

        setInscripcion({ ...inscripcion, [name]: inputValue })
        setAlerta('')
        setExito('')
        if (name == "cursoId") {
            seleccionarCurso(value)
        }
    }

    const seleccionarCurso = (cursoId) => {
        const cursoSelecc = listaCursos.find(c => c.id == cursoId)
        if (cursoSelecc) {
            setCursoSeleccionado(cursoSelecc)
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            validarDatosAlumno()
            let updatedInsc = ({ ...inscripcion }) // Se crea para desactivar dobleHorario para inicial
            if (cursoSeleccionado.tipoCurso == "Inicial") {
                updatedInsc.dobleHorario = false
                setInscripcion(updatedInsc)
            }
            const resultado = await agregarInscripcionService(sessionStorage.getItem('token'), updatedInsc)
            inscripcion.id = resultado.id //guardo id de la inscripcion creada, devuelta por la API
            const nuevaUltimaInsc = { ...ultimaInsc, activa: false }
            setUltimaInsc(nuevaUltimaInsc)
            dispatch(actualizarInscripcion(nuevaUltimaInsc))
            dispatch(agregarInscripcion(inscripcion))
            setExito("Alumno inscripto correctamente")
            setAlerta('')
            setTimeout(() => {
                navigate(`/alumnos/listado/`)
            }, 2000)
        } catch (error) {
            setAlerta(error.message)
            setExito('')
        }
    }

    const validarDatosAlumno = () => {
        if (inscripcion.cursoId == 0) {
            throw new Error("Debe seleccionar un curso")
        }
        if (inscripcion.montoCuota <= 0) {
            throw new Error("Monto de cuota inválido")
        }
    }

    const formatMonto = (monto) => {
        return new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU' }).format(monto);
    }

    return (
        <Container className='container-fluid'>
            <Row>
                <h2>Inscribir alumno</h2>
            </Row>
            <Row>
                <Alertas error={alerta} exito={exito}></Alertas>
            </Row>

            <Row>
                <p>Nombre del alumno:<strong> {`${alumno.nombre} ${alumno.apellido}`}</strong></p>
            </Row>

            {cursoActivo ?

                <Row>
                    <p>Curso inscripto actual:<strong> {`${cursoActivo.anio} - ${cursoActivo.grado} - ${cursoActivo.tipoCurso}`}</strong></p>
                </Row>
                :
                <p>Curso inscripto actual: <strong>No inscripto</strong></p>
            }

            <Row>
                <Col xs={12} md={10} lg={10}>
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="cursoId">
                            <Form.Label>* Curso</Form.Label>
                            <Form.Select onChange={handleChange} value={inscripcion.cursoId} name="cursoId">
                                <option>Seleccionar</option>
                                {
                                    listaCursosAnioActual.slice().sort((a, b) => b.anio - a.anio).map(c => <option key={c.id} value={c.id}>{`${c.anio} - ${c.grado} - ${c.tipoCurso}`}</option>)
                                }
                            </Form.Select>
                        </Form.Group >
                        {cursoSeleccionado && cursoSeleccionado.tipoCurso == "Primaria" &&
                            <Form.Group className="mb-3" controlId="dobleHorario">
                                <Form.Check onChange={handleChange} type="switch" checked={inscripcion.dobleHorario} name="dobleHorario" label="¿Doble horario?" />
                            </Form.Group >
                        }
                        <Form.Group className="mb-3" controlId="piscina">
                            <Form.Check onChange={handleChange} type="switch" checked={inscripcion.piscina} name="piscina" label="¿Asiste a piscina?" />
                        </Form.Group >
                        <Form.Group className="mb-3" controlId="observaciones">
                            <Form.Label>Observaciones</Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Ej.: 5 horas por día (Inscripción en curso Inicial)" value={inscripcion.observaciones} name="observaciones" />
                        </Form.Group >
                        <Form.Group className="mb-4" controlId="montoCuota">
                            <Form.Label>* Monto cuota</Form.Label>
                            <Form.Control onChange={handleChange} type="number" placeholder="Ingrese monto de la cuota" value={inscripcion.montoCuota} name="montoCuota" />
                        </Form.Group >

                        <Button variant="primary" type="submit">
                            Inscribir alumno
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

