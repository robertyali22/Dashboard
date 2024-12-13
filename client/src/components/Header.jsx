import { Link } from 'react-router-dom'

export function Header() {
  return (
    <div className='flex justify-between py-3 items-center'>
        <Link to="/task-form">
            <h1 className='font-bold text-3xl mb-4'>Aplicacion de Tareas</h1>
        </Link>
        <button className='bg-indigo-600 p-3 rounded-lg text-white font-bold'>
            <Link to="/task-form">Crear Tarea</Link>
        </button>
    </div>
  )
}

