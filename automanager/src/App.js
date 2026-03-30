import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'
import { routeConfig, basename } from './routes/routes';
import { AuthProvider } from "./context/authContext.js";
import Navbar from "./components/layout/navbar.js";
import Footer from './components/layout/footer.js'

function App() {
    const renderRoutes = (routes) => {
        return routes.map((route, index) => (
            <Route
                key={index}
                path={route.path}
                element={route.element}
            >
                {route.children && renderRoutes(route.children)}
            </Route>
        ))
    }

    return (
        <AuthProvider>
            <Router basename={basename}>
                <Navbar />
                <Routes>
                    {renderRoutes(routeConfig)}
                </Routes>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <Footer />
            </Router>
        </AuthProvider>
    )
}

export default App