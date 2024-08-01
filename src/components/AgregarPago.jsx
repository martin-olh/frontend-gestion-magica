import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { Alertas } from "./Alertas"
import { useNavigate, useParams } from 'react-router-dom'
import { agregarPago } from '../redux/features/pagosSlice'
import { agregarPagoService } from '../services/services'
import { actualizarInscripcion } from '../redux/features/inscripcionesSlice'

export const AgregarPago = () => {

  const { idAlumno } = useParams()

  const [alerta, setAlerta] = useState('')
  const [exito, setExito] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const listaInscripciones = useSelector(store => store.listaInscripciones)
  const listaAlumnos = useSelector(store => store.listaAlumnos)
  const listaCursos = useSelector(store => store.listaCursos)

  const [alumno, setAlumno] = useState({ nombre: '', apellido: '' })
  const [curso, setCurso] = useState({})
  const [insc, setInsc] = useState({})

  const pagoVacio = {
    id: 0,
    monto: 0,
    fecha: "",
    inscripcionId: 0,
    concepto: "",
    esCuota: true
  }

  const [pago, setPago] = useState(pagoVacio)

  useEffect(() => {
    const alumnoFind = listaAlumnos.find(a => a.id == idAlumno)
    if (alumnoFind) {
      setAlumno(alumnoFind)
      const inscFind = listaInscripciones.find(i => i.alumnoId == alumnoFind.id && i.activa)
      if (inscFind) {
        setInsc(inscFind)
        setPago({ ...pago, inscripcionId: inscFind.id }) //Asigno ID de la inscripcion activa actual al cargar el componente
        const cursoFind = listaCursos.find(c => c.id == inscFind.cursoId)
        if (cursoFind) {
          setCurso(cursoFind)
        }
      }
    }

  }, [listaAlumnos, listaCursos, listaInscripciones, idAlumno])

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setPago(prevPago => ({ ...prevPago, [name]: inputValue }))
    setAlerta('')
    setExito('')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      validarDatosPago()
      const resultado = await agregarPagoService(sessionStorage.getItem('token'), pago)

      setPago({ ...pago, id: resultado.id }) //guardo id del pago creado, devuelto por la API    

      const subtotal = insc.montoPagado + (+pago.monto)
      const updatedInsc = { ...insc, montoPagado: subtotal }
      setInsc(updatedInsc)

      dispatch(actualizarInscripcion(updatedInsc))
      dispatch(agregarPago(pago))
      setExito("Pago registrado correctamente")
      setAlerta('')
      setTimeout(() => {
        navigate(`/alumnos/estado-cuenta/${idAlumno}`)
      }, 2000)
    } catch (error) {
      setAlerta(error.message)
      setExito('')
    }
  }

  const validarDatosPago = () => {
    if (pago.concepto == "") {
      throw new Error("Debe ingresar un concepto")
    }
    if (pago.monto <= 0) {
      throw new Error("Debe ingresar un monto válido")
    }
    if (pago.fecha == "") {
      throw new Error("Debe ingresar una fecha")
    }
  }

  const formatMonto = (monto) => {
    return new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU' }).format(monto);
  }

  return (
    <Container className='container-fluid'>
      <Row>
        <h2>Registrar pago</h2>
      </Row>
      <Row>
        <Alertas error={alerta} exito={exito}></Alertas>
      </Row>

      <Row>
        <p>Nombre del alumno:<strong> {`${alumno.nombre} ${alumno.apellido}`}</strong></p>
      </Row>

      {curso ?
        <>
          <Row>
            <p>Curso inscripto actual:<strong> {`${curso.anio} - ${curso.grado} - ${curso.tipoCurso}`}</strong></p>
          </Row>
          <Row>
            <p>Costo de la cuota: <strong>{formatMonto(insc.montoCuota)}</strong></p>
          </Row>
        </>
        :
        <p>Curso inscripto actual: N/A</p>
      }

      <Row>
        <Col xs={12} md={10} lg={10}>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="concepto">
              <Form.Label>* Concepto</Form.Label>
              <Form.Control onChange={handleChange} type="text" placeholder="Ingrese el concepto" value={pago.concepto} name="concepto" />
            </Form.Group >
            <Form.Group className="mb-3" controlId="esCuota">
              <Form.Check onChange={handleChange} type="switch" checked={pago.esCuota} name="esCuota" label="¿Pago de cuota?" />
            </Form.Group >
            <Form.Group className="mb-3" controlId="monto">
              <Form.Label>* Monto</Form.Label>
              <Form.Control onChange={handleChange} type="number" placeholder="Ingrese el monto" value={pago.monto} name="monto" />
            </Form.Group >
            <Form.Group className="mb-3" controlId="fecha">
              <Form.Label>* Fecha</Form.Label>
              <Form.Control onChange={handleChange} type="date" placeholder="Seleccione fecha de nacimiento" value={pago.fecha} name="fecha" />
            </Form.Group >
            <Button variant="primary" type="submit">
              Registrar pago
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>

  )


}
