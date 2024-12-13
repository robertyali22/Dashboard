import axios from 'axios'

const api = 'https://dashboard-1-6rf3.onrender.com/api'

export const getAllTask = () => axios.get(`${api}/tasks/tasks/`)

export const getTask = (id) => axios.get(`${api}/tasks/tasks/${id}`)

export const createTask = (task) => axios.post(`${api}/tasks/tasks/`, task)

export const deleteTask = (id) => axios.delete(`${api}/tasks/tasks/${id}`)

export const updateTask = (id, task) => axios.put(`${api}/tasks/tasks/${id}`, task)

