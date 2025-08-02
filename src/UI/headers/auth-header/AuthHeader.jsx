import MainLogo from '../../main-logo/MainLogo';
import styles from './header.module.css'

function AuthHeader() {
    return (
        <div className={styles.container}>
            <MainLogo />
        </div>
    )
}

export default AuthHeader;