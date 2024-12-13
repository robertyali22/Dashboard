import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { DashboardPage } from './pages/DashboardPage'
import { InformesPage } from './pages/InformesPage'
import { TaskFormPage } from './pages/TaskFormPage'
import { AnaliticaPage } from './pages/AnaliticaPage'
import { ProductoPage } from './pages/ProductoPage'
import { TiendaPage } from './pages/TiendaPage'
import { ClientesPage } from './pages/ClientesPage'
import { CategoriaPage } from './pages/CategoriaPage'
import { VentaPage } from './pages/VentaPage'



function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <DashboardPage /> } />
          <Route path='/login' element={ <LoginPage /> } />
          <Route path='/register' element={ <RegisterPage /> } />
          <Route path='/task-form' element={ <TaskFormPage /> } />
          <Route path='/dashboard/:id' element={ <TaskFormPage /> } />


          <Route path='/dashboard' element={ <DashboardPage /> } />
          <Route path='/analitica' element={ <AnaliticaPage /> } />
          <Route path='/informes' element={ <InformesPage /> } />
          <Route path='/producto' element={ <ProductoPage /> } />
          <Route path='/tienda' element={ <TiendaPage /> } />
          <Route path='/clientes' element={ <ClientesPage /> } />
          <Route path='/categoria' element={ <CategoriaPage /> } />
          <Route path='/venta' element={ <VentaPage /> } />



        </Routes>
        <Toaster />
      </BrowserRouter>

  )
}

export default App
