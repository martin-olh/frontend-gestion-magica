import { createSlice } from "@reduxjs/toolkit"

const initialState = [];
const categoriasSlice = createSlice({
    name: "Categorias Slice",
    initialState,
    reducers: {

        cargaInicialCategorias: (state, action) => {
            const listaCategorias = action.payload;
            return listaCategorias;
        }
    },
});
export const { cargaInicialCategorias } = categoriasSlice.actions;
export default categoriasSlice.reducer;