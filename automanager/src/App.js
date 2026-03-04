import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routeConfig, basename } from './routes/routes';
import Navbar from "./components/layout/navbar";
import Footer from './components/layout/footer'

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
            <Footer />
        </Router>
    )
}

export default App