import { Link } from 'react-router-dom';
import AuthHeader from '../headers/auth-header/AuthHeader';
import AuthInput, { AuthInputType } from './auth-input/AuthInput';
import styles from './auth-form.module.css'
import AuthButton from './auth-button/AuthButton';
import { useEffect, useState } from 'react';
import { useLoginMutation, useRegisterMutation } from '../../API/authApi'
import google_oauth_icon from '../../icons/auth-methods/google_oauth.svg'
import OauthMethod, { OauthMethods } from './oauth-method/OauthMethod';

export enum AuthFormType {
    LOGIN,
    REGISTER
}

export enum AuthFormData {
    LOGIN = 'login',
    PASSWORD = 'password',
    REPEAT_PASSWORD = 'confirmPassword'
}

function AuthForm(props: { type: AuthFormType }) {
    const [loginUser] = useLoginMutation()
    const [registerUser] = useRegisterMutation()

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
        const requestBody = {
            email: formInputsData.login,
            password: formInputsData.password
        }

        await loginUser(requestBody)

        setformInputsData({
            login: '',
            password: '',
            confirmPassword: ''
        })
    }

    const handleRegister = async () => {
        const requestBody = {
            email: formInputsData.login,
            password: formInputsData.password,
            repeatPassword: formInputsData.confirmPassword
        }

        await registerUser(requestBody)

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
                    <div className={styles.oauth_methods}>
                        <OauthMethod method={OauthMethods.GOOGLE} />
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
                            onChange={(value) => handleFormInputsData(AuthFormData.REPEAT_PASSWORD, value)}
                        />
                    </div>
                    <div className={styles.lower_section}>
                        <Link to={'/login'} className={styles.link}>
                            Уже есть уч. запись?
                        </Link>
                        <AuthButton text='Зарегестрировать' onClick={() => handleRegister()} />
                    </div>
                    <div className={styles.oauth_methods}>
                        <OauthMethod method={OauthMethods.GOOGLE}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AuthForm;