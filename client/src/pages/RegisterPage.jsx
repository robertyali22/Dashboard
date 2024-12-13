import React from 'react'
import { useForm } from 'react-hook-form'
import { registerApi } from '../api/AuthRequest.js'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {

 const navigate = useNavigate()

 const { register, handleSubmit, formState: { errors } } = useForm()

 const onSubmit = handleSubmit(async (values)=> {

  console.log(values)
  const res = await registerApi(values)
  console.log(res)

  navigate('/dashboard', {
    replace:true
  })
  

 })

  return (
    
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md '>
        <h2 className='text-2xl font-bold text-center'> Registro de usuarios</h2>

        <form onSubmit={onSubmit} className='space-y-4' >
          <div>
            <label className='block mb-2 text-sm font-medium '>Correo electronico</label>
            <input type="email" 
              className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-100'
              {...register('email', {required: "El correo electronico es requerido"} )}
            />
            {errors.email && <span className='text-red-500 text-sm' > {errors.email.message} </span> }
          </div>

          <div>
            <label className='block mb-2 text-sm font-medium '>Contraseña</label>
            <input type="password" 
              className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-100'
              {...register('password', {required: "La contraseña es requerida"} )}
            />
            {errors.password && <span className='text-red-500 text-sm' > {errors.password.message} </span> }
          </div>

          <button
            type='submit'
            className='w-full py-2 mt-4 text-white bg-indigo-600 rounded hover:bg-indigo-700'
          >
            Registro
          </button>

        </form>

      </div>
    </div>

  )
}

export default RegisterPage
