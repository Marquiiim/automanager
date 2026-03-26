import styles from './navbar.module.css'

import { Link, useLocation } from 'react-router-dom'

import { VscAccount, VscHeart } from "react-icons/vsc";

function NavBar() {
    const location = useLocation()

    if (location.pathname === '/auth' || location.pathname === '/forget-password') return null

    return (
        <nav>
            <div className={styles.logo}>
                <h1>
                    <Link to='/'>
                        AUTOMANAGER
                    </Link>
                </h1>
            </div>

            {/*<div className={styles.options_website}>
                <ul>
                    <li>
                        <Link to='/buy'>
                            Estoque
                        </Link>
                    </li>
                    <li>
                        <Link to='/sell'>
                            Disponíveis
                        </Link>
                    </li>
                    <li>
                        <Link to='/services'>
                            Peças
                        </Link>
                    </li>
                    <li>
                        <Link to='/help'>
                            Relatórios
                        </Link>
                    </li>
                </ul>
            </div>*/}

            <div className={styles.options_right}>
                <span>
                    <Link to='/auth'>
                        <VscAccount /> Entrar
                    </Link>
                </span>
                <span>
                    <Link to='/favorites'>
                        <VscHeart size='20' />
                    </Link>
                </span>
            </div>
        </nav>
    )
}

export default NavBar