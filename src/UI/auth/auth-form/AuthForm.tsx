import { Link } from 'react-router-dom';
import AuthHeader from '../../headers/auth-header/AuthHeader';
import AuthInput, { AuthInputTypes } from '../auth-input/AuthInput';
import styles from './auth-form.module.css'
import AuthButton from '../auth-button/AuthButton';
import { useEffect, useState } from 'react';

export enum AuthFormTypes {
    LOGIN,
    REGISTER
}

export enum AuthFormData {
    LOGIN = 'login',
    PASSWORD = 'password',
    CONFIRM_PASSWORD = 'confirmPassword'
}

function AuthForm(props: { type: AuthFormTypes }) {
    const [formInputsData, setformInputsData] = useState({
        login: '',
        password: '',
        confirmPassword: ''
    })

    useEffect(() => {
        setformInputsData({
            login: '',
            password: '',
            confirmPassword: ''
        })
    }, [props.type])

    const handleFormInputsData = (field: string, value: string) => {
        setformInputsData(prev => ({ ...prev, [field]: value }))
    }

    switch (props.type) {
        case AuthFormTypes.LOGIN: return (
            <div className={styles.container}>
                <AuthHeader />
                <div className={styles.main_content}>
                    <div className={styles.title}>Вход в уч. запись</div>
                    <div className={styles.inputs}>
                        <AuthInput
                            title='Почта'
                            type={AuthInputTypes.LOGIN}
                            placeholder='введите почту...'
                            text={formInputsData.login}
                            onChange={(value) => handleFormInputsData(AuthFormData.LOGIN, value)}
                        />
                        <AuthInput
                            title='Пароль'
                            type={AuthInputTypes.PASSWORD}
                            placeholder='введите пароль...'
                            text={formInputsData.password}
                            onChange={(value) => handleFormInputsData(AuthFormData.PASSWORD, value)}
                        />
                    </div>
                    <div className={styles.lower_section}>
                        <Link to={'/register'} className={styles.link}>
                            У вас ещё нет уч. записи?
                        </Link>
                        <AuthButton text='Войти' />
                    </div>
                </div>
            </div>
        )
        case AuthFormTypes.REGISTER: return (
            <div className={styles.container}>
                <AuthHeader />
                <div className={styles.main_content}>
                    <div className={styles.title}>Регистрация</div>
                    <div className={styles.inputs}>
                        <AuthInput
                            title='Почта'
                            type={AuthInputTypes.LOGIN}
                            placeholder='введите почту...'
                            text={formInputsData.login}
                            onChange={(value) => handleFormInputsData(AuthFormData.LOGIN, value)}
                        />
                        <AuthInput
                            title='Пароль'
                            type={AuthInputTypes.PASSWORD}
                            placeholder='введите пароль...'
                            text={formInputsData.password}
                            onChange={(value) => handleFormInputsData(AuthFormData.PASSWORD, value)}
                        />
                        <AuthInput
                            title='Подтверждение пароля'
                            type={AuthInputTypes.PASSWORD}
                            placeholder='подтвердите пароль...'
                            text={formInputsData.confirmPassword}
                            onChange={(value) => handleFormInputsData(AuthFormData.CONFIRM_PASSWORD, value)}
                        />
                    </div>
                    <div className={styles.lower_section}>
                        <Link to={'/login'} className={styles.link}>
                            Уже есть уч. запись?
                        </Link>
                        <AuthButton text='Зарегестрировать' />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div >

        </div>
    )
}

export default AuthForm;