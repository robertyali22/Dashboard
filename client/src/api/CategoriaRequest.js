import axios from 'axios';

const api = 'https://dashboard-1-6rf3.onrender.com/api';

// Solicitudes relacionadas con categoria

export const getAllCategorias = () => axios.get(`${api}/categorias/categorias/`)

export const getCategoria = (id) => axios.get(`${api}/categorias/categorias/${id}`)

export const createCategoria = (categoria) => axios.post(`${api}/categorias/categorias/`, categoria)

export const deleteCategoria = (id) => axios.delete(`${api}/categorias/categorias/${id}`)

export const updateCategoria = (id, categoria) => axios.put(`${api}/categorias/categorias/${id}`, categoria)
