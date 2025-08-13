import styles from './oauth-method.module.css'
import google_oauth_icon from '../../../icons/auth-methods/google_oauth.svg'

export enum OauthMethods {
    GOOGLE
}

function OauthMethod(props: {method: OauthMethods}) {
    return (
        <div className={styles.container}>
            <img className={styles.method_icon} alt='google_oauth' src={google_oauth_icon} />
            <div className={styles.method_text}>Продолжить с Google</div>
        </div>
    )
}

export default OauthMethod;