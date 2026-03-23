import Home from '../pages/home/homePage'
import Auth from '../pages/auth/authPage'
import ForgetPassword from '../pages/auth/forgetPasswordPage'

export const routeConfig = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/auth',
        element: <Auth />
    },
    {
        path: '/forget-password',
        element: <ForgetPassword />
    }
]

export const basename = '/auto-manager'