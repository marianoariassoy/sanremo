import userThree from '../../images/user/user-01.png'

const Settings = () => {
  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 bg-white dark:bg-meta-4 h-full flex flex-col gap-y-6 '>
      <div className='p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6'>
        <div className='flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between'>
          <div className='flex flex-col items-center w-full gap-2 lg:gap-6 xl:flex-row'>
            <div className='w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800'>
              <img
                src={userThree}
                alt='user'
              />
            </div>
            <div className='order-3 xl:order-2'>
              <h4 className='mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left'>
                Panadería ABC
              </h4>
              <div className='flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left'>
                <p className='text-sm text-gray-500 dark:text-gray-400'>Número de cliente: 1234</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6'>
        <div className='flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between'>
          <div>
            <h4 className='text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6'>Datos del cliente</h4>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32'>
              <div>
                <p className='mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400'>Razón Social</p>
                <p className='text-sm font-medium text-gray-800 dark:text-white/90'>Panadería ABC</p>
              </div>
              <div>
                <p className='mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400'>Alta</p>
                <p className='text-sm font-medium text-gray-800 dark:text-white/90'>22/01/2022</p>
              </div>
              <div>
                <p className='mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400'>Email</p>
                <p className='text-sm font-medium text-gray-800 dark:text-white/90'>emirhanboruch55@gmail.com</p>
              </div>
              <div>
                <p className='mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400'>Teléfono</p>
                <p className='text-sm font-medium text-gray-800 dark:text-white/90'>+09 363 398 46</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Settings
