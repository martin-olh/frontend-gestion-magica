import { createSlice } from "@reduxjs/toolkit"

const initialState = [];
const cursosSlice = createSlice({
    name: "Cursos Slice",
    initialState,
    reducers: {

        cargaInicialCursos: (state, action) => {
            const listaCursos = action.payload;
            return listaCursos;
        },

        agregarCurso: (state, action) => {
            const curso = action.payload
            return [...state, curso]
        },

        eliminarCurso: (state, action) => {
            const id = action.payload
            const listaFiltrada = state.filter(a => a.id != id)
            return listaFiltrada
        },

        actualizarCurso: (state, action) => {
            const cursoActualizado = action.payload
            return state.map(curso => {
                if (curso.id === cursoActualizado.id) {
                    return { ...curso, ...cursoActualizado }
                }
                return curso
            })
        }

    },
});
export const { cargaInicialCursos, agregarCurso, eliminarCurso, actualizarCurso } = cursosSlice.actions;
export default cursosSlice.reducer;