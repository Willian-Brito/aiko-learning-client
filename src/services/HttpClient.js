import axios from 'axios'

class HttpClient {

    async get(url) {
        return await axios.get(url)
    }

    async post(url, data) {
        return await axios.post(url, data)
    }

    async put(url, data) {
        return await axios.put(url, data)
    }

    async patch(url, data) {
        return await axios.patch(url, data)
    }

    async delete(url) {
        return await axios.delete(url)
    }

    setHeader(header, value) {
        axios.defaults.headers.common[header] = value
    }

    deleteHeader(header) {
        delete axios.defaults.headers.common[header]
    }
}

export default new HttpClient()
