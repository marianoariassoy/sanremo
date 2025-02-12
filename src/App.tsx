import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import Loader from './common/Loader'
import PageTitle from './components/PageTitle'
import DefaultLayout from './layout/DefaultLayout'

import Home from './pages/Inicio'
import FormularioPedidos from './pages/Pedidos/formulario'
import HistorialPedidos from './pages/Pedidos/historial'
import Ayuda from './pages/Ayuda'
import Contacto from './pages/Contacto'

import Productos from './pages/Productos'
import Pedidos from './pages/Pedidos/pedidos'
import PedidosDetalles from './pages/Pedidos/detalles'
import ResumenPedidos from './pages/Pedidos/resumen'
import PedidosActuales from './pages/Pedidos/pedidos-actuales'
import HistorialPedidosAdmin from './pages/Pedidos/historial-admin'
import Estadisticas from './pages/Estadisticas'
import SignIn from './pages/Authentication/SignIn'

import Perfil from './pages/Perfil'
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
              path='/inicio'
              element={
                <>
                  <PageTitle title='San Remo' />
                  <Home />
                </>
              }
            />
            <Route
              path='/formulario-pedidos'
              element={
                <>
                  <PageTitle title='Formulario de pedidos | San Remo' />
                  <FormularioPedidos />
                </>
              }
            />
            <Route
              path='/historial-pedidos'
              element={
                <>
                  <PageTitle title='Historial de pedidos | San Remo' />
                  <HistorialPedidos />
                </>
              }
            />
            <Route
              path='/pedidos/:id'
              element={
                <>
                  <PageTitle title='Pedidos | San Remo' />
                  <PedidosDetalles />
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
            <Route
              path='/perfil'
              element={
                <>
                  <PageTitle title='Datos del usuario | San Remo' />
                  <Perfil />
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
              path='/inicio'
              element={
                <>
                  <PageTitle title='San Remo' />
                  <Home />
                </>
              }
            />
            <Route
              path='/productos'
              element={
                <>
                  <PageTitle title='Productos | San Remo' />
                  <Productos />
                </>
              }
            />
            <Route
              path='/pedidos'
              element={
                <>
                  <PageTitle title='Pedidos | San Remo' />
                  <Pedidos />
                </>
              }
            />
            <Route
              path='/resumen'
              element={
                <>
                  <PageTitle title='Resumen de pedidos | San Remo' />
                  <ResumenPedidos />
                </>
              }
            />
            <Route
              path='/actuales'
              element={
                <>
                  <PageTitle title='Pedidos Actuales | San Remo' />
                  <PedidosActuales />
                </>
              }
            />
            <Route
              path='/historial'
              element={
                <>
                  <PageTitle title='Historial de pedidos | San Remo' />
                  <HistorialPedidosAdmin />
                </>
              }
            />
            <Route
              path='/estadisticas'
              element={
                <>
                  <PageTitle title='Estadísticas | San Remo' />
                  <Estadisticas />
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
