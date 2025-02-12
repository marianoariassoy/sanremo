interface Data {
  id: number
  code: string
  title: string
  category: string
}

const TableOne = ({ data, category }: { data: Data[]; category: string }) => {
  return (
    <article className='w-full flex flex-col gap-y-4 text-sm lg:text-base'>
      <h4 className='text-xl lg:text-2xl font-bold'>{category}</h4>
      <div className='rounded-sm border border-stroke bg-white p-2 lg:px-5 lg:pt-6 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4 '>
        <div className='flex flex-col'>
          <div className='flex rounded-sm bg-gray-2 dark:bg-meta-4 mb-3'>
            <div className='p-2.5 py-4 w-12 lg:w-26'>
              <h5 className='font-medium hidden lg:block'>Código</h5>
              <h5 className='font-medium lg:hidden'>Cód.</h5>
            </div>
            <div className='p-2.5 py-4 flex-1'>
              <h5 className=' font-medium '>Producto</h5>
            </div>
            <div className='p-2.5 text-right py-4'>
              <h5 className=' font-medium '>Cantidad</h5>
            </div>
          </div>

          {data.map((item, key) => (
            <div
              className='flex'
              key={key}
            >
              <div className='p-2 w-12 lg:w-26'>{item.code}</div>
              <div className='p-2 flex-1 font-medium'>{item.title}</div>
              <div className='p-2 text-right'>
                <input
                  type='number'
                  name='amount'
                  id='amount'
                  className='rounded-lg border border-stroke bg-transparent px-2 py-1 lg:p-2 w-16 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary placeholder:text-gray-300 text-sm lg:text-base'
                  placeholder='0'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

export default TableOne
