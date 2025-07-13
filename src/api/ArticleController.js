import http from '@/services/HttpClient.js'
import { BASE_API_URL } from '@/config/environment.js'

class ArticleController {
    
    async GetAll() {
        const response = await http.get(`${BASE_API_URL}/article`)
        const articles = response.data.payload;
        articles.forEach(item => delete item.articles);

        return articles
    }

    async GetPaged(pageNumber = 1, pageLimit = 5) {
        const response = await http.get(`${BASE_API_URL}/article/paged?pageNumber=${pageNumber}&pageLimit=${pageLimit}`)
        const articles = response.data.payload;
        return articles
    }

    async GetPagedByCategory(id, pageNumber = 1, pageLimit = 5) {
        const response = await http.get(`${BASE_API_URL}/article/category/${id}?pageNumber=${pageNumber}&pageLimit=${pageLimit}`)
        const articles = response.data.payload;        
        return articles
    }

    async GetById(id) {
        const response = await http.get(`${BASE_API_URL}/article/${id}`)
        const article = response.data.payload;
        return article
    }

    async Save(method, id, article) {
        return await http[method](`${BASE_API_URL}/article${id}`, article)
    }

    async Delete(id) {        
        return await http.delete(`${BASE_API_URL}/article/${id}`)        
    }
}

export default new ArticleController();