import { MenuAdmin } from './MenuAdmin'
import { MenuMaestro } from './MenuMaestro'
import { MenuCoordinador } from './MenuCoordinador'

export const Menu = () => {

    const tipoUsuario = sessionStorage.getItem('tipoUsuario')

    return (
        <div className="sticky-menu">
            {tipoUsuario === "Administrador" && <MenuAdmin></MenuAdmin>}
            {tipoUsuario === "Coordinador" && <MenuCoordinador></MenuCoordinador>}
            {tipoUsuario === "Maestro" && <MenuMaestro></MenuMaestro>}
        </div>
    )
}