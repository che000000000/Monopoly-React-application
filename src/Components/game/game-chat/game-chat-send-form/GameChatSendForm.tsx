import { useState } from 'react';
import styles from './game-chat-send-form.module.css'
import { useAppDispatch } from '../../../../hoocks/useAppDispatch';
import { sendGameChatMessage } from '../../../../API/ws-thunks/games';

function GameChatSendForm() {
    const dispatch = useAppDispatch()

    const [sendInputText, setSendInputText] = useState('')

    function handleSendInputText(inputText: string): void {
        setSendInputText(inputText)
    }

    function handleSendMessage(messageText: string): void {
        dispatch(sendGameChatMessage({ messageText }))

        setSendInputText('')
    }

    return (
        <div className={styles.container}>
            <input className={styles.send_message_input}
                placeholder='введите сообщение...'
                value={sendInputText}
                onChange={(event) => handleSendInputText(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                        handleSendMessage(sendInputText)
                    }
                }}
            />
            <button className={styles.send_message_btn}
                onClick={() => handleSendMessage(sendInputText)}
            >Отправить</button>
        </div>
    )
}

export default GameChatSendForm;