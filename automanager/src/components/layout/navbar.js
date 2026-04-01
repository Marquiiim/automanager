import styles from './navbar.module.css'

import api from '../../services/apiInstance'
import { useAuth } from '../../context/authContext';
import { Link, useLocation } from 'react-router-dom'
import { VscAccount, VscHeart, VscSignOut } from "react-icons/vsc";

function NavBar() {
    const auth = useAuth()
    const location = useLocation()

    const { setLoggedIn } = useAuth()

    if (location.pathname === '/auth' ||
        location.pathname === '/forget-password' ||
        location.pathname === '/change-password') return null

    const signOut = async () => {
        try {
            const response = await api.post('api/sessions/logout', {})
            if (response.data?.success === true || response.status === 200) setLoggedIn(false)
        } catch (error) {
            console.log(error)
        }
    }

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
                            <Link to='/parts'>
                                Peças
                            </Link>
                        </li>
                        <li>
                            <Link to='/reports'>
                                Relatórios
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
                {auth.loggedIn &&
                    <span>
                        <Link to='/favorites'>
                            <VscHeart size='20' />
                        </Link>
                    </span>
                }
            </div>
        </nav>
    )
}

export default NavBar