import { useEffect } from 'react';
import { useAppSelector } from '../../../hoocks/useAppSelector';
import { GlobalChatStateT } from '../../../store/slices/global-chat/types/global-chat-state';
import styles from './global-chat.module.css'
import { useAppDispatch } from '../../../hoocks/useAppDispatch';
import { getGlobalChatMessagesPage, sendGlobalChatMessage } from '../../../API/ws-thunks/global-chat';
import MainPageChat from '../main-prage-chat/MainPageChat';
import { clearGlobalChatMessages } from '../../../store/slices/global-chat/global-chat-slice';

function GlobalChat() {
    const dispatch = useAppDispatch()
    const globalChatState: GlobalChatStateT = useAppSelector(state => state.globalChat)

    const handleSendMessage = (messageText: string) => {
        dispatch(sendGlobalChatMessage({ messageText }))
    }

    useEffect(() => {
        if (globalChatState.isGatewayConnected) {
            dispatch(clearGlobalChatMessages())
            dispatch(getGlobalChatMessagesPage({}))
        }


    }, [globalChatState.isGatewayConnected, dispatch])

    return (
        <div className={styles.container}>
            <MainPageChat name='global-chat' messages={globalChatState.globalChat.messages} onSend={handleSendMessage} />
        </div>
    )
}

export default GlobalChat;