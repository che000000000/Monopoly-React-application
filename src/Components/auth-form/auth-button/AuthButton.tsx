import styles from './auth-button.module.css'

function AuthButton(props: { text: string, onClick: () => void }) {
  return (
    <button className={styles.container} onClick={() => props.onClick()}>
      <div className={styles.text}>
        {props.text}
      </div>
    </button>
  )
}

export default AuthButton;