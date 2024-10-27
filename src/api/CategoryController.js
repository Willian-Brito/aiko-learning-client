import axios from 'axios'
import { BASE_API_URL } from '@/config/environment.js'

class CategoryController {

    async GetAll() {
        const response = await axios.get(`${BASE_API_URL}/category`)
        const categories = response.data.payload;
        return categories
    }

    async GetCategoriesWithPath(pageNumber = 1, pageLimit = 5) {
        const response = await axios.get(`${BASE_API_URL}/category/path?pageNumber=${pageNumber}&pageLimit=${pageLimit}`)
        const categories = response.data.payload;
        return categories
    }

    async GetCategoriesWithTree() {
        const response = await axios.get(`${BASE_API_URL}/category/tree`)
        const categories = response.data.payload;
        return categories
    }

    async GetById(id) {
        const response = await axios.get(`${BASE_API_URL}/category/${id}`)
        const category = response.data.payload;        
        return category
    }

    async Save(method, id, category) {        
        return await axios[method](`${BASE_API_URL}/category${id}`, category)
    }

    async Delete(id) {        
        return await axios.delete(`${BASE_API_URL}/category/${id}`)        
    }
}

export default new CategoryController();