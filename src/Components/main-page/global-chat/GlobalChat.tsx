import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../hoocks/useAppSelector';
import { AuthStateT } from '../../../types/auth';
import { GlobalChatStateT } from '../../../types/globalChat';
import GlobalChatMessage from './global-chat-message/GlobalChatMessage';
import styles from './global-chat.module.css'
import { pushMessage } from '../../../store/globalChatSlice';
import { useAppDispatch } from '../../../hoocks/useAppDispatch';

function GlobalChat() {
    const globalChatState: GlobalChatStateT = useAppSelector(state => state.globalChat)
    const authState: AuthStateT = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch()

    const [sendMessageInputText, setSendMessageInputText] = useState('')

    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = (isInstant: boolean) => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })
        }, isInstant ? 0 : 50)
    }

    useEffect(() => {
        setTimeout(() => scrollToBottom(false), 0)
    }, [])

    function handleSendMessage(messageText: string) {
        if (messageText.length === 0) return null

        dispatch(pushMessage({
            id: Date.now().toString(),
            text: messageText,
            sender: {
                id: authState.user.id,
                name: authState.user.name,
                avatarUrl: authState.user.avatarUrl,
                role: authState.user.role
            },
            createdAt: '19:35'
        }))
        scrollToBottom(true)
        setSendMessageInputText('')
    }

    return (
        <div className={styles.container}>
            <div className={styles.messages_list}>
                {globalChatState.globalChatMessages.map(message =>
                    <GlobalChatMessage
                        key={message.id}
                        message={message}
                        isMine={message.sender.id === authState.user.id}
                    />
                )}
                <div className={styles.lower_scroll_position} ref={messagesEndRef} />
            </div>
            <div className={styles.send_message_form}>
                <input className={styles.send_input}
                    placeholder='введите сообщение...'
                    value={sendMessageInputText}
                    onChange={(event) => setSendMessageInputText(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' && !event.shiftKey) {
                            handleSendMessage(sendMessageInputText)
                        }
                    }}
                />
                <button className={styles.send_btn}
                    onClick={() => handleSendMessage(sendMessageInputText)}
                >Отправить</button>
            </div>
        </div>
    )
}

export default GlobalChat;