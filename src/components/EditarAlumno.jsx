import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actualizarAlumnoService, agregarAlumnoService } from '../services/services'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { actualizarAlumno } from '../redux/features/alumnosSlice'
import { Alertas } from './Alertas'

export const EditarAlumno = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id } = useParams()
    const listaAlumnos = useSelector(store => store.listaAlumnos)

    const [alerta, setAlerta] = useState('')
    const [exito, setExito] = useState('')
    const [seleccion, setSeleccion] = useState('basica')

    const [alumno, setAlumno] = useState({
        id: 0,
        cedula: "",
        nombre: "",
        apellido: "",
        direccion: "",
        fechaNac: "",
        infoDetalle:
        {
            id: 0,
            mutualista: "",
            emergencia: "",
            certVacuna: "",
            hermanos: "",
            personasHogar: "",
            embarazo: "",
            peso: "",
            lactancia: "",
            esfinteres: "",
            destete: "",
            crecimiento: "",
            marcha: "",
            primerasPalabras: "",
            enfermedades: "",
            observaciones: "",
            logrosEsperados: "",
            horarioConcurre: "",
            personaQueRetira: "",
            telPersonaQueRetira: "",
            habilitadoPublicidad: false
        },
        infoDetalleId: 0,
        responsables: [
            {
                id: 0,
                nombre: "",
                apellido: "",
                cedula: "",
                telefono: "",
                email: "",
                ocupacion: "",
                horarioTrabajo: "",
                horarioNino: ""
            },
            {
                id: 0,
                nombre: "",
                apellido: "",
                cedula: "",
                telefono: "",
                email: "",
                ocupacion: "",
                horarioTrabajo: "",
                horarioNino: ""
            }]
    })

    const responsableVacio = {
        id: 0,
        nombre: "",
        apellido: "",
        cedula: "",
        telefono: "",
        email: "",
        ocupacion: "",
        horarioTrabajo: "",
        horarioNino: ""
    }

    const [infoDetalleAux, setInfoDetalleAux] = useState()
    const [responsable0Aux, setResponsable0Aux] = useState()
    const [responsable1Aux, setResponsable1Aux] = useState()

    useEffect(() => {
        const alumnoAEditar = listaAlumnos.find(a => a.id == id)
        if (alumnoAEditar) {
            const updatedAlumno = {
                ...alumnoAEditar,
                fechaNac: alumnoAEditar.fechaNac.split('T')[0] // Format the date
            }
            setAlumno(updatedAlumno)
            setInfoDetalleAux({ ...updatedAlumno.infoDetalle })
            setResponsable0Aux({ ...updatedAlumno.responsables[0] })
            if (updatedAlumno.responsables[1] == null) {
                setResponsable1Aux(responsableVacio)
            } else {
                setResponsable1Aux({ ...updatedAlumno.responsables[1] })
            }
        }
    }, [listaAlumnos, id]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setAlumno(prevState => ({
            ...prevState,
            [name]: value
        }))
        setAlerta('')
        setExito('')
    }

    const handleChangeInfoDet = (e) => {
        const { name, type, checked, value } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;

        setInfoDetalleAux(prevState => ({
            ...prevState,
            [name]: inputValue
        }))
        setAlumno(prevState => ({
            ...prevState,
            infoDetalle: {
                ...prevState.infoDetalle,
                [name]: inputValue
            }
        }))

        setAlerta('')
        setExito('')
    }

    const handleChangeResp0 = (e) => {
        const { name, value } = e.target
        const nameBase = name.split('.')[1]

        setResponsable0Aux(prevState => ({
            ...prevState,
            [nameBase]: value
        }))

        setAlumno(prevState => {
            const updatedResponsables = [...prevState.responsables];
            updatedResponsables[0] = {
                ...updatedResponsables[0],
                [nameBase]: value
            };
            return {
                ...prevState,
                responsables: updatedResponsables
            }
        })
        setAlerta('')
        setExito('')
    }

    const handleChangeResp1 = (e) => {
        const { name, value } = e.target
        const nameBase = name.split('.')[1]

        setResponsable1Aux(prevState => ({
            ...prevState,
            [nameBase]: value
        }))

        setAlumno(prevState => {
            const updatedResponsables = [...prevState.responsables];
            updatedResponsables[1] = {
                ...updatedResponsables[1],
                [nameBase]: value
            };
            return {
                ...prevState,
                responsables: updatedResponsables
            }
        })

        setAlerta('')
        setExito('')
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            validarDatosAlumno()
            if (validarSegundoResponsableVacio() && alumno.responsables.length == 2) {
                alumno.responsables.pop()
            }
            await actualizarAlumnoService(id, alumno, sessionStorage.getItem('token'))
            dispatch(actualizarAlumno(alumno))
            setExito("Alumno modificado exitosamente")
            setAlerta('')
            setTimeout(() => {
                navigate(`/alumnos/detalles/${id}`)
            }, 1000)
        } catch (error) {
            setAlerta(error.message)
            setExito('')
        }
    }

    const validarDatosAlumno = () => {
        if (alumno.cedula == "") {
            throw new Error("La cédula no puede estar vacía")
        }
        if (alumno.cedula.length != 8) {
            throw new Error("La cédula debe tener 8 digitos (no incluir puntos ni guiones)")
        }
        if (alumno.nombre == "") {
            throw new Error("El nombre no puede estar vacío")
        }
        if (alumno.apellido == "") {
            throw new Error("El apellido no puede estar vacío")
        }
        if (alumno.fechaNac == "") {
            throw new Error("La fecha de nacimiento no puede estar vacía")
        }
        if (alumno.direccion == "") {
            throw new Error("La dirección no puede estar vacía")
        }
        //Solo valido campos obligatorios del primer responsable, el segundo puede ser vacio
        if (alumno.responsables[0].nombre == "") {
            throw new Error("El nombre del responsable no puede estar vacío")
        }
        if (alumno.responsables[0].apellido == "") {
            throw new Error("El apellido del responsable no puede estar vacío")
        }
        if (alumno.responsables[0].telefono == "") {
            throw new Error("El teléfono del responsable no puede estar vacío")
        }
        if (alumno.responsables[0].email == "") {
            throw new Error("El email del responsable no puede estar vacío")
        }
    }

    const validarSegundoResponsableVacio = () => {
        return responsable1Aux.nombre == ""
            && responsable1Aux.apellido == ""
            && responsable1Aux.email == ""
            && responsable1Aux.telefono == ""
    }

    return (
        <Container className='container-fluid'>
            <Row className='mb-3'>
                <h2>Editar alumno</h2>
            </Row>
            <Row>
                <Alertas error={alerta} exito={exito}></Alertas>
            </Row>
            <Row className='mb-3'>
                <Col>
                    <Button className='m-1' variant="secondary" type="button" onClick={() => setSeleccion('basica')}>
                        Información básica
                    </Button>
                    <Button className='m-1' variant="secondary" type="button" onClick={() => setSeleccion('responsables')}>
                        Responsables
                    </Button>
                    <Button className='m-1' variant="secondary" type="button" onClick={() => setSeleccion('detalles')}>
                        Detalles
                    </Button>
                    <div className='d-inline-block m-1'>
                        <em ><small>• Seleccionar sección a completar</small></em>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={10} lg={10}>
                    <Form onSubmit={onSubmit}>
                        {seleccion == "basica" &&
                            <Row>
                                <h5>Información básica:</h5>
                                <Form.Group className="mb-3" controlId="cedula">
                                    <Form.Label>* Cédula</Form.Label>
                                    <Form.Control onChange={handleChange} type="text" placeholder="Ingrese cédula" value={alumno.cedula} name="cedula" />
                                </Form.Group >
                                <Form.Group className="mb-3" controlId="nombre">
                                    <Form.Label>* Nombre(s)</Form.Label>
                                    <Form.Control onChange={handleChange} type="text" placeholder="Ingrese nombre" value={alumno.nombre} name="nombre" />
                                </Form.Group >
                                <Form.Group className="mb-3" controlId="apellido">
                                    <Form.Label>* Apellido(s)</Form.Label>
                                    <Form.Control onChange={handleChange} type="text" placeholder="Ingrese apellido" value={alumno.apellido} name="apellido" />
                                </Form.Group >
                                <Form.Group className="mb-3" controlId="direccion">
                                    <Form.Label>* Dirección</Form.Label>
                                    <Form.Control onChange={handleChange} type="text" placeholder="Ingrese dirección" value={alumno.direccion} name="direccion" />
                                </Form.Group >
                                <Form.Group className="mb-3" controlId="fechaNac">
                                    <Form.Label>* Fecha de nacimiento</Form.Label>
                                    <Form.Control onChange={handleChange} type="date" placeholder="Seleccione fecha de nacimiento" value={alumno.fechaNac} name="fechaNac" />
                                </Form.Group >
                            </Row>
                        }

                        {seleccion == "detalles" &&
                            <>
                                <Row>
                                    <h5>Información médica:</h5>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="mutualista">
                                            <Form.Label>Mutualista</Form.Label>
                                            <Form.Control onChange={handleChangeInfoDet} type="text" value={infoDetalleAux.mutualista} name="mutualista" />
                                        </Form.Group >
                                        <Form.Group className="mb-3" controlId="emergencia">
                                            <Form.Label>Emergencia médica</Form.Label>
                                            <Form.Control onChange={handleChangeInfoDet} type="text" value={infoDetalleAux.emergencia} name="emergencia" />
                                        </Form.Group >
                                        <Form.Group className="mb-3" controlId="certVacuna">
                                            <Form.Label>Certificado de vacunación</Form.Label>
                                            <Form.Control onChange={handleChangeInfoDet} type="text" value={infoDetalleAux.certVacuna} name="certVacuna" />
                                        </Form.Group >
                                        <Form.Group className="mb-3" controlId="embarazo">
                                            <Form.Label>Embarazo</Form.Label>
                                            <Form.Select onChange={handleChangeInfoDet} value={infoDetalleAux.embarazo} name="embarazo">
                                                <option key={'Normal'} value={'Normal'}>Normal</option>
                                                <option key={'A término'} value={'A término'}>A término</option>
                                                <option key={'Cesárea'} value={'Cesárea'}>Cesárea</option>
                                            </Form.Select>
                                        </Form.Group >
                                        <Form.Group className="mb-3" controlId="peso">
                                            <Form.Label>Peso</Form.Label>
                                            <Form.Control onChange={handleChangeInfoDet} type="text" value={infoDetalleAux.peso} name="peso" />
                                        </Form.Group >
                                        <Form.Group className="mb-3" controlId="lactancia">
                                            <Form.Label>Lactancia</Form.Label>
                                            <Form.Control onChange={handleChangeInfoDet} type="text" value={infoDetalleAux.lactancia} name="lactancia" />
                                        </Form.Group >
                                        <Form.Group className="mb-3" controlId="esfinteres">
                                            <Form.Label>Esfínteres</Form.Label>
                                            <Form.Control onChange={handleChangeInfoDet} type="text" value={infoDetalleAux.esfinteres} name="esfinteres" />
                                        </Form.Group >


                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="destete">
                                            <Form.Label>Destete</Form.Label>
                                            <Form.Control onChange={handleChangeInfoDet} type="text" value={infoDetalleAux.destete} name="destete" />
                                        </Form.Group >
                                        <Form.Group className="mb-3" controlId="crecimiento">
                                            <Form.Label>Crecimiento y desarrollo: curva de peso y talla</Form.Label>
                                            <Form.Select onChange={handleChangeInfoDet} value={infoDetalleAux.crecimiento} name="crecimiento">
                                                <option key={'Baja'} value={'Baja'}>Baja</option>
                                                <option key={'Media'} value={'Media'}>Media</option>
                                                <option key={'Alta'} value={'Alta'}>Alta</option>
                                            </Form.Select>
                                        </Form.Group >
                                        <Form.Group className="mb-3" controlId="marcha">
                                            <Form.Label>Marcha</Form.Label>
                                            <Form.Control onChange={handleChangeInfoDet} type="text" value={infoDetalleAux.marcha} name="marcha" />
                                        </Form.Group >
                                        <Form.Group className="mb-3" controlId="primerasPalabras">
                                            <Form.Label>Primeras palabras balbuceo</Form.Label>
                                            <Form.Control onChange={handleChangeInfoDet} type="text" value={infoDetalleAux.primerasPalabras} name="primerasPalabras" />
                                        </Form.Group >
                                        <Form.Group className="mb-3" controlId="enfermedades">
                                            <Form.Label>Enfermedades</Form.Label>
                                            <Form.Control onChange={handleChangeInfoDet} as="textarea" placeholder='Ej.: Alergias, asma, celíaco u otras' value={infoDetalleAux.enfermedades} name="enfermedades" />
                                        </Form.Group >
                                        <Form.Group className="mb-3" controlId="observaciones">
                                            <Form.Label>Observaciones</Form.Label>
                                            <Form.Control onChange={handleChangeInfoDet} as="textarea" placeholder='Información adicional sobre enfermedades' value={infoDetalleAux.observaciones} name="observaciones" />
                                        </Form.Group >

                                    </Col>

                                </Row>

                                <hr />

                                <Row>
                                    <h5>Información adicional:</h5>
                                    <Col>

                                        <Form.Group className="mb-3" controlId="hermanos">
                                            <Form.Label>Hermanos</Form.Label>
                                            <Form.Control onChange={handleChangeInfoDet} type="text" value={infoDetalleAux.hermanos} name="hermanos" />
                                        </Form.Group >
                                        <Form.Group className="mb-3" controlId="personasHogar">
                                            <Form.Label>Otras personas del hogar</Form.Label>
                                            <Form.Control onChange={handleChangeInfoDet} type="text" value={infoDetalleAux.personasHogar} name="personasHogar" />
                                        </Form.Group >
                                        <Form.Group className="mb-3" controlId="personaQueRetira">
                                            <Form.Label>Persona que lo retira</Form.Label>
                                            <Form.Control onChange={handleChangeInfoDet} type="text" value={infoDetalleAux.personaQueRetira} name="personaQueRetira" />
                                        </Form.Group >
                                        <Form.Group className="mb-3" controlId="telPersonaQueRetira">
                                            <Form.Label>Teléfono</Form.Label>
                                            <Form.Control onChange={handleChangeInfoDet} type="text" value={infoDetalleAux.telPersonaQueRetira} name="telPersonaQueRetira" />
                                        </Form.Group >
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="logrosEsperados">
                                            <Form.Label>¿Qué le interesa que logre?</Form.Label>
                                            <Form.Control onChange={handleChangeInfoDet} as="textarea" value={infoDetalleAux.logrosEsperados} name="logrosEsperados" />
                                        </Form.Group >
                                        <Form.Group className="mb-3" controlId="horarioConcurre">
                                            <Form.Label>Horario en que concurre</Form.Label>
                                            <Form.Control onChange={handleChangeInfoDet} type="text" value={infoDetalleAux.horarioConcurre} name="horarioConcurre" />
                                        </Form.Group >
                                        <Form.Group className="mb-3" controlId="habilitadoPublicidad">
                                            <Form.Check onChange={handleChangeInfoDet} type="switch" value={infoDetalleAux.habilitadoPublicidad} name="habilitadoPublicidad" label="¿Autoriza imagen para publicidad del colegio?" />
                                        </Form.Group >
                                    </Col>
                                </Row>
                            </>
                        }

                        {seleccion == "responsables" &&
                            <Row>
                                <Col>

                                    <h5>Responsable 1:</h5>
                                    <Form.Group className="mb-3" controlId="responsable0.nombre">
                                        <Form.Label>* Nombre(s)</Form.Label>
                                        <Form.Control onChange={handleChangeResp0} type="text" placeholder="Ingrese nombre(s) del reponsable" value={responsable0Aux.nombre} name="responsable0.nombre" />
                                    </Form.Group >
                                    <Form.Group className="mb-3" controlId="responsable0.apellido">
                                        <Form.Label>* Apellido(s)</Form.Label>
                                        <Form.Control onChange={handleChangeResp0} type="text" placeholder="Ingrese apellido(s) del reponsable" value={responsable0Aux.apellido} name="responsable0.apellido" />
                                    </Form.Group >
                                    <Form.Group className="mb-3" controlId="responsable0.cedula">
                                        <Form.Label>* Cedula</Form.Label>
                                        <Form.Control onChange={handleChangeResp0} type="text" placeholder="Ingrese cedula del reponsable sin puntos ni guiones" value={responsable0Aux.cedula} name="responsable0.cedula" />
                                    </Form.Group >
                                    <Form.Group className="mb-3" controlId="responsable0.telefono">
                                        <Form.Label>* Teléfono</Form.Label>
                                        <Form.Control onChange={handleChangeResp0} type="text" placeholder="Ingrese teléfono del reponsable" value={responsable0Aux.telefono} name="responsable0.telefono" />
                                    </Form.Group >
                                    <Form.Group className="mb-3" controlId="responsable0.email">
                                        <Form.Label>* Email</Form.Label>
                                        <Form.Control onChange={handleChangeResp0} type="email" placeholder="Ingrese email del reponsable" value={responsable0Aux.email} name="responsable0.email" />
                                    </Form.Group >
                                    <Form.Group className="mb-3" controlId="responsable0.ocupacion">
                                        <Form.Label>Ocupación</Form.Label>
                                        <Form.Control onChange={handleChangeResp0} type="text" placeholder="Ingrese ocupación del reponsable" value={responsable0Aux.ocupacion} name="responsable0.ocupacion" />
                                    </Form.Group >
                                    <Form.Group className="mb-3" controlId="responsable0.horarioTrabajo">
                                        <Form.Label>Horario de trabajo</Form.Label>
                                        <Form.Control onChange={handleChangeResp0} type="text" placeholder="Ingrese horario de trabajo del reponsable" value={responsable0Aux.horarioTrabajo} name="responsable0.horarioTrabajo" />
                                    </Form.Group >
                                    <Form.Group className="mb-3" controlId="responsable0.horarioNino">
                                        <Form.Label>Horario a cargo del niño</Form.Label>
                                        <Form.Control onChange={handleChangeResp0} type="text" placeholder="Ingrese el horario en que está a cargo del niño" value={responsable0Aux.horarioNino} name="responsable0.horarioNino" />
                                    </Form.Group >
                                </Col>

                                <Col>
                                    <h5>Responsable 2:</h5>
                                    <Form.Group className="mb-3" controlId="responsable1.nombre">
                                        <Form.Label>* Nombre(s)</Form.Label>
                                        <Form.Control onChange={handleChangeResp1} type="text" placeholder="Ingrese nombre(s) del reponsable" value={responsable1Aux.nombre} name="responsable1.nombre" />
                                    </Form.Group >
                                    <Form.Group className="mb-3" controlId="responsable1.apellido">
                                        <Form.Label>* Apellido(s)</Form.Label>
                                        <Form.Control onChange={handleChangeResp1} type="text" placeholder="Ingrese apellido(s) del reponsable" value={responsable1Aux.apellido} name="responsable1.apellido" />
                                    </Form.Group >
                                    <Form.Group className="mb-3" controlId="responsable1.cedula">
                                        <Form.Label>* Cedula</Form.Label>
                                        <Form.Control onChange={handleChangeResp1} type="text" placeholder="Ingrese cedula del reponsable sin puntos ni guiones" value={responsable1Aux.cedula} name="responsable1.cedula" />
                                    </Form.Group >
                                    <Form.Group className="mb-3" controlId="responsable1.telefono">
                                        <Form.Label>* Teléfono</Form.Label>
                                        <Form.Control onChange={handleChangeResp1} type="text" placeholder="Ingrese teléfono del reponsable" value={responsable1Aux.telefono} name="responsable1.telefono" />
                                    </Form.Group >
                                    <Form.Group className="mb-3" controlId="responsable1.email">
                                        <Form.Label>* Email</Form.Label>
                                        <Form.Control onChange={handleChangeResp1} type="email" placeholder="Ingrese email del reponsable" value={responsable1Aux.email} name="responsable1.email" />
                                    </Form.Group >
                                    <Form.Group className="mb-3" controlId="responsable1.ocupacion">
                                        <Form.Label>Ocupación</Form.Label>
                                        <Form.Control onChange={handleChangeResp1} type="text" placeholder="Ingrese ocupación del reponsable" value={responsable1Aux.ocupacion} name="responsable1.ocupacion" />
                                    </Form.Group >
                                    <Form.Group className="mb-3" controlId="responsable1.horarioTrabajo">
                                        <Form.Label>Horario de trabajo</Form.Label>
                                        <Form.Control onChange={handleChangeResp1} type="text" placeholder="Ingrese horario de trabajo del reponsable" value={responsable1Aux.horarioTrabajo} name="responsable1.horarioTrabajo" />
                                    </Form.Group >
                                    <Form.Group className="mb-3" controlId="responsable1.horarioNino">
                                        <Form.Label>Horario a cargo del niño</Form.Label>
                                        <Form.Control onChange={handleChangeResp1} type="text" placeholder="Ingrese el horario en que está a cargo del niño" value={responsable1Aux.horarioNino} name="responsable1.horarioNino" />
                                    </Form.Group >
                                </Col>
                            </Row>
                        }

                        <Button variant="primary" type="submit">
                            Editar alumno
                        </Button>
                    </Form>


                </Col>
            </Row>
            <Row>
                <p className='mt-3'><small>• Los campos con * son obligatorios</small></p>
            </Row>


        </Container >
    )
}
