import { configureStore } from '@reduxjs/toolkit'
import usuariosSlice from './features/usuariosSlice'
import alumnosSlice from './features/alumnosSlice'
import cursosSlice from './features/cursosSlice'

export const store = configureStore({
    reducer: {
        listaUsuarios: usuariosSlice,
        listaAlumnos: alumnosSlice,
        listaCursos: cursosSlice
    }
})
