import { PlayerChip } from '../../../../store/enums/player-chip';
import styles from './game-chat-message.module.css'
import { IGameChatMessage } from '../../../../store/slices/games/interfaces/game-chat-message';
import { AuthStateT } from '../../../../store/slices/auth/types/auth-state';
import { useAppSelector } from '../../../../hoocks/useAppSelector';
import { definePlayerChipIcon } from '../../../../common/define-player-chip';

function GameChatMessage(props: { message: IGameChatMessage }) {
	const authState: AuthStateT = useAppSelector(state => state.auth)

	const formatDate = (date: Date): string => {
		const dateObj = typeof date === 'string' ? new Date(date) : date;

		const hours = dateObj.getHours().toString().padStart(2, '0');
		const minutes = dateObj.getMinutes().toString().padStart(2, '0');

		return `${hours}:${minutes}`;
	}

	return (
		<div className={props.message.sender?.id !== authState.user?.id ? styles.container : styles.my_message_container}>
			<div className={props.message.sender?.id !== authState.user?.id ? styles.message : `${styles.message} ${styles.my_message}`}>
				<div className={styles.message_sender}>
					<div className={styles.sender_name}>{props.message.sender
						? authState.user?.id === props.message.sender.id ? 'Вы'
							: props.message.sender.name : 'Удалённый аккаунт'
					}</div>
					<img className={styles.sender_chip} alt={`${props.message.sender?.name}-icon`} src={definePlayerChipIcon(props.message.sender ? props.message.sender.chip : PlayerChip.CART)} />
				</div>
				<div className={styles.message_text}>{props.message.text}</div>
				<div className={styles.sent_time}>{formatDate(props.message.createdAt)}</div>
			</div>
		</div>
	)
}

export default GameChatMessage;