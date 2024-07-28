import { useQuery } from '@tanstack/react-query'
import AsideFilter from './components/AsideFilter'
import SortProductList from './components/SortProductList'
import useQueryParams from '~/hooks/useQueryParams'
import productApi from '~/apis/product.api'
import Pagination from '~/components/Pagination'
import { ProductListConfig } from '~/types/product.type'
import { isUndefined, omitBy } from 'lodash'
import categoryApi from '~/apis/category.api'
import Product from './components/Product'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

const ProductList = () => {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit,
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      order: queryParams.order,
      category: queryParams.category
    },
    isUndefined
  )
  const { data: productData } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    }
  })

  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  console.log(categoryData)

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {productData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-2'>
              <AsideFilter queryConfig={queryConfig} categories={categoryData?.data.data || []} />
            </div>
            <div className='col-span-10'>
              <SortProductList queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size} />
              <div className='grid mt-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {productData.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
