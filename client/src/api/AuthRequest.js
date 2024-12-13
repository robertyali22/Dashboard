import axios from 'axios'

const api = 'https://dashboard-1-6rf3.onrender.com/api'

export const registerApi = user => axios.post(`${api}/auth/register`, user)
export const loginApi = user => axios.post(`${api}/auth/login`, user)
export const logoutApi = user => axios.post(`${api}/auth/logout`, user)