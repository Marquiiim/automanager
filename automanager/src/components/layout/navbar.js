import {
    Link,
    useLocation
} from 'react-router-dom'
import {
    VscAccount,
    VscSignOut
} from "react-icons/vsc";
import { useCallback } from 'react';
import { useAuth } from '../../context/authContext';
import api from '../../services/apiInstance'
import styles from './navbar.module.css'

export default function NavBar() {
    const auth = useAuth()
    const location = useLocation()
    const { setLoggedIn } = useAuth()

    const signOut = useCallback(async () => {
        try {
            const response = await api.post('api/sessions/logout', {})
            if (response.data?.success === true || response.status === 200) setLoggedIn(false)
        } catch (error) {
            console.log(error)
        }
    }, [setLoggedIn])


    if (location.pathname === '/auth' ||
        location.pathname === '/forget-password' ||
        location.pathname === '/change-password') return null

    return (
        <nav>
            <div className={styles.logo}>
                <h1>
                    <Link to='/'>
                        AUTOMANAGER
                    </Link>
                </h1>
            </div>

            {auth.loggedIn &&
                <div className={styles.options_website}>
                    <ul>
                        <li>
                            <Link to='/stock'>
                                Estoque
                            </Link>
                        </li>
                        <li>
                            <Link to='/availables'>
                                Disponíveis
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard'>
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                </div>
            }

            <div className={styles.options_right}>
                <span>
                    {auth.loggedIn ? (
                        <Link to='/auth' onClick={signOut}>
                            <VscSignOut /> Sair
                        </Link>
                    ) : (
                        <Link to='/auth'>
                            <VscAccount /> Entrar
                        </Link>
                    )}
                </span>
            </div>
        </nav>
    )
}