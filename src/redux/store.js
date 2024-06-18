import { configureStore } from '@reduxjs/toolkit'
import usuariosSlice from './features/usuariosSlice'
import alumnosSlice from './features/alumnosSlice'

export const store = configureStore({
    reducer: {
        listaUsuarios: usuariosSlice,
        listaAlumnos: alumnosSlice
    }
})
