import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../hoocks/useAppSelector';
import GlobalChatMessage from './global-chat-message/GlobalChatMessage';
import styles from './global-chat.module.css'
import GlobalChatSendForm from './global-chat-send-form/GlobalChatSendForm';
import { GlobalChatStateT } from '../../../store/types/global-chat';
import { AuthStateT } from '../../../store/types/auth';

function GlobalChat() {
    const globalChatState: GlobalChatStateT = useAppSelector(state => state.globalChat)
    const authState: AuthStateT = useAppSelector(state => state.auth)

    const messagesListElement = useRef<HTMLDivElement>(null)
    const bottomMessagesListElemet = useRef<HTMLDivElement>(null)

    const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true)

    function toggleAutoScroll(): void {
        if (!messagesListElement.current) return
        const { scrollTop, scrollHeight, clientHeight } = messagesListElement.current
        setIsAutoScrollEnabled(scrollHeight - (scrollTop + clientHeight) < 10)
    }

    messagesListElement.current?.addEventListener('scroll', () => toggleAutoScroll())

    function scrollToBottom(isInstant: boolean): void {
        setTimeout(() => {
            bottomMessagesListElemet.current?.scrollIntoView({ behavior: 'auto' })
        }, isInstant ? 0 : 50)
    }

    function handleScrollBottom(): void {
        if (isAutoScrollEnabled) scrollToBottom(true)
        else return
    }

    useEffect(() => {
        scrollToBottom(false)
    }, [])

    useEffect(() => {
        if (isAutoScrollEnabled) handleScrollBottom()
        else return
    }, [globalChatState.globalChatMessages])

    return (
        <div className={styles.container}>
            <div className={styles.messages_list} ref={messagesListElement}>
                {globalChatState.globalChatMessages.map(message =>
                    <GlobalChatMessage
                        key={message.id}
                        message={message}
                        isMine={message.sender.id === authState.user?.id}
                    />
                )}
                <div className={styles.lower_scroll_position} ref={bottomMessagesListElemet} />
            </div>
            <GlobalChatSendForm authUser={authState.user} />
        </div>
    )
}

export default GlobalChat;