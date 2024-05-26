import { createSlice } from "@reduxjs/toolkit"

const initialState = [];
const usuariosSlice = createSlice({
    name: "Usuarios Slice",
    initialState,
    reducers: {

        cargaInicialUsuarios: (state, action) => {
            //console.log('payload', action.payload)
            const listaUsuarios = action.payload;
            return listaUsuarios;
        },

    },
});
export const { cargaInicialUsuarios } = usuariosSlice.actions;
export default usuariosSlice.reducer;