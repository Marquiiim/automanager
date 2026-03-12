import styles from './authpage.module.css'

import { useState } from 'react'
import api from '../../services/apiInstance'
import { Link } from 'react-router-dom'

function AuthPage() {

    const [data, setData] = useState({
        email: '',
        password: '',
        type: ''
    })

    const signIn = async (e) => {
        e.preventDefault()
        const signData = {
            email: data.email,
            password: data.password,
            type: 'login'
        }

        try {
            console.log(signData)

            const response = await api.post('/api/auth/login', {signData})
            console.log(response)
        } catch (error) {
            console.error(error.message)
        }
    }

    const onChangeSign = (e) => {
        e.preventDefault()
        const { name, value } = e.target

        setData(prev => ({
            ...prev,
            [name]: value
        }))
    }

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
                        <label htmlFor='email' className={styles.label}>
                            E-mail
                        </label>
                        <input
                            id='email'
                            type='email'
                            name='email'
                            value={data.email}
                            onChange={onChangeSign}
                            className={styles.input}
                            placeholder="seu@authmanager.com"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor='password' className={styles.label}>
                            Senha
                        </label>
                        <input
                            id='password'
                            type='password'
                            name='password'
                            value={data.password}
                            onChange={onChangeSign}
                            className={styles.input}
                            placeholder="••••••••"
                            required
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

                    <button onClick={(e) => signIn(e)} type="submit" className={styles.button}>
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AuthPage