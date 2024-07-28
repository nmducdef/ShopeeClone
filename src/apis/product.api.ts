import { SuccessResponseAPI } from './../types/utils.type'
import { Product, ProductList, ProductListConfig } from '~/types/product.type'
import http from '~/utils/http'

const URL = 'products'

const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponseAPI<ProductList>>(URL, { params })
  },

  getProductDetail(id: string) {
    return http.get<SuccessResponseAPI<Product>>(`${URL}/${id}`)
  }
}

export default productApi
