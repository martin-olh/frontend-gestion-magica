import { createSlice } from "@reduxjs/toolkit"

const initialState = [];
const espaciosConocimientoSlice = createSlice({
    name: "Espacios Conocimiento Slice",
    initialState,
    reducers: {

        cargaInicialEspaciosConocimiento: (state, action) => {
            const listaEspaciosConocimiento = action.payload;
            return listaEspaciosConocimiento;
        }
    },
});
export const { cargaInicialEspaciosConocimiento } = espaciosConocimientoSlice.actions;
export default espaciosConocimientoSlice.reducer;