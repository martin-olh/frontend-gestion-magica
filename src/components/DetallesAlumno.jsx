import { useEffect, useState } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"



export const DetallesAlumno = () => {

    const { id } = useParams()

    const tipoUsuario = sessionStorage.getItem('tipoUsuario')

    const listaAlumnos = useSelector(store => store.listaAlumnos)
    const [alumno, setAlumno] = useState(null)

    useEffect(() => {
        const alumnoMostrar = listaAlumnos.find(a => a.id == id)
        setAlumno(alumnoMostrar)
    }, [listaAlumnos, id])

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const formatCedula = (cedula) => {
        const str = cedula.toString()
        return str.slice(0, -1) + '-' + str.slice(-1)
    }

    return (

        <>
            {alumno ?
                (<Container className="container-fluid">

                    <Card>
                        {tipoUsuario !== 'Maestro' ?
                            <Card.Header className="bg-negro-suave">
                                <Row className="d-flex justify-content-between text-center">
                                    <Col>
                                        <Card.Link href={`/alumnos/editar/${id}`}>Editar información</Card.Link>
                                    </Col>

                                    <Col className="blanco"><span>|</span></Col>

                                    <Col>
                                        <Card.Link href={`/alumnos/boletines/${id}`}>Ver boletines</Card.Link>
                                    </Col>

                                    <Col className="blanco"><span>|</span></Col>

                                    <Col>
                                        <Card.Link href={`/pagos/agregar/${id}`}>Registrar Pago</Card.Link>
                                    </Col>

                                    <Col className="blanco"><span>|</span></Col>

                                    <Col>
                                        <Card.Link href={`/alumnos/estado-cuenta/${id}`}>Estado de cuenta</Card.Link>
                                    </Col>
                                </Row>
                            </Card.Header>
                            :
                            <Card.Header>
                                <Row className="d-flex justify-content-between text-center">
                                    <Col>
                                        <Card.Link href={`/alumnos/boletines/${id}`}>Ver boletines</Card.Link>
                                    </Col>
                                </Row>
                            </Card.Header>
                        }
                        <Card.Body>

                            <Card.Title>Información del alumno</Card.Title>

                            <hr />
                            <Row>
                                <Col>
                                    <Card.Text><strong>Nombre: </strong> {`${alumno.nombre} ${alumno.apellido} `}</Card.Text>
                                </Col>
                                <Col>
                                    <Card.Text><strong>Dirección: </strong> {`${alumno.direccion}`}</Card.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Card.Text><strong>Cedula: </strong> {formatCedula(alumno.cedula)}</Card.Text>
                                </Col>
                                <Col>
                                    <Card.Text><strong>Fecha de nacimiento: </strong> {formatDate(alumno.fechaNac)}</Card.Text>
                                </Col>
                            </Row>

                            <hr />

                            <Row>
                                <h5>Responsables</h5>
                                {alumno.responsables.map(r => (
                                    <Col key={r.id}>
                                        <Card.Text className="m-0"><strong>Nombre: </strong> {`${r.nombre} ${r.apellido}`}</Card.Text>
                                        <Card.Text className="m-0"><strong>Cedula: </strong> {formatCedula(r.cedula)}</Card.Text>
                                        <Card.Text className="m-0"><strong>Teléfono: </strong> {`${r.telefono}`}</Card.Text>
                                        <Card.Text className="m-0"><strong>Email: </strong> {`${r.email}`}</Card.Text>
                                        <Card.Text className="m-0"><strong>Ocupacion: </strong> {`${r.ocupacion}`}</Card.Text>
                                        <Card.Text className="m-0"><strong>Horario de trabajo: </strong> {`${r.horarioTrabajo}`}</Card.Text>
                                        <Card.Text className="m-0"><strong>Horario a cargo del niño: </strong> {`${r.horarioNino}`}</Card.Text>
                                    </Col>
                                ))
                                }
                            </Row>

                            <hr />

                            <Row>
                                <h5>Información médica</h5>
                                <Col>
                                    <Card.Text className="m-0"><strong>Mutualista: </strong> {`${alumno.infoDetalle.mutualista}`}</Card.Text>
                                    <Card.Text className="m-0"><strong>Emergencia: </strong> {`${alumno.infoDetalle.emergencia}`}</Card.Text>
                                    <Card.Text className="m-0"><strong>Certificado de vacunación: </strong> {`${alumno.infoDetalle.certVacuna}`}</Card.Text>
                                    <Card.Text className="m-0"><strong>Embarazo: </strong> {`${alumno.infoDetalle.embarazo}`}</Card.Text>
                                    <Card.Text className="m-0"><strong>Peso: </strong> {`${alumno.infoDetalle.peso}`}</Card.Text>
                                    <Card.Text className="m-0"><strong>Lactancia: </strong> {`${alumno.infoDetalle.lactancia}`}</Card.Text>
                                    <Card.Text className="m-0"><strong>Esfínteres: </strong> {`${alumno.infoDetalle.esfinteres}`}</Card.Text>

                                </Col>
                                <Col>
                                    <Card.Text className="m-0"><strong>Destete: </strong> {`${alumno.infoDetalle.destete}`}</Card.Text>
                                    <Card.Text className="m-0"><strong>Crecimiento y desarrollo: </strong> {`${alumno.infoDetalle.crecimiento}`}</Card.Text>
                                    <Card.Text className="m-0"><strong>Marcha: </strong> {`${alumno.infoDetalle.marcha}`}</Card.Text>
                                    <Card.Text className="m-0"><strong>Primeras palabras: </strong> {`${alumno.infoDetalle.primerasPalabras}`}</Card.Text>
                                    <Card.Text className="m-0"><strong>Enfermedades: </strong> {`${alumno.infoDetalle.enfermedades}`}</Card.Text>
                                    <Card.Text className="m-0"><strong>Observaciones: </strong> {`${alumno.infoDetalle.observaciones}`}</Card.Text>
                                </Col>
                            </Row>

                            <hr />

                            <Row>
                                <h5>Información adicional</h5>
                                <Col>
                                    <Card.Text className="m-0"><strong>Hermanos: </strong> {`${alumno.infoDetalle.hermanos}`}</Card.Text>
                                    <Card.Text className="m-0"><strong>Otras personas del hogar: </strong> {`${alumno.infoDetalle.personasHogar}`}</Card.Text>
                                    <Card.Text className="m-0"><strong>Persona que lo retira: </strong> {`${alumno.infoDetalle.personaQueRetira}`}</Card.Text>
                                    <Card.Text className="m-0"><strong>Teléfono: </strong> {`${alumno.infoDetalle.telPersonaQueRetira}`}</Card.Text>
                                </Col>
                                <Col>
                                    <Card.Text className="m-0"><strong>Logros esperados: </strong> {`${alumno.infoDetalle.logrosEsperados}`}</Card.Text>
                                    <Card.Text className="m-0"><strong>Horario que concurre: </strong> {`${alumno.infoDetalle.horarioConcurre}`}</Card.Text>
                                    <Card.Text className="m-0"><strong>Habilita imagen para publicidad: </strong> {alumno.infoDetalle.habilitadoPublicidad ? 'Sí' : 'No'}</Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>

                    </Card>

                </Container>)
                :
                (<></>)
            }
        </>
    )
}
