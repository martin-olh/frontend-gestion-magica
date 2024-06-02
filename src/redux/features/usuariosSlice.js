import { createSlice } from "@reduxjs/toolkit"

const initialState = [];
const usuariosSlice = createSlice({
    name: "Usuarios Slice",
    initialState,
    reducers: {

        cargaInicialUsuarios: (state, action) => {
            const listaUsuarios = action.payload;
            return listaUsuarios;
        },

        agregarUsuario: (state, action) => {
            const usuario = action.payload
            return [...state, usuario]
        },

        eliminarUsuario: (state, action) => {
            const id = action.payload;
            const listaFiltrada = state.filter(p => p.id != id);
            return listaFiltrada;
        }

    },
});
export const { cargaInicialUsuarios, agregarUsuario, eliminarUsuario } = usuariosSlice.actions;
export default usuariosSlice.reducer;