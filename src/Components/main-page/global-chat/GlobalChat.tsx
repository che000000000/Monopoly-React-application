import { useAppDispatch } from '../../../hoocks/useAppDispatch';
import { useAppSelector } from '../../../hoocks/useAppSelector';
import { pushMessage } from '../../../store/global-chat-slice';
import { GlobalChatMessageT, GlobalChatStateT } from '../../../store/types/global-chat';
import MainPageChat from '../main-prage-chat/MainPageChat';
import styles from './global-chat.module.css'

function GlobalChat() {
    const dispatch = useAppDispatch()
    const globalChatState: GlobalChatStateT = useAppSelector(state => state.globalChat)

    const handleSendMessage = (message: GlobalChatMessageT) => {
        dispatch(pushMessage(message))
    }

    return (
        <div className={styles.container}>
            <MainPageChat messages={globalChatState.globalChatMessages} onSend={handleSendMessage} />
        </div>
    )
}

export default GlobalChat;