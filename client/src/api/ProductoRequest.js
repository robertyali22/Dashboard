import axios from 'axios'

const api = 'http://localhost:3000/api';

// Solicitudes relacionadas con productos
export const getAllProductos = () => axios.get(`${api}/productos/productos/`)

export const getProducto = (id) => axios.get(`${api}/productos/productos/${id}`)

export const createProducto = (producto) => axios.post(`${api}/productos/productos/`, producto)

export const deleteProducto = (id) => axios.delete(`${api}/productos/productos/${id}`)

export const updateProducto = (id, producto) => axios.put(`${api}/productos/productos/${id}`, producto)

// export const getProductosPorTienda = () => axios.get(`${api}/productos/productos-por-tienda`);

// export const getEstadoInventario = () => axios.get(`${api}/productos/estado-inventario`);

// export const getProductosPorCategoria = () => axios.get(`${api}/productos/productos-por-categoria`);

