import styles from './authpage.module.css'

import { Link } from 'react-router-dom'

function AuthPage() {

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Bem-vindo de volta</h1>
                    <p className={styles.subtitle}>
                        Faça login para acessar sua conta
                    </p>
                </div>

                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={styles.input}
                            placeholder="seu@authmanager.com"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>
                            Senha
                        </label>
                        <input
                            type="password"
                            id="password"
                            className={styles.input}
                            placeholder="••••••••"
                        />
                    </div>

                    <div className={styles.options}>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" className={styles.checkbox} />
                            <span className={styles.checkboxText}>Lembrar-me</span>
                        </label>
                        <Link to='/forget-password' className={styles.forgotPassword}>
                            Esqueceu a senha?
                        </Link>
                    </div>

                    <button type="submit" className={styles.button}>
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AuthPage