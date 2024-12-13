import { Header } from '../components/Header'
import { TaskList } from '../components/TaskList'

function HomePage() {
  return (
    <>
      <Header />
      <div>
        <TaskList />
      </div>
    </>
  )
}
export default HomePage
