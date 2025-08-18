import { GlobalChatMessageT } from '../../../../store/types/global-chat';
import styles from './main-page-chat-message.module.css'

function MainPageChatMessage(props: { message: GlobalChatMessageT, isMine: boolean }) {
    const formatDate = (date: Date): string => {
        const dateObj = typeof date === 'string' ? new Date(date) : date;

        const hours = dateObj.getHours().toString().padStart(2, '0');
        const minutes = dateObj.getMinutes().toString().padStart(2, '0');

        return `${hours}:${minutes}`;
    }

    switch (props.isMine) {
        case false: return (
            <div className={`${styles.container} ${styles.alien_container}`}>
                <div className={styles.sender}>{props.message.sender.name}</div>
                <div className={styles.message_text}>{props.message.text}</div>
                <div className={styles.sent_time}>{formatDate(props.message.createdAt)}</div>
            </div>
        )
        case true: return (
            <div className={styles.mine_wrap}>
                <div className={`${styles.container} ${styles.mine_container}`}>
                    <div className={styles.sender}>Вы</div>
                    <div className={styles.message_text}>{props.message.text}</div>
                    <div className={styles.sent_time}>{formatDate(props.message.createdAt)}</div>
                </div>
            </div>
        )
        default: return (
            <div className={styles.container}>
                <div className={styles.sender}>{props.message.sender.name}</div>
                <div className={styles.message_text}>{props.message.text}</div>
                <div className={styles.sent_time}>{formatDate(props.message.createdAt)}</div>
            </div>
        )
    }

}

export default MainPageChatMessage;