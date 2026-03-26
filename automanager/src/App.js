import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'
import { routeConfig, basename } from './routes/routes';
import Navbar from "./components/layout/navbar.js";
import Footer from './components/layout/footer.js'

function App() {

    const AppRoutes = () => {
        return <Routes>
            {routeConfig.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                />
            ))}
        </Routes>
    }

    return (
        <Router basename={basename}>
            <Navbar />
            <AppRoutes />
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
    )
}

export default App