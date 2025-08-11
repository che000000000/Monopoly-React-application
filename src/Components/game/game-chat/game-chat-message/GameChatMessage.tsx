import { PlayerChip } from '../../../../store/enums/player-chip';
import { GameChatMessageT, PlayerT } from '../../../../types/games';
import iron_chip from '../../../../images/iron-chip.png'
import hat_chip from '../../../../images/hat-chip.png'
import cart_chip from '../../../../images/cart-chip.png'
import penguin_chip from '../../../../images/penguin-chip.png'
import thimble_chip from '../../../../images/thimble-chip.png'
import styles from './game-chat-message.module.css'

function GameChatMessage(props: {message: GameChatMessageT, currentPlayer: PlayerT | null}) {

	function definePlayerChipIcon(playerChip: PlayerChip): string {
		switch (playerChip) {
			case PlayerChip.CART: return cart_chip
			case PlayerChip.HAT: return hat_chip
			case PlayerChip.IRON: return iron_chip
			case PlayerChip.PENGUIN: return penguin_chip
			case PlayerChip.THIMBLE: return thimble_chip
			default: return ''
		}
	}

	return (
		<div className={props.message.sender.id !== props.currentPlayer?.id ? styles.container : styles.my_message_container}>
			<div className={props.message.sender.id !== props.currentPlayer?.id ? styles.message : `${styles.message} ${styles.my_message}`}>
				<div className={styles.message_sender}>
					<div className={styles.sender_name}>{props.message.sender.name}</div>
					<img className={styles.sender_chip} alt={`${props.message.sender.name}-icon`} src={definePlayerChipIcon(props.message.sender.chip)} />
				</div>
				<div className={styles.message_text}>{props.message.text}</div>
				<div className={styles.sent_time}>{props.message.sentTime}</div>
			</div>
		</div>
	)
}

export default GameChatMessage;