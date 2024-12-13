import React from 'react';
import { useForm } from 'react-hook-form';
import { loginApi } from '../api/AuthRequest.js';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    try {
      console.log(values);
      const res = await loginApi(values);
      console.log(res);

      if (res.status === 200) {
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      console.error(error);
      alert('Credenciales inválidas, por favor verifica e intenta de nuevo.');
    }
  });
  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md'>
        <h2 className='text-2xl font-bold text-center'>Inicio de Sesión</h2>
        <form onSubmit={onSubmit} className='space-y-4'>
          <div>
            <label className='block mb-2 text-sm font-medium'>Correo electrónico</label>
            <input
              type="email"
              className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-100'
              {...register('email', { required: "El correo electrónico es requerido" })}
            />
            {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
          </div>
          <div>
            <label className='block mb-2 text-sm font-medium'>Contraseña</label>
            <input
              type="password"
              className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-100'
              {...register('password', { required: "La contraseña es requerida" })}
            />
            {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
          </div>
          <button
            type='submit'
            className='w-full py-2 mt-4 text-white bg-indigo-600 rounded hover:bg-indigo-700'
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  )
}
export default LoginPage