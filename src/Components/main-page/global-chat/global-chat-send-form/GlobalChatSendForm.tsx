import { useState } from 'react';
import styles from './global-chat-send-form.module.css'
import { useAppDispatch } from '../../../../hoocks/useAppDispatch';
import { UserT } from '../../../../types/auth';
import { pushMessage } from '../../../../store/global-chat-slice';

function GlobalChatSendForm(props: {authUser: UserT | null}) {
    const dispatch = useAppDispatch()

    const [sendMessageInputText, setSendMessageInputText] = useState('')

    function handleSendMessage(messageText: string): void {
        if (messageText.length === 0 || !props.authUser) return

        dispatch(pushMessage({
            id: Date.now().toString(),
            text: messageText,
            sender: {
                id: props.authUser.id,
                name: props.authUser.name,
                avatarUrl: props.authUser.avatarUrl,
                role: props.authUser.role
            } ,
            createdAt: '19:35'
        }))
        
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

export default GlobalChatSendForm;