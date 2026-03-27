import Home from '../pages/home/homePage'
import Auth from '../pages/auth/authPage'
import ForgetPassword from '../pages/auth/forgetPasswordPage'
import ChangePassword from '../pages/auth/changePasswordPage'

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
    },
    {
        path: '/change-password',
        element: <ChangePassword />
    }
]

export const basename = '/auto-manager'