import { Link } from 'react-router-dom';
import AuthHeader from '../headers/auth-header/AuthHeader';
import AuthInput, { AuthInputType } from './auth-input/AuthInput';
import styles from './auth-form.module.css'
import AuthButton from './auth-button/AuthButton';
import { useEffect, useState } from 'react';
import { registerUser } from '../../store/auth-slice';
import { useAppDispatch } from '../../hoocks/useAppDispatch';
import { useLoginMutation } from '../../API/authApi'
import { error } from 'console';

export enum AuthFormType {
    LOGIN,
    REGISTER
}

export enum AuthFormData {
    LOGIN = 'login',
    PASSWORD = 'password',
    CONFIRM_PASSWORD = 'confirmPassword'
}

function AuthForm(props: { type: AuthFormType }) {
    const dispatch = useAppDispatch()

    const [Login] = useLoginMutation()

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

    const handleFormInputsData = (field: AuthFormData, value: string) => {
        setformInputsData(prev => ({ ...prev, [field]: value }))
    }

    const handleLogin = async () => {
        if (formInputsData.login === '' && formInputsData.password === '') return 

        const requestBody = {
            email: formInputsData.login,
            password: formInputsData.password
        }

        await Login(requestBody)

        setformInputsData({
            login: '',
            password: '',
            confirmPassword: ''
        })
    }

    const handleRegister = (login: string, password: string, confirmPassword: string) => {
        dispatch(registerUser({ login, password, confirmPassword }))
        setformInputsData({
            login: '',
            password: '',
            confirmPassword: ''
        })
    }

    switch (props.type) {
        case AuthFormType.LOGIN: return (
            <div className={styles.container}>
                <AuthHeader />
                <div className={styles.main_content}>
                    <div className={styles.title}>Вход в уч. запись</div>
                    <div className={styles.inputs}>
                        <AuthInput
                            title='Почта'
                            type={AuthInputType.LOGIN}
                            placeholder='введите почту...'
                            value={formInputsData.login}
                            onChange={(value) => handleFormInputsData(AuthFormData.LOGIN, value)}
                        />
                        <AuthInput
                            key={AuthFormType.LOGIN}
                            title='Пароль'
                            type={AuthInputType.PASSWORD}
                            placeholder='введите пароль...'
                            value={formInputsData.password}
                            onChange={(value) => handleFormInputsData(AuthFormData.PASSWORD, value)}
                        />
                    </div>
                    <div className={styles.lower_section}>
                        <Link to={'/register'} className={styles.link}>
                            У вас ещё нет уч. записи?
                        </Link>
                        <AuthButton text='Войти' onClick={() => handleLogin()} />
                    </div>
                </div>
            </div>
        )
        case AuthFormType.REGISTER: return (
            <div className={styles.container}>
                <AuthHeader />
                <div className={styles.main_content}>
                    <div className={styles.title}>Регистрация</div>
                    <div className={styles.inputs}>
                        <AuthInput
                            title='Почта'
                            type={AuthInputType.LOGIN}
                            placeholder='введите почту...'
                            value={formInputsData.login}
                            onChange={(value) => handleFormInputsData(AuthFormData.LOGIN, value)}
                        />
                        <AuthInput
                            key={AuthFormType.REGISTER}
                            title='Пароль'
                            type={AuthInputType.PASSWORD}
                            placeholder='введите пароль...'
                            value={formInputsData.password}
                            onChange={(value) => handleFormInputsData(AuthFormData.PASSWORD, value)}
                        />
                        <AuthInput
                            title='Подтверждение пароля'
                            type={AuthInputType.CONFIRM_PASSWORD}
                            placeholder='подтвердите пароль...'
                            value={formInputsData.confirmPassword}
                            onChange={(value) => handleFormInputsData(AuthFormData.CONFIRM_PASSWORD, value)}
                        />
                    </div>
                    <div className={styles.lower_section}>
                        <Link to={'/login'} className={styles.link}>
                            Уже есть уч. запись?
                        </Link>
                        <AuthButton text='Зарегестрировать' onClick={() => handleRegister(formInputsData.login, formInputsData.password, formInputsData.confirmPassword)} />
                    </div>
                </div>
            </div>
        )
    }
}

export default AuthForm;