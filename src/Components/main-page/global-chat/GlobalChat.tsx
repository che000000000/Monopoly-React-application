import { useAppSelector } from '../../../hoocks/useAppSelector';
import { GlobalChatStateT } from '../../../store/types/global-chat';
import styles from './global-chat.module.css'

function GlobalChat() {
    // const dispatch = useAppDispatch()
    const globalChatState: GlobalChatStateT = useAppSelector(state => state.globalChat)

    // const handleSendMessage = (messageText: string) => {
    //     console.log(`Send message into global chat: ${messageText}`)
    //     // dispatch(pushMessage(messageText))
    // }

    return (
        <div className={styles.container}>
            {/* <MainPageChat messages={globalChatState.globalChatMessages} onSend={handleSendMessage}/> */}
        </div>
    )
}

export default GlobalChat;