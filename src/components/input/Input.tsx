import { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  classNameInput?: string
  classNameError?: string
}

const Input = ({
  errorMessage,
  className,
  name,
  register,
  rules,
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  ...rest
}: Props) => {
  const registerResult = register && name ? register(name, rules) : null
  return (
    <div className={className}>
      <input {...registerResult} className={classNameInput} {...rest} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}

export default Input
