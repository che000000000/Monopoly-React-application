import { IGLobalChatMessage } from '../../../../store/slices/global-chat/interfaces/global-chat-message';
import { IPregameRoomMessage } from '../../../../store/slices/pregame-rooms/interfaces/pregame-room-message';
import styles from './main-page-chat-message.module.css'

function MainPageChatMessage(props: { message: IGLobalChatMessage | IPregameRoomMessage, isMine: boolean }) {
    const formatDate = (date: Date): string => {
        const dateObj = typeof date === 'string' ? new Date(date) : date

        const hours = dateObj.getHours().toString().padStart(2, '0')
        const minutes = dateObj.getMinutes().toString().padStart(2, '0')

        return `${hours}:${minutes}`
    }

    return (
        <div className={`${styles.container} ${props.isMine ? styles.mine_container : ''}`}>
            <div className={props.isMine ? `${styles.message} ${styles.my_message}` : `${styles.message}`}>
                <div className={styles.sender}>{props.message.sender ? props.isMine ? 'Вы' : props.message.sender.name : 'Удалённый пользователь'}</div>
                <div className={styles.message_text}>{props.message.text}</div>
                <div className={styles.sent_time}>{formatDate(props.message.createdAt)}</div>
            </div>
        </div>
    )
}

export default MainPageChatMessage;