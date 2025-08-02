import AuthUser from '../../auth-user/AuthUser';
import MainLogo from '../../main-logo/MainLogo';
import NavBar from '../../nav-bar/NavBar';
import Search from '../../search/Search';
import styles from './header.module.css'

function Header() {

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.upper_section}>
                    <MainLogo />
                    <Search />
                </div>
                <div className={styles.lower_section}>
                    <NavBar />
                    <AuthUser />
                </div>
            </div>
        </div>
    )
}

export default Header;