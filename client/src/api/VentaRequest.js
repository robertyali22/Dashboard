import axios from 'axios'

const api = 'https://dashboard-1-6rf3.onrender.com/api';

// Solicitudes relacionadas con ventas
export const getAllVentas = () => axios.get(`${api}/ventas/ventas/`)

export const getVenta = (id) => axios.get(`${api}/ventas/ventas/${id}`)

export const createVenta = (venta) => axios.post(`${api}/ventas/ventas/`, venta)

export const deleteVenta = (id) => axios.delete(`${api}/ventas/ventas/${id}`)

export const updateVenta = (id, venta) => axios.put(`${api}/ventas/ventas/${id}`, venta)


