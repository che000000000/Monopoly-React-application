import styles from './oauth-method.module.css'
import google_oauth_icon from '../../../icons/auth-methods/google_oauth.svg'
import { OauthMethod } from '../../../API/enums/oauth-method';

function Oauth(props: {method: OauthMethod, onClick: () => void}) {
    return (
        <button className={styles.container} onClick={() => props.onClick()}>
            <img className={styles.method_icon} alt='google_oauth' src={google_oauth_icon} />
            <div className={styles.method_text}>Продолжить с Google</div>
        </button>
    )
}

export default Oauth;