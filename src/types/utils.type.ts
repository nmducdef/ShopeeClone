export interface ErrorResponseAPI<Data> {
  messege: string
  data?: Data
}

export interface SuccessResponseAPI<Data> {
  messege: string
  data: Data
}
