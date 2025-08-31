import styles from './no-messages.module.css'

function NoMessages() {
    return (
        <div className={styles.container}>
            <div className={styles.text}>Нет сообщений</div>
        </div>
    )
}

export default NoMessages;