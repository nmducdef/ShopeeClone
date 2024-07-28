import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authApi from '~/apis/auth.api'
import Input from '~/components/input'
import { AppContext } from '~/contexts/app.context'
import { ErrorResponseAPI } from '~/types/utils.type'
import { schema, Schema } from '~/utils/rules'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'

const Register = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<Schema>({ resolver: yupResolver(schema) })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<Schema, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit: SubmitHandler<Schema> = (data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setProfile(data.data.data.user)
        setIsAuthenticated(true), navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponseAPI<Omit<Schema, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError?.email) {
            setError('email', { message: formError.email, type: 'Server' })
          }
          if (formError?.password) {
            setError('password', { message: formError.password, type: 'Server' })
          }
        }
      }
    })
  }

  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-20 py-10 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                type='email'
                className='mt-8'
                register={register}
                errorMessage={errors.email?.message}
                name='email'
                placeholder='Email'
              />

              <Input
                type='password'
                className='mt-3'
                register={register}
                errorMessage={errors.password?.message}
                name='password'
                autoComplete='on'
                placeholder='Password'
              />

              <Input
                type='password'
                className='mt-3'
                register={register}
                errorMessage={errors.confirm_password?.message}
                name='confirm_password'
                autoComplete='on'
                placeholder='Confirm password'
              />

              <div className='mt-3'>
                <button className='w-full text-center px-2 py-4 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                  Đăng ký
                </button>
              </div>

              <div className='flex items-center mt-8'>
                <span className='text-slate-400'>Bạn có tài khoản chưa?</span>
                <Link className='text-red-400 ml-1' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
