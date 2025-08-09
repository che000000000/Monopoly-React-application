import styles from './auth-input.module.css'

export enum AuthInputTypes {
    LOGIN,
    PASSWORD,
    CONFIRM_PASSWORD
}

function AuthInput(props: { 
    title: string,
    type: AuthInputTypes,
    placeholder: string,
    text: string,
    onChange: (value: string) => void}
) {
    switch (props.type) {
        case AuthInputTypes.LOGIN: return (
            <div className={styles.container}>
                <div className={styles.title}>{props.title}</div>
                <input className={styles.input} placeholder={props.placeholder}
                    value={props.text}
                    onChange={(event) => props.onChange(event.target.value)}
                />
            </div>
        )
        case AuthInputTypes.PASSWORD: return (
            <div className={styles.container}>
                <div className={styles.title}>{props.title}</div>
                <input className={styles.input} placeholder={props.placeholder}
                    value={props.text}
                    onChange={(event) => props.onChange(event.target.value)}
                />
            </div>
        )
        case AuthInputTypes.CONFIRM_PASSWORD: return (
            <div className={styles.container}>
                <div className={styles.title}>{props.title}</div>
                <input className={styles.input} placeholder={props.placeholder}
                    value={props.text}
                    onChange={(event) => props.onChange(event.target.value)}
                />
            </div>
        )
        default: return (
            <div>Failed to render input.</div>
        )
    }
}

export default AuthInput;