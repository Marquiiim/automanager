import axios from "axios"
import { Navigate } from "react-router-dom"
import { showToast } from './toastConfig'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    withCredentials: true,
    timeout: 10000
})

api.interceptors.request.use(
    config => {
        console.log('URL completa:', `${config.baseURL}${config.url}`);
        console.log('Método:', config.method?.toUpperCase());

        if (process.env.NODE_ENV === 'development') console.log(`${config.method?.toUpperCase()} ${config.url}`)

        return config
    },
    error => Promise.reject(error)
)

api.interceptors.response.use(
    response => {
        const message = response.data?.message

        if (message) showToast.success(message)

        if (process.env.NODE_ENV === 'development') console.log(`${response.status}, ${response.data}`)

        return response
    },
    error => {
        const errorData = error.response?.data
        const status = error.response?.status
        const errorMessage = errorData.message

        showToast.error(errorMessage)

        if (process.env.NODE_ENV === 'development') {
            console.error(`Erro:`, {
                status,
                message: errorMessage,
                data: errorData
            })
        }

        if (status === 401 && !window.location.pathname.includes('/auth')) {
            setTimeout(() => {
                return <Navigate to='/auth' replace />
            }, 2000)
        }
        return Promise.reject(error)
    }
)

export default api