import { useEffect, useState } from "react"
import { Alert, Fade } from "react-bootstrap"


export const Alertas = ({ error = '', exito = '', warning = '' }) => {
    const [showError, setShowError] = useState(false)
    const [showExito, setShowExito] = useState(false)
    const [showWarning, setShowWarning] = useState(false)


    const handleAlert = (setShow, value) => {
        if (value) {
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 5000)
        }
    }


    useEffect(() => {
        handleAlert(setShowError, error);
    }, [error])

    useEffect(() => {
        handleAlert(setShowExito, exito);
    }, [exito])

    useEffect(() => {
        handleAlert(setShowWarning, warning);
    }, [warning])

    return (
        <>
            <div style={{
                position: 'fixed', // o 'absolute' si prefieres
                top: 50, // Cambia según necesites (e.g., `top: 50%`)
                left: 0,
                width: '100%',
                zIndex: 1050, // Asegúrate de que sea más alto que el resto de tu contenido
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Centra las alertas horizontalmente
                pointerEvents: 'none', // Permite clics a través del contenedor cuando no hay alertas
            }}>
                <Fade in={showError}>
                    <div>
                        {showError && <Alert variant="danger">{error}</Alert>}
                    </div>
                </Fade>
                <Fade in={showExito}>
                    <div>
                        {showExito && <Alert variant="success">{exito}</Alert>}
                    </div>
                </Fade>
                <Fade in={showWarning}>
                    <div>
                        {showWarning && <Alert variant="warning">{warning}</Alert>}
                    </div>
                </Fade>
            </div>
        </>
    )
}