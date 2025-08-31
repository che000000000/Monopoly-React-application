import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './main-page-chat.module.css'
import { UserT } from '../../../store/types/auth';
import MainPageChatSendForm from './main-page-chat-send-form/MainPageChatSendForm';
import MainPageChatMessage from './main-page-chat-message/MainPageChatMessage';
import { MainPageChatMessageT } from './types/main-page-chat-message';
import NoMessages from './no-messages/NoMessages';

function MainPageChat(props: { messages: MainPageChatMessageT[], authUser: UserT, onSend: (messageText: string) => void }) {
    const messagesListElement = useRef<HTMLDivElement>(null)
    const bottomMessagesListElemet = useRef<HTMLDivElement>(null)

    const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true)

    const toggleAutoScroll = (): void => {
        if (!messagesListElement.current) return
        const { scrollTop, scrollHeight, clientHeight } = messagesListElement.current
        setIsAutoScrollEnabled(scrollHeight - (scrollTop + clientHeight) < 10)
    }

    messagesListElement.current?.addEventListener('scroll', () => toggleAutoScroll())

    const scrollToBottom = useCallback((isInstant: boolean): void => {
        setTimeout(() => {
            bottomMessagesListElemet.current?.scrollIntoView({ behavior: 'auto' })
        }, isInstant ? 0 : 50)
    }, [])

    const handleScrollBottom = useCallback((): void => {
        if (isAutoScrollEnabled) scrollToBottom(true)
        else return
    }, [isAutoScrollEnabled, scrollToBottom])

    useEffect(() => {
        scrollToBottom(false)
    }, [scrollToBottom])

    useEffect(() => {
        if (isAutoScrollEnabled) handleScrollBottom()
        else return
    }, [props.messages, handleScrollBottom, isAutoScrollEnabled])

    return (
        <div className={styles.container}>
            <div className={styles.messages_list} ref={messagesListElement}>
                {
                    props.messages.length !== 0
                        ? props.messages.map(message =>
                            <MainPageChatMessage
                                key={message.id}
                                message={message}
                                isMine={message.sender.id === props.authUser.id}
                            />
                        )
                        : <NoMessages />
                    }
                <div className={styles.lower_scroll_position} ref={bottomMessagesListElemet} />
            </div>
            <MainPageChatSendForm authUser={props.authUser} onSend={props.onSend} />
        </div>
    )
}

export default MainPageChat;