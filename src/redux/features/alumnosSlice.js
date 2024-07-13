import { createSlice } from "@reduxjs/toolkit"

const initialState = [];
const alumnosSlice = createSlice({
    name: "Alumnos Slice",
    initialState,
    reducers: {

        cargaInicialAlumnos: (state, action) => {
            const listaAlumnos = action.payload;
            return listaAlumnos;
        },

        agregarAlumno: (state, action) => {
            const alumno = action.payload
            return [...state, alumno]
        },

        eliminarAlumno: (state, action) => {
            const id = action.payload
            const listaFiltrada = state.filter(a => a.id != id)
            return listaFiltrada
        },

        actualizarAlumno: (state, action) => {
            const alumnoActualizado = action.payload
            return state.map(alumno => {
                if (alumno.id === alumnoActualizado.id) {
                    return { ...alumno, ...alumnoActualizado }
                }
                return alumno
            })
        }
    },
});
export const { cargaInicialAlumnos, agregarAlumno, eliminarAlumno, actualizarAlumno } = alumnosSlice.actions;
export default alumnosSlice.reducer;