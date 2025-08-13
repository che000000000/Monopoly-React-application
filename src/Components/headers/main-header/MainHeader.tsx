import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hoocks/useAppSelector';
import { AuthStateT } from '../../../types/auth';
import AuthUser from '../../auth-user/AuthUser';
import MainLogo, { LogoTypes } from '../../main-logo/MainLogo';
import styles from './main-header.module.css'

function MainHeader() {
    const authState: AuthStateT = useAppSelector(state => state.auth)

    const authUser = authState.user ? {name: authState.user.name, avatarUrl: authState.user.avatarUrl} : null

    return (
        <div className={styles.container}>
            <MainLogo type={LogoTypes.MAIN} />
            {authUser ? <AuthUser user={authUser}/> : <Link to={'/login'}>Войти в уч. запись</Link> }
        </div>
    )
}

export default MainHeader;