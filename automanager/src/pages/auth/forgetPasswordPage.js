import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './forgetPasswordPage.module.css';

const ForgetPasswordPage = () => {

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
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.button}>
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