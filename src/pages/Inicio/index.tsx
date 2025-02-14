import { useAuth } from '../../context'
import { Link } from 'react-router-dom'

const index = () => {
  const { userData } = useAuth()

  const admin = [
    {
      name: 'Productos',
      to: '/admin/productos',
      blank: false
    },
    {
      name: 'Clientes',
      to: '/admin/clientes',
      blank: false
    },
    {
      name: 'Pedidos',
      to: '/admin/pedidos',
      blank: false
    },
    {
      name: 'Resumen de pedidos',
      to: '/admin/pedidos/resumen',
      blank: false
    },
    {
      name: 'Pedidos Actuales',
      to: '/admin/pedidos/actuales',
      blank: false
    },
    {
      name: 'Historial de pedidos',
      to: '/admin/pedidos/historial',
      blank: false
    },
    {
      name: 'Estadísticas',
      to: '/admin/pedidos/estadisticas',
      blank: false
    },
    {
      name: 'Cátalogo',
      to: '/admin/catalogo',
      blank: false
    },
    {
      name: 'Lista de precios',
      to: '/admin/lista-precios',
      blank: false
    }
  ]

  const user = [
    {
      name: 'Formulario de pedidos',
      to: '/clientes/pedidos',
      blank: false
    },
    {
      name: 'Historial de pedidos',
      to: '/clientes/historial',
      blank: false
    },
    {
      name: 'Cátalogo',
      to: '#',
      blank: true
    },
    {
      name: 'Lista de precios',
      to: '#',
      blank: true
    },
    {
      name: 'Ayuda',
      to: '/ayuda',
      blank: false
    },
    {
      name: 'Contacto',
      to: '/contacto',
      blank: false
    }
  ]

  return (
    <section className='p-4 md:p-6 2xl:p-10 fade-in flex items-start flex-col gap-y-6'>
      <h1 className='text-2xl lg:text-3xl font-bold'>Bienvenido {userData.name} 👋</h1>
      <p className='max-w-4xl font-medium text-sm lg:text-base'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nostrum optio laudantium consequuntur
        exercitationem ea tenetur iusto natus, obcaecati maxime corporis rem, nisi corrupti illo! Nam ullam sequi quae
        dolore.
      </p>

      {userData.role === 'user' && (
        <div className='mt-3 grid grid-cols-1 lg:grid-cols-3 gap-4'>
          {user.map((item, index) =>
            item.blank ? (
              <a
                key={index}
                href={item.to}
                target='_blank'
                rel='noreferrer'
                className='flex items-center gap-x-2 bg-primary text-white py-4 px-6 rounded-full hover:bg-opacity-90 transition-colors text-sm lg:text-base font-medium'
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={index}
                to={item.to}
                className='flex items-center gap-x-2 bg-primary text-white py-4 px-6 rounded-full hover:bg-opacity-90  transition-colors text-sm lg:text-base font-medium'
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      )}

      {userData.role === 'admin' && (
        <div className='mt-3 grid grid-cols-1 lg:grid-cols-3 gap-4'>
          {admin.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className='flex items-center gap-x-2 bg-primary text-white py-4 px-6 rounded-full hover:bg-opacity-90  transition-colors text-sm lg:text-base font-medium'
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

export default index
