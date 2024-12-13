import axios from 'axios';

const api = 'http://localhost:3000/api';

// Solicitudes relacionadas con tienda

export const getAllTiendas = () => axios.get(`${api}/tiendas/tiendas/`)

export const getTienda = (id) => axios.get(`${api}/tiendas/tiendas/${id}`)

export const createTienda = (tienda) => axios.post(`${api}/tiendas/tiendas/`, tienda)

export const deleteTienda = (id) => axios.delete(`${api}/tiendas/tiendas/${id}`)

export const updateTienda = (id, tienda) => axios.put(`${api}/tiendas/tiendas/${id}`, tienda)
