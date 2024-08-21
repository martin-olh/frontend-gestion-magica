import { configureStore } from '@reduxjs/toolkit'
import usuariosSlice from './features/usuariosSlice'
import alumnosSlice from './features/alumnosSlice'
import cursosSlice from './features/cursosSlice'
import inscripcionesSlice from './features/inscripcionesSlice'
import pagosSlice from './features/pagosSlice'
import categoriasSlice from './features/categoriasSlice'

export const store = configureStore({
    reducer: {
        listaUsuarios: usuariosSlice,
        listaAlumnos: alumnosSlice,
        listaCursos: cursosSlice,
        listaInscripciones: inscripcionesSlice,
        listaPagos: pagosSlice,
        listaCategorias: categoriasSlice
    }
})
