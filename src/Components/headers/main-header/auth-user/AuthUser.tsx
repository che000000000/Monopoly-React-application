import styles from './auth-user.module.css'
import no_avatar from '../../../../images/common/no-avatar.png'

function AuthUser(props: { name: string, avatarUrl: string | null }) {
	return (
		<div className={styles.container}>
			<div className={styles.name}>{props.name}</div>
			<img className={styles.avatar} alt={`${props.name} avatar`} src={props.avatarUrl ? props.avatarUrl : no_avatar} />
		</div>
	)
}

export default AuthUser;