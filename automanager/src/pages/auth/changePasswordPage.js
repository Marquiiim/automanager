import {
    useState,
    useEffect,
    useCallback
} from 'react'
import {
    useNavigate,
    useLocation
} from 'react-router-dom'
import api from '../../services/apiInstance'
import styles from './changePasswordPage.module.css'

export default function ChangePassword() {
    const navigate = useNavigate()
    const location = useLocation()
    const [data, setData] = useState({
        email: location.state?.email,
        password: '',
        confirmPassword: ''
    })

    useEffect(() => {
        if (!location.state?.fromForget) {
            navigate('/forget-password', { replace: true })
            return
        }
    }, [location, navigate])


    const changePassword = useCallback(async (e) => {
        e.preventDefault()
        const changePasswordData = {
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword
        }
        try {
            const response = await api.patch('/api/auth/forget-password/change', { changePasswordData })
            if (response.data?.success === true || response?.status === 200) navigate('/auth', { replace: true })
        } catch (error) {
            console.log(error)
        }
    }, [navigate, data])

    const onChangePassword = (e) => {
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
                    <h1 className={styles.title}>Alteração de senha</h1>
                    <p className={styles.subtitle}>
                        Redefina sua senha nos campos abaixo
                    </p>
                    <div className={styles.passwordRules}>
                        <p className={styles.rulesTitle}>A senha deve conter:</p>
                        <ul className={styles.rulesList}>
                            <li> Uma letra maiúscula</li>
                            <li> Uma letra minúscula</li>
                            <li> Um número</li>
                            <li> Um caractere especial (!@#$%^&*)</li>
                        </ul>
                    </div>
                </div>

                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor='password' className={styles.label}>
                            Nova senha
                        </label>
                        <input
                            id='password'
                            type='password'
                            name='password'
                            value={data.password}
                            onChange={onChangePassword}
                            className={styles.input}
                            placeholder="•••••••••••"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor='confirmPassword' className={styles.label}>
                            Confirmação de senha
                        </label>
                        <input
                            id='confirmPassword'
                            type='password'
                            name='confirmPassword'
                            value={data.confirmPassword}
                            onChange={onChangePassword}
                            className={styles.input}
                            placeholder="•••••••••••"
                            required
                        />
                    </div>

                    <button onClick={(e) => changePassword(e)} type="submit" className={styles.button}>
                        Redefinir senha
                    </button>
                </form>
            </div>
        </div>
    )
}