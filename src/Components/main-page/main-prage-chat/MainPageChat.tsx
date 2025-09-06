import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './main-page-chat.module.css'
import MainPageChatSendForm from './main-page-chat-send-form/MainPageChatSendForm';
import MainPageChatMessage from './main-page-chat-message/MainPageChatMessage';
import NoMessages from './no-messages/NoMessages';
import { useAppSelector } from '../../../hoocks/useAppSelector';
import { AuthStateT } from '../../../store/slices/auth/types/auth-state';
import { IGLobalChatMessage } from '../../../store/slices/global-chat/interfaces/global-chat-message';
import { IPregameRoomMessage } from '../../../store/slices/pregame-rooms/interfaces/pregame-room-message';

function MainPageChat(props: { messages: IGLobalChatMessage[] | IPregameRoomMessage[], name: string, onSend: (messageText: string) => void }) {
    const authState: AuthStateT = useAppSelector(state => state.auth)

    const messagesListElement = useRef<HTMLDivElement>(null)
    

    const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true)

    const toggleAutoScroll = useCallback((): void => {
        if (!messagesListElement.current) return
        const { scrollTop, scrollHeight, clientHeight } = messagesListElement.current
        setIsAutoScrollEnabled(scrollHeight - (scrollTop + clientHeight) < 10)
    }, [messagesListElement, setIsAutoScrollEnabled])

    useEffect(() => {
        const element = messagesListElement.current
        if (!element) return

        element.addEventListener('scroll', toggleAutoScroll)

        return () => {
            element.removeEventListener('scroll', toggleAutoScroll)
        }
    }, [toggleAutoScroll])

    const scrollToBottom = useCallback((isInstant: boolean): void => {
        setTimeout(() => {
            if (messagesListElement.current) {
                messagesListElement.current.scrollTop = messagesListElement.current.scrollHeight
            }
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
                                isMine={message.sender !== null && message.sender.id === authState.user?.id}
                            />
                        )
                        : <NoMessages />
                    }
            </div>
            <MainPageChatSendForm key={props.name} name={props.name} authUser={authState.user} onSend={props.onSend} />
        </div>
    )
}

export default MainPageChat;