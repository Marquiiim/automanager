import styles from './Navbar.module.css'

import { Link } from 'react-router-dom'

import { VscAccount, VscHeart } from "react-icons/vsc";

function Navbar() {

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
                    <VscAccount /> Entrar
                </span>
                <a href=''>
                    <VscHeart size='20' />
                </a>
            </div>
        </nav>
    )
}

export default Navbar