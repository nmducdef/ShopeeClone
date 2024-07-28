import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: { value: true, message: 'Email là bắt buộc' },
    pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Email sai định dạng' }
  },
  password: {
    required: { value: true, message: 'Mật khẩu là bắt buộc' },
    minLength: { value: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      message: 'Mật khẩu phải có ít nhất một chữ cái và một số'
    }
  },
  confirm_password: {
    required: { value: true, message: 'Xác nhận mật khẩu là bắt buộc' },
    validate: getValues ? (value: string) => value === getValues('password') || 'Mật khẩu không khớp' : undefined
  }
})

export const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email sai định dạng'),
  password: yup
    .string()
    .required('Mật khẩu là bắt buộc')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Mật khẩu phải có ít nhất một chữ cái và một số'),
  confirm_password: yup
    .string()
    .required('Xác nhận mật khẩu là bắt buộc')
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Gia khong phu hop',
    test: function (value) {
      const price_min = value
      const { price_max } = this.parent as { price_min: string; price_max: string }
      if (price_min !== '' && price_max) {
        return Number(price_max) >= Number(price_min)
      }
      return price_min !== '' || price_max !== ''
    }
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Gia khong phu hop',
    test: function (value) {
      const price_max = value
      const { price_min } = this.parent as { price_min: string; price_max: string }
      if (price_min !== '' && price_max) {
        return Number(price_max) >= Number(price_min)
      }
      return price_min !== '' || price_max !== ''
    }
  })
})

export const loginSchema = schema.omit(['confirm_password'])
export type LoginSchema = yup.InferType<typeof loginSchema>

export type Schema = yup.InferType<typeof schema>
