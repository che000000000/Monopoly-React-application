import styles from './auth-user.module.css'

function AuthUser(props: {user: {name: string, avatarUrl: string | null}}) {
  return (
      <div className={styles.container}>
          <div className={styles.name}>{props.user.name}</div>
          <div className={styles.avatar}>{props.user.avatarUrl}</div>
      </div>
  )
}

export default AuthUser;