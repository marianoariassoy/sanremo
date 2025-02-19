import { Product } from '../../../types/product'

const TableOne = ({
  products,
  setProducts
}: {
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}) => {
  return (
    <article className='w-full flex flex-col gap-y-4 text-sm lg:text-base'>
      <div className='rounded-sm border border-stroke bg-white p-2 lg:px-5 lg:pt-6 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4'>
        <div className='w-full overflow-x-auto'>
          <table className='w-full'>
            <thead className='rounded-sm bg-gray-2 dark:bg-meta-4 mb-3'>
              <tr className='text-left'>
                <th className='p-2 py-4'>
                  <h5 className='font-medium'>Código</h5>
                </th>
                <th className='p-2 py-4'>
                  <h5 className='font-medium'>Producto</h5>
                </th>
                <th className='p-2 py-4'>
                  <h5 className='font-medium'>Categoría</h5>
                </th>
                <th className='p-2 py-4'>
                  <h5 className='font-medium'>Cantidad</h5>
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map(item => (
                <tr
                  key={item.id}
                  className='text-left font-medium'
                >
                  <td className='p-2'>{item.code}</td>
                  <td className='p-2 text-nowrap'>{item.title}</td>
                  <td className='p-2 text-nowrap'>{item.category_name}</td>
                  <td className='p-2'>
                    <input
                      type='number'
                      value={item.amount}
                      name='amount'
                      id='amount'
                      placeholder='0'
                      min={0}
                      className='rounded-lg border border-stroke bg-transparent px-2 py-1 lg:p-2 w-16 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary placeholder:text-gray-300 text-sm lg:text-base'
                      onChange={e => {
                        const amount = e.target.value
                        setProducts(prevState => {
                          return prevState.map(product => {
                            if (product.id === item.id) {
                              return {
                                ...product,
                                amount: +amount
                              }
                            }
                            return product
                          })
                        })
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  )
}

export default TableOne
