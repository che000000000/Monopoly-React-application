import { useState } from 'react';
import styles from './main-page-chat-send-form.module.css'
import { IUser } from '../../../../store/slices/auth/interfaces/user';

function MainPageChatSendForm(props: { authUser: IUser | null, name: string, onSend: (messageText: string) => void }) {
    const [sendMessageInputText, setSendMessageInputText] = useState('')

    const handleClearFormAndSendMessage = () => {
        props.onSend(sendMessageInputText)
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
                        handleClearFormAndSendMessage()
                    }
                }}
            />
            <button className={styles.send_btn}
                onClick={() => handleClearFormAndSendMessage()}
            >Отправить</button>
        </div>
    )
}

export default MainPageChatSendForm;