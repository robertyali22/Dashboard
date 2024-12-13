import axios from 'axios';

const api = 'https://dashboard-1-6rf3.onrender.com/api';

// Solicitudes relacionadas con clientes

export const getAllClientes = () => axios.get(`${api}/clientes/clientes/`)

export const getCliente = (id) => axios.get(`${api}/clientes/clientes/${id}`)

export const createCliente = (cliente) => axios.post(`${api}/clientes/clientes/`, cliente)

export const deleteCliente = (id) => axios.delete(`${api}/clientes/clientes/${id}`)

export const updateCliente = (id, cliente) => axios.put(`${api}/clientes/clientes/${id}`, cliente)
