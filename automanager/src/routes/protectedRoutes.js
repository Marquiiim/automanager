import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import api from '../services/apiInstance'

const ProtectedRoutes = () => {

    const { loggedIn, setLoggedIn } = useAuth()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const validateSession = async () => {
            try {
                const response = await api.post('api/sessions/private-routes', {})
                setLoggedIn(response.data?.valid === true)
            } catch (error) {
                setLoggedIn(false)
            } finally {
                setLoading(false)
            }
        }
        validateSession()
    }, [setLoggedIn])

    if (loading) return <div>Carregando...</div>

    if (!loggedIn) return <Navigate to='/auth' replace />

    return <Outlet />
}

export default ProtectedRoutes