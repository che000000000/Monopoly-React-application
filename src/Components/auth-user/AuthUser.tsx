import styles from './auth-user.module.css'

function AuthUser() {
  return (
      <div className={styles.container}>
          <div className={styles.name}>видеокал-</div>
          <div className={styles.avatar}></div>
      </div>
  )
}

export default AuthUser;