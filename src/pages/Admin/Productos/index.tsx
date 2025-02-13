import Tabla from './Tabla'
import { Link } from 'react-router-dom'

const productos = () => {
  const data = [
    {
      id: 1,
      code: '01',
      title: 'Pebetes x 6 u',
      category: 'Lista general'
    },
    {
      id: 2,
      code: '02',
      title: 'Hamburguesa  x  4   u ',
      category: 'Lista general'
    },
    {
      id: 3,
      code: '03',
      title: 'Pebetes x 6 u',
      category: 'Lista general'
    },
    {
      id: 4,
      code: '04',
      title: 'Pebetes x 6 u',
      category: 'Lista general'
    },
    {
      id: 5,
      code: '05',
      title: 'Pebetes x 6 u',
      category: 'Lista general'
    },
    {
      id: 6,
      code: '06',
      title: 'Pebetes x 6 u',
      category: 'Lista general'
    },
    {
      id: 7,
      code: '07',
      title: 'Pebetes x 6 u',
      category: 'Lista general'
    },
    {
      id: 8,
      code: '08',
      title: 'Papas fritas Tradicionales 24 x 55 ',
      category: 'Krachitos'
    },
    {
      id: 9,
      code: '09',
      title: 'Papas fritas C/ Americano   24 x 55  ',
      category: 'Krachitos'
    },
    {
      id: 10,
      code: '10',
      title: 'Papas fritas C/A KETCHUP   24 x 55 ',
      category: 'Krachitos'
    },
    {
      id: 11,
      code: '11',
      title: 'Papas fritas Jamón Serrano  24 x 55',
      category: 'Krachitos'
    },
    {
      id: 12,
      code: '12',
      title: 'Copos de Maiz Azucarado x  4 kgs',
      category: 'Cereales'
    },
    {
      id: 13,
      code: '13',
      title: 'Copos de Maiz Azucarado x  1 kgs',
      category: 'Cereales'
    },
    {
      id: 14,
      code: '14',
      title: 'Copos de Maiz Sin Azucar x  3,5 kgs',
      category: 'Cereales'
    }
  ]

  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex items-start flex-col gap-y-6'>
      <div className='w-full flex justify-between'>
        <div>
          <h1 className='text-2xl lg:text-3xl font-bold'>Productos (30)</h1>
        </div>
        <div>
          <Link
            to='/admin/productos/nuevo'
            className='inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-20 rounded-lg'
          >
            Agregar
          </Link>
        </div>
      </div>

      <Tabla data={data} />
    </section>
  )
}

export default productos
