import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import Loader from './common/Loader'
import PageTitle from './components/PageTitle'
import DefaultLayout from './layout/DefaultLayout'

// User
import FormularioPedidos from './pages/Clientes/Pedidos/formulario'
import HistorialPedidos from './pages/Clientes/Pedidos/historial'
import PedidosDetalles from './pages/Clientes/Pedidos/detalles'
import Ayuda from './pages/Clientes/Ayuda'
import Contacto from './pages/Clientes/Contacto'

// Admin
import Productos from './pages/Admin/Productos'
import Categorias from './pages/Admin/Productos/categorias'
import Clientes from './pages/Admin/Clientes'
import Pedidos from './pages/Admin/Pedidos'

import PedidosHistorial from './pages/Admin/Pedidos/historial'
import PedidosEstadisticas from './pages/Admin/Estadisticas/'
import PedidosModificar from './pages/Admin/Pedidos/modificar'

import Archivos from './pages/Admin/Archivos/'

// Auth
import SignIn from './pages/Authentication/SignIn'

import { useAuth } from './context'
import NotFound from './404'

function App() {
  const [loading, setLoading] = useState<boolean>(true)
  const { pathname } = useLocation()
  const { userData, isLoggedIn } = useAuth()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        {!isLoggedIn && (
          <Route
            path='/'
            element={
              <>
                <PageTitle title='Incio de sesión | San Remo' />
                <SignIn />
              </>
            }
          />
        )}
        {isLoggedIn && userData.role === 'user' && (
          <>
            <Route
              path='/'
              element={
                <>
                  <PageTitle title='Formulario de pedidos | San Remo' />
                  <FormularioPedidos />
                </>
              }
            />
            <Route
              path='/clientes/pedidos'
              element={
                <>
                  <PageTitle title='Formulario de pedidos | San Remo' />
                  <FormularioPedidos />
                </>
              }
            />
            <Route
              path='/clientes/pedidos/repetir/:id'
              element={
                <>
                  <PageTitle title='Repetir pedido | San Remo' />
                  <FormularioPedidos />
                </>
              }
            />
            <Route
              path='clientes/pedidos/:id'
              element={
                <>
                  <PageTitle title='Detalle del pedido | San Remo' />
                  <PedidosDetalles />
                </>
              }
            />
            <Route
              path='/clientes/historial'
              element={
                <>
                  <PageTitle title='Historial de pedidos | San Remo' />
                  <HistorialPedidos />
                </>
              }
            />
            <Route
              path='/ayuda'
              element={
                <>
                  <PageTitle title='Ayuda | San Remo' />
                  <Ayuda />
                </>
              }
            />
            <Route
              path='/contacto'
              element={
                <>
                  <PageTitle title='Contacto | San Remo' />
                  <Contacto />
                </>
              }
            />
          </>
        )}

        {isLoggedIn && userData.role === 'admin' && (
          <>
            <Route
              path='/'
              element={
                <>
                  <PageTitle title='Listado de pedidos | San Remo' />
                  <Pedidos />
                </>
              }
            />
            <Route
              path='/admin/productos'
              element={
                <>
                  <PageTitle title='Productos | San Remo' />
                  <Productos />
                </>
              }
            />
            <Route
              path='/admin/categorias'
              element={
                <>
                  <PageTitle title='Categorias | San Remo' />
                  <Categorias />
                </>
              }
            />
            <Route
              path='/admin/clientes'
              element={
                <>
                  <PageTitle title='Clientes | San Remo' />
                  <Clientes />
                </>
              }
            />
            <Route
              path='/admin/pedidos'
              element={
                <>
                  <PageTitle title='Listado de pedidos | San Remo' />
                  <Pedidos />
                </>
              }
            />
            <Route
              path='/admin/pedidos/historial'
              element={
                <>
                  <PageTitle title='Historial de pedidos | San Remo' />
                  <PedidosHistorial />
                </>
              }
            />
            <Route
              path='/admin/pedidos/detalles/:id'
              element={
                <>
                  <PageTitle title='Detalles del pedido | San Remo' />
                  <PedidosDetalles />
                </>
              }
            />
            <Route
              path='/admin/pedidos/modificar/:id'
              element={
                <>
                  <PageTitle title='Modificar pedido | San Remo' />
                  <PedidosModificar />
                </>
              }
            />
            <Route
              path='/admin/pedidos/estadisticas'
              element={
                <>
                  <PageTitle title='Estadísticas | San Remo' />
                  <PedidosEstadisticas />
                </>
              }
            />
            <Route
              path='/admin/archivos'
              element={
                <>
                  <PageTitle title='Archivos | San Remo' />
                  <Archivos />
                </>
              }
            />
          </>
        )}
        <Route
          path='*'
          element={
            <>
              <PageTitle title='Página no econtrada | San Remo' />
              <NotFound />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  )
}

export default App
