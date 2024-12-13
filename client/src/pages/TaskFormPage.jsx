import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { createTask, deleteTask, updateTask, getTask } from '../api/TaskRequest'
import { toast } from 'react-hot-toast'


export function TaskFormPage() {

  const {register, handleSubmit, formState: {errors}, setValue} = useForm()

  const navigate = useNavigate()

  const params = useParams()
  console.log(params)

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data)
      toast.success("Tarea actualizada", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff"
        }
      })
    } else {
      await createTask(data)
      toast.success("Tarea creada", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff"
        }
      })
    }
    navigate("/dashboard")
  })

  useEffect(()=> {
    async function loadTask() {
      if (params.id) {
        const { data } = await getTask(params.id)
        setValue("title", data.title)
        setValue("description", data.description)
      }
    }
    loadTask()
  }, [])

  return (
    <div className='max-w-xl mx-auto'>
      <form onSubmit={onSubmit} className='bg-zinc-800 p-10 rounded-lg mt-2 text-white'>
        <input
          type="text"
          placeholder='Titulo'
          autoFocus
          className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
          {...register("title", {required:true})}
        />
        {errors.title && <span>El titulo es requerido</span>}
        <textarea
        placeholder='Descripción'
        className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
        {...register("description", {required:true})}
        />
        {errors.description && <span>La descripción es requerida</span>}
        <button className='bg-indigo-600 p-3 rounded-lg w-full mt-3 block'>
          Guardar
        </button>

        { params.id &&
        <button
        className='bg-indigo-600 p-3 rounded-lg w-full mt-3 block'
        onClick={async() => {
          const aceptado = window.confirm("Estas seguro de eliminar? ..")
          if (aceptado) {
            await deleteTask(params.id)
            toast.success("Tarea eliminada", {
              position: "bottom-right",
              style: {
                background: "#101010",
                color: "#fff"
              }
            })
            navigate("/dashboard")
          }
        }}
        >
          Eliminar
        </button>
        }
      </form>
    </div>
  )
}

