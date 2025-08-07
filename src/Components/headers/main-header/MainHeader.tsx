import AuthUser from '../../auth-user/AuthUser';
import MainLogo from '../../main-logo/MainLogo';
import styles from './main-header.module.css'

function MainHeader() {
    return (
        <div className={styles.container}>
            <MainLogo />
            <AuthUser />
        </div>
    )
}

export default MainHeader;