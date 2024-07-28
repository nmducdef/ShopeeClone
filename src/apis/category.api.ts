import { Category } from '~/types/category.type'
import { SuccessResponseAPI } from '~/types/utils.type'
import http from '~/utils/http'

const URL = 'categories'

const categoryApi = {
  getCategories() {
    return http.get<SuccessResponseAPI<Category[]>>(URL)
  }
}

export default categoryApi
