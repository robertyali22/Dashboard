import axios from 'axios'

const api = 'http://localhost:3000/api'

export const getAllTask = () => axios.get(`${api}/tasks/tasks/`)

export const getTask = (id) => axios.get(`${api}/tasks/tasks/${id}`)

export const createTask = (task) => axios.post(`${api}/tasks/tasks/`, task)

export const deleteTask = (id) => axios.delete(`${api}/tasks/tasks/${id}`)

export const updateTask = (id, task) => axios.put(`${api}/tasks/tasks/${id}`, task)

