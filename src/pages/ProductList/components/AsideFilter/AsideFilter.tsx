import classNames from 'classnames'
import { FiFilter } from 'react-icons/fi'
import { IoStar } from 'react-icons/io5'
import { RiMenuFill } from 'react-icons/ri'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from '~/components/Button'
import InputNumber from '~/components/InputNumber'
import path from '~/constants/path'
import { Category } from '~/types/category.type'
import { QueryConfig } from '../../ProductList'
import { useForm, Controller } from 'react-hook-form'
import { Schema, schema } from '~/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = Pick<Schema, 'price_max' | 'price_min'>

const priceSchema = schema.pick(['price_min', 'price_max'])

const AsideFilter = ({ queryConfig, categories }: Props) => {
  const { category } = queryConfig
  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: { price_min: '', price_max: '' },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max as string,
        price_min: data.price_min as string
      }).toString()
    })
  })

  return (
    <div className='py-4'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold gap-1 text-lg', { 'text-orange': !category })}
      >
        <RiMenuFill size={24} />
        Tất cả sản phẩm
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <ul>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id
          return (
            <li className='py-2 pl-2' key={categoryItem._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({ ...queryConfig, category: categoryItem._id }).toString()
                }}
                className={classNames('relative px-2', {
                  'font-semibold text-orange': isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='absolute top-1 left-[-10px] h-2 w-2 fill-orange'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={path.home} className='flex items-center font-bold mt-4 uppercase gap-1'>
        <FiFilter size={23} />
        Bộ lọc tìm kiếm
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='my-5'>
        <div>Khoảng giá</div>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => (
                <InputNumber
                  type='text'
                  className='grow'
                  placeholder='₫ TỪ'
                  classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  classNameError='hidden'
                  {...field}
                  onChange={() => {
                    field.onChange(event)
                    trigger('price_max')
                  }}
                />
              )}
            />
            <div className='mx-2 mt-2 shrink-0'>–</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => (
                <InputNumber
                  type='text'
                  className='grow'
                  placeholder='₫ ĐẾN'
                  classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  classNameError='hidden'
                  {...field}
                  onChange={() => {
                    field.onChange(event)
                    trigger('price_min')
                  }}
                />
              )}
            />
          </div>
          <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm text-center'>{errors.price_min?.message}</div>
          <Button className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='text-sm'>Đánh giá</div>
      <div className='my-3'>
        <ul>
          <li>
            <div className='py-1 pl-2'>
              <Link to='' className='flex items-center text-sm'>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <IoStar className='text-[#fadb14]' />
                  ))}
                <span className='ml-1'>Trở lên</span>
              </Link>
            </div>
          </li>
          <li>
            <div className='py-1 pl-2'>
              <Link to='' className='flex items-center text-sm'>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <IoStar className='text-[#fadb14]' />
                  ))}
                <span className='ml-1'>Trở lên</span>
              </Link>
            </div>
          </li>
        </ul>
      </div>
      <div className='bg-gray-300 h-[1px] my-4' />
      <Button className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center'>
        Xóa tất cả
      </Button>
    </div>
  )
}

export default AsideFilter
