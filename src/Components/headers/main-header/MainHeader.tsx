import AuthUser from '../../auth-user/AuthUser';
import MainLogo, { LogoTypes } from '../../main-logo/MainLogo';
import styles from './main-header.module.css'

function MainHeader() {
    return (
        <div className={styles.container}>
            <MainLogo type={LogoTypes.MAIN} />
            <AuthUser />
        </div>
    )
}

export default MainHeader;