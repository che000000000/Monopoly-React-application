import { useAppSelector } from '../../../hoocks/useAppSelector';
import { AuthStateT } from '../../../types/auth';
import { GlobalChatStateT } from '../../../types/globalChat';
import GlobalChatMessage from './global-chat-message/GlobalChatMessage';
import styles from './global-chat.module.css'

function GlobalChat() {
    const globalChatState: GlobalChatStateT = useAppSelector(state => state.globalChat)
    const authState: AuthStateT = useAppSelector(state => state.auth)

    return (
        <div className={styles.container}>
            <div className={styles.messages_list}>
                {globalChatState.globalChatMessages.map(message =>
                    <GlobalChatMessage message={message} isMine={message.sender.id !== authState.user.id ? false : true} />
                )}
            </div>
            <div className={styles.send_message_form}>
                <input className={styles.send_input} placeholder='введите сообщение...' />
                <button className={styles.send_btn}>Отправить</button>
            </div>
        </div>
    )
}

export default GlobalChat;