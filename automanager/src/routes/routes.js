import Home from '../pages/home/homePage'
import Auth from '../pages/auth/authPage'

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
        element: <Auth />
    },
    {
        path: '/favorites',
        element: <Auth />
    }
]

export const basename = '/auto-manager'