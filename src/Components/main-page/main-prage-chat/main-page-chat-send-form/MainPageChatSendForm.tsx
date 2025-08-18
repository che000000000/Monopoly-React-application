import { useState } from 'react';
import styles from './main-page-chat-send-form.module.css'
import { UserT } from '../../../../store/types/auth';
import { MainPageChatMessageT } from '../types/main-page-chat-message';

function MainPageChatSendForm(props: { authUser: UserT | null, onSend: (message: MainPageChatMessageT) => void }) {
    const [sendMessageInputText, setSendMessageInputText] = useState('')

    function handleSendMessage(messageText: string): void {
        if (messageText.length === 0 || !props.authUser) return

        props.onSend({
            id: Date.now().toString(),
            text: messageText,
            sender: {
                id: props.authUser.id,
                name: props.authUser.name,
                avatarUrl: props.authUser.avatarUrl,
                role: props.authUser.role
            },
            createdAt: '19:35'
        })

        setSendMessageInputText('')
    }

    return (
        <div className={styles.container}>
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
    )
}

export default MainPageChatSendForm;