import MainLogo, { LogoTypes } from '../../main-logo/MainLogo';
import styles from './header.module.css'

function AuthHeader() {
    return (
        <div className={styles.container}>
            <MainLogo type={LogoTypes.AUTH}/>
        </div>
    )
}

export default AuthHeader;