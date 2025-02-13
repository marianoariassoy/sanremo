import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import Loader from './common/Loader'
import PageTitle from './components/PageTitle'
import DefaultLayout from './layout/DefaultLayout'
import Home from './pages/Inicio'

// User
import FormularioPedidos from './pages/Clientes/Pedidos/formulario'
import HistorialPedidos from './pages/Clientes/Pedidos/historial'
import PedidosDetalles from './pages/Clientes/Pedidos/detalles'
import Ayuda from './pages/Clientes/Ayuda'
import Contacto from './pages/Clientes/Contacto'

// Admin
import Productos from './pages/Admin/Productos'
import ProductosNuevo from './pages/Admin/Productos/Nuevo'
import Clientes from './pages/Admin/Clientes'
import ClientesNuevo from './pages/Admin/Clientes/Nuevo'
import ClientesModificar from './pages/Admin/Clientes/Modificar'

import Pedidos from './pages/Admin/Pedidos'
import PedidosResumen from './pages/Admin/Pedidos/resumen'
import PedidosActuales from './pages/Admin/Pedidos/actuales'
import PedidosHistorial from './pages/Admin/Pedidos/historial'
import PedidosEstadisticas from './pages/Admin/Pedidos/estadisticas'

import Catalogo from './pages/Admin/Archivos/catalogo'
import ListaPrecios from './pages/Admin/Archivos/listaDePrecios'

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
                  <PageTitle title='San Remo' />
                  <Home />
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
                  <PageTitle title='San Remo' />
                  <Home />
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
              path='/admin/productos/nuevo'
              element={
                <>
                  <PageTitle title='Nuevo Producto | San Remo' />
                  <ProductosNuevo />
                </>
              }
            />
            <Route
              path='/admin/productos/modificar/:id'
              element={
                <>
                  <PageTitle title='Modificar Producto | San Remo' />
                  <ProductosNuevo />
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
              path='/admin/clientes/nuevo'
              element={
                <>
                  <PageTitle title='Nuevo Cliente | San Remo' />
                  <ClientesNuevo />
                </>
              }
            />
            <Route
              path='/admin/clientes/modificar/:id'
              element={
                <>
                  <PageTitle title='Modificar Cliente | San Remo' />
                  <ClientesModificar />
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
              path='/admin/pedidos/resumen'
              element={
                <>
                  <PageTitle title='Resumen de pedidos | San Remo' />
                  <PedidosResumen />
                </>
              }
            />
            <Route
              path='/admin/pedidos/actuales'
              element={
                <>
                  <PageTitle title='Pedidos Actuales | San Remo' />
                  <PedidosActuales />
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
              path='/admin/pedidos/estadisticas'
              element={
                <>
                  <PageTitle title='Estadísticas | San Remo' />
                  <PedidosEstadisticas />
                </>
              }
            />
            <Route
              path='/admin/catalogo'
              element={
                <>
                  <PageTitle title='Catálogo | San Remo' />
                  <Catalogo />
                </>
              }
            />
            <Route
              path='/admin/lista-precios'
              element={
                <>
                  <PageTitle title='Lista de Precios | San Remo' />
                  <ListaPrecios />
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
