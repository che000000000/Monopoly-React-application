import { useState } from 'react';
import styles from './game-chat-send-form.module.css'
import { useAppDispatch } from '../../../../hoocks/useAppDispatch';
import { pushMessage } from '../../../../store/games-slice';
import { PlayerT } from '../../../../store/types/games';

function GameChatSendForm(props: { currentPlayer: PlayerT | null }) {
    const dispatch = useAppDispatch()

    const [sendInputText, setSendInputText] = useState('')

    function handleSendInputText(inputText: string): void {
        setSendInputText(inputText)
    }

    function handleSendMessage(messageText: string): void {
        const currentPlayer = props.currentPlayer
        if (!currentPlayer || messageText.length === 0) return

        dispatch(pushMessage({
            id: '228',
            text: messageText,
            sender: {
                id: currentPlayer.id,
                name: currentPlayer.user.name,
                avatarUrl: currentPlayer.user.avatarUrl,
                chip: currentPlayer.chip,
                role: currentPlayer.user.role
            },
            sentTime: '19:14'
        }))

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