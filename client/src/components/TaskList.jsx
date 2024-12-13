import { TaskCard } from '../components/TaskCard'
import { getAllTask } from '../api/TaskRequest'
import { useState, useEffect } from 'react'


export function TaskList() {

    const [ tasks, setTasks ] = useState([])

    useEffect(()=> {
        async function loadTask() {
            const res = await getAllTask()
            console.log(res)
            setTasks(res.data)
        }
        loadTask()
    }, [])

  return (
    <div>
        { tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
        ))}
    </div>
  )
}
