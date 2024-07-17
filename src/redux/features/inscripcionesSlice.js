import { createSlice } from "@reduxjs/toolkit"

const initialState = [];
const inscripcionesSlice = createSlice({
    name: "Inscripciones Slice",
    initialState,
    reducers: {

        cargaInicialInscripciones: (state, action) => {
            const listaInscripciones = action.payload;
            return listaInscripciones;
        },

        agregarInscripcion: (state, action) => {
            const inscripcion = action.payload
            return [...state, inscripcion]
        },

        eliminarInscripcion: (state, action) => {
            const id = action.payload
            const listaFiltrada = state.filter(i => i.id != id)
            return listaFiltrada
        },

        actualizarInscripcion: (state, action) => {
            const inscripcionActualizada = action.payload
            return state.map(inscripcion => {
                if (inscripcion.id === inscripcionActualizada.id) {
                    return { ...inscripcion, ...inscripcionActualizada }
                }
                return inscripcion
            })
        }
    },
});
export const { cargaInicialInscripciones, agregarInscripcion, eliminarInscripcion, actualizarInscripcion } = inscripcionesSlice.actions;
export default inscripcionesSlice.reducer;