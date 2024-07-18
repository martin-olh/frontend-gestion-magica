import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { Alertas } from "./Alertas"
import { useNavigate, useParams } from 'react-router-dom'
import { agregarPago } from '../redux/features/pagosSlice'
import { agregarPagoService } from '../services/services'

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

  const pagoVacio = {
    id: 0,
    monto: 0,
    fecha: "",
    inscripcionId: 0,
    concepto: ""
  }

  const [pago, setPago] = useState(pagoVacio)

  useEffect(() => {
    const alumnoFind = listaAlumnos.find(a => a.id == idAlumno)
    if (alumnoFind) {
      setAlumno(alumnoFind)
      const inscFind = listaInscripciones.find(i => i.alumnoId == alumnoFind.id && i.activa)
      if (inscFind) {
        setPago({ ...pago, inscripcionId: inscFind.id })
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
    setPago({ ...pago, [name]: inputValue })
    setAlerta('')
    setExito('')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      validarDatosPago()
      console.log(pago)
      const resultado = await agregarPagoService(sessionStorage.getItem('token'), pago)
      pago.id = resultado.id //guardo id del pago creado, devuelto por la API   
      dispatch(agregarPago(pago))
      setExito("Pago registrado correctamente")
      setAlerta('')
      setTimeout(() => {
        navigate(`/pagos/listado/${idAlumno}`)
      }, 2000)
    } catch (error) {
      console.log(error)
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
        <Row>
          <p>Curso inscripto actual:<strong> {`${curso.anio} - ${curso.grado} - ${curso.tipoCurso}`}</strong></p>
        </Row>
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
