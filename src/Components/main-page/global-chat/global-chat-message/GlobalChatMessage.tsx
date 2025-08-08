import { GlobalChatMessageT } from '../../../../types/global-chat';
import styles from './global-chat-message.module.css'

function GlobalChatMessage(props: { message: GlobalChatMessageT, isMine: boolean }) {
    switch (props.isMine) {
        case false: return (
                <div className={`${styles.container} ${styles.alien_container}`}>
                    <div className={styles.sender}>{props.message.sender.name}</div>
                    <div className={styles.message_text}>{props.message.text}</div>
                    <div className={styles.sent_time}>{props.message.createdAt}</div>
                </div>
        )
        case true: return (
                   <div className={styles.mine_wrap}>
                <div className={`${styles.container} ${styles.mine_container}`}>
                    <div className={styles.sender}>{props.message.sender.name}</div>
                    <div className={styles.message_text}>{props.message.text}</div>
                    <div className={styles.sent_time}>{props.message.createdAt}</div>
                </div>
            </div>
        )
        default: return (
            <div className={styles.container}>
                <div className={styles.sender}>{props.message.sender.name}</div>
                <div className={styles.message_text}>{props.message.text}</div>
                <div className={styles.sent_time}>{props.message.createdAt}</div>
            </div>
        )
    }
    
}

export default GlobalChatMessage;