import styles from './authpage.module.css'

import api from '../../services/apiInstance'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AuthPage() {
    const navigate = useNavigate()

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const signIn = async (e) => {
        e.preventDefault()
        const signData = {
            email: data.email,
            password: data.password
        }

        try {
            const response = await api.post('/api/auth/login', { signData })
            if (response.data.success === true || response.status === 200) navigate('/', { replace: true })
        } catch (error) {
            console.error(error)
        }
    }

    const onChangeSign = (e) => {
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