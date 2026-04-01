import Home from '../pages/home/homePage'
import Auth from '../pages/auth/authPage'
import ForgetPassword from '../pages/auth/forgetPasswordPage'
import ChangePassword from '../pages/auth/changePasswordPage'

import ProtectedRoutes from './protectedRoutes'
import StockPage from '../pages/stock/stockPage'

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
    },
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: '/stock',
                element: <StockPage />
            }/*,
            {
                path: '/available',
                element: < AvailablePage/>
            },
            {
                path: '/parts',
                element: < PartsPage/>
            },
            {
                path: '/reports',
                element: < ReportsPage/>
            }*/
        ]
    }
]

export const basename = '/auto-manager'