import { GameChatMessageT, PlayerT } from '../../../types/games';
import GameChatMessage from './game-chat-message/GameChatMessage';
import styles from './game-chat.module.css'

function GameChat(props: { chatMessages: GameChatMessageT[], currentPlayer: PlayerT | null }) {
	return (
		<div className={styles.container}>
			<div className={styles.messages_list}>
				{props.chatMessages.map(message => <GameChatMessage message={message} currentPlayer={props.currentPlayer} />)}
				<div className={styles.bottom_scroll_position}></div>
			</div>
			<div className={styles.input_form}>
				<input className={styles.send_message_input} placeholder='введите сообщение...' />
				<button className={styles.send_message_btn}>Отправить</button>
			</div>
		</div>
	)
}

export default GameChat;