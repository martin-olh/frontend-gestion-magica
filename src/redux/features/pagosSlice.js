import { createSlice } from "@reduxjs/toolkit"

const initialState = [];
const pagosSlice = createSlice({
    name: "Pagos Slice",
    initialState,
    reducers: {

        cargaInicialPagos: (state, action) => {
            const listaPagos = action.payload;
            return listaPagos;
        },

        agregarPago: (state, action) => {
            const pago = action.payload
            return [...state, pago]
        },

        eliminarPago: (state, action) => {
            const id = action.payload
            const listaFiltrada = state.filter(p => p.id != id)
            return listaFiltrada
        },

        actualizarPago: (state, action) => {
            const pagoActualizado = action.payload
            return state.map(pago => {
                if (pago.id === pagoActualizado.id) {
                    return { ...pago, ...pagoActualizado }
                }
                return pago
            })
        }
    },
});
export const { cargaInicialPagos, agregarPago, eliminarPago, actualizarPago } = pagosSlice.actions;
export default pagosSlice.reducer;