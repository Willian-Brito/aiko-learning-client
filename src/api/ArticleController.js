import axios from 'axios'
import { BASE_API_URL } from '@/config/environment.js'

class ArticleController {
    
    async GetAll() {
        const response = await axios.get(`${BASE_API_URL}/article`)
        const articles = response.data.payload;
        articles.forEach(item => delete item.articles);

        return articles
    }

    async GetPaged(pageNumber = 1, pageLimit = 5) {
        const response = await axios.get(`${BASE_API_URL}/article/paged?pageNumber=${pageNumber}&pageLimit=${pageLimit}`)
        const articles = response.data.payload;
        return articles
    }

    async GetById(id) {
        const response = await axios.get(`${BASE_API_URL}/article/${id}`)
        const article = response.data.payload;        

        return article
    }

    async Save(method, id, article) {        
        return await axios[method](`${BASE_API_URL}/article${id}`, article)
    }

    async Delete(id) {        
        return await axios.delete(`${BASE_API_URL}/article/${id}`)        
    }
}

export default new ArticleController();