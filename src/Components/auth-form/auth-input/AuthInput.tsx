import show_password_icon from '../../../icons/password-input-icons/show.svg'
import hide_password_icon from '../../../icons/password-input-icons/hide.svg'
import styles from './auth-input.module.css'
import { useState } from 'react'

export enum AuthInputType {
    LOGIN,
    PASSWORD,
    CONFIRM_PASSWORD
}

function AuthInput(props: {
    title: string,
    type: AuthInputType,
    placeholder: string,
    value: string,
    onChange: (value: string) => void
}) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const isPasswordField = props.type === AuthInputType.PASSWORD || props.type === AuthInputType.CONFIRM_PASSWORD
    const inputType = isPasswordField && !isPasswordVisible ? 'password' : 'text'

    return (
        <div className={styles.container}>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.input_wrap}>
                <input
                    className={styles.input}
                    type={inputType}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                />
                {isPasswordField && (
                    <img
                        className={styles.password_icons}
                        src={isPasswordVisible ? hide_password_icon : show_password_icon}
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        alt={isPasswordVisible ? 'Hide password' : 'Show password'}
                    />
                )}
            </div>
        </div>
    )
}

export default AuthInput;