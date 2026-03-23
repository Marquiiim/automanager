import styles from './footer.module.css'

import { useLocation } from 'react-router-dom'

function Footer() {
    const location = useLocation()

    if (location.pathname === '/auth' || '/forget-password') return null

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.logo_bottom}>
                    <span className={styles.logo}>
                        AUTOMANAGER
                    </span>
                </div>
                <div className={styles.copyright}>
                    &copy; 1995-2025 AUTOMANAGER S.A. CNPJ: 00.000.000/0000-00 Todos os direitos reservados.
                </div>
            </div>
        </div>
    )
}

export default Footer