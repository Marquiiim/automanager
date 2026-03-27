import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/apiInstance';
import styles from './forgetPasswordPage.module.css';

const ForgetPasswordPage = () => {

  const navigate = useNavigate()
  const [data, setData] = useState({
    fullName: '',
    email: '',
    cpf: '',
    birthDate: ''
  })

  const forgetPassword = async (e) => {
    e.preventDefault()

    const forgetData = {
      fullName: data.fullName,
      email: data.email,
      cpf: data.cpf,
      birthDate: data.birthDate
    }

    try {
      const response = await api.post('/api/auth/forget-password/verify', { forgetData })
      if (response.data?.success === true || response?.status === 200) {

        console.log(forgetData.email)

        navigate('/change-password', {
          replace: true,
          state: {
            email: forgetData.email,
            fromForget: true
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeForgetPassword = (e) => {
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
          <h1 className={styles.title}>Recuperar senha</h1>
          <p className={styles.subtitle}>
            Digite suas informações para redefinir sua senha
          </p>
        </div>

        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor='fullName' className={styles.label}>
              Nome completo
            </label>
            <input
              id='fullName'
              type='text'
              name='fullName'
              value={data.fullName}
              onChange={onChangeForgetPassword}
              className={styles.input}
              placeholder="Digite seu nome completo"
              required
            />

            <label htmlFor='email' className={styles.label}>
              Email
            </label>
            <input
              id='email'
              type='email'
              name='email'
              value={data.email}
              onChange={onChangeForgetPassword}
              className={styles.input}
              placeholder="exemplo@automanager.com"
              required
            />

            <label htmlFor='cpf' className={styles.label}>
              CPF
            </label>
            <input
              id='cpf'
              type='text'
              name='cpf'
              value={data.cpf}
              onChange={onChangeForgetPassword}
              className={styles.input}
              placeholder="XXX.XXX.XXX-XX"
              required
            />

            <label htmlFor='birthDate' className={styles.label}>
              Data de nascimento
            </label>
            <input
              id='birthDate'
              type='date'
              name='birthDate'
              value={data.birthDate}
              onChange={onChangeForgetPassword}
              className={styles.input}
              required
            />
          </div>

          <button onClick={(e) => forgetPassword(e)} type="submit" className={styles.button}>
            Recuperar senha
          </button>

          <div className={styles.backLink}>
            <Link to='/auth' className={styles.link}>
              ← Voltar para o login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;