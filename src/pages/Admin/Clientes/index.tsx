import Tabla from './Tabla'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader'
import useFetch from '../../../hooks/useFetch'

const productos = () => {
  const { data, loading } = useFetch(`/users`)

  if (loading) return <Loader />

  if (data)
    return (
      <section className='fade-in p-4 md:p-6 2xl:p-10 flex items-start flex-col gap-y-6'>
        <div className='w-full flex justify-between'>
          <div>
            <h1 className='text-2xl lg:text-3xl font-bold'>Clientes ({data.length})</h1>
          </div>
          <div>
            <Link
              to='/admin/clientes/nuevo'
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
