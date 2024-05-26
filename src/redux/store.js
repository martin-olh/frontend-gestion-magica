import { configureStore } from '@reduxjs/toolkit'
import usuariosSlice from './features/usuariosSlice'

export const store = configureStore({
    reducer: {
        listaUsuarios: usuariosSlice
    }
})
