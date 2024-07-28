import { Link } from 'react-router-dom'
import ProductRating from '~/components/ProductRating'
import { Product as ProductType } from '~/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from '~/utils/utils'

interface Props {
  product: ProductType
}

const Product = ({ product }: Props) => {
  return (
    <Link to='/'>
      <div className='bg-white shadow-sm rounded-sm hover:translate-y-[-0.04rem] hover:shadow-md duration-100 transition-transform overflow-hidden'>
        <div className='w-full pt-[100%] relative'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute top-0 left-0 bg-white w-full h-full object-cover'
          />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[2rem] line-clamp-2 text-xs'>{product.name}</div>
          <div className='flex items-center mt-3'>
            <div className='line-through max-w-[50%] text-gray-500 truncate'>
              <span>₫</span> <span>{product.price_before_discount}</span>
            </div>
            <div className='text-orange max-w-[50%] ml-2 truncate'>
              <span className='text-xs'>₫</span> <span>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='flex items-center justify-end mt-3'>
            <ProductRating rating={product.rating} />
            <div className='ml-2 text-sm'>
              <span>Đã bán</span>
              <span className='ml-1'>{formatNumberToSocialStyle(product.sold)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
