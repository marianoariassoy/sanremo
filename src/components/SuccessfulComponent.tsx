import { useNavigate } from 'react-router-dom'

const SuccessfulComponent = ({ title, destination }: { title: string; destination: string }) => {
  const navigate = useNavigate()
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur p-4'>
      <div className='w-full max-w-sm p-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-sm lg:text-base'>
        <div className='flex flex-col gap-y-4 text-center'>
          <h2 className='font-bold text-black dark:text-white'>{title}</h2>
          <div className='flex justify-center gap-x-4'>
            <button
              className='bg-primary text-white hover:bg-opacity-80 font-medium rounded-lg px-6 py-3'
              onClick={() => navigate(destination)}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessfulComponent
