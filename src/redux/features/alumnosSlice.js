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

    },
});
export const { cargaInicialAlumnos } = alumnosSlice.actions;
export default alumnosSlice.reducer;