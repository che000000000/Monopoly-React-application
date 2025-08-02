import styles from './auth-button.module.css'

function AuthButton(props: {text: string}) {
  return (
    <button className={styles.container}>
      <div className={styles.text}>
        {props.text}
      </div>
    </button>
  )
}

export default AuthButton;