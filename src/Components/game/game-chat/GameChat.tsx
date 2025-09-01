import { useEffect, useRef, useState } from 'react';
import GameChatMessage from './game-chat-message/GameChatMessage';
import styles from './game-chat.module.css'
import SendForm from './game-chat-send-form/GameChatSendForm';
import { IPlayer } from '../../../store/games/interfaces/player';
import { IGameChatMessage } from '../../../store/games/interfaces/game-chat-message';

function GameChat(props: { chatMessages: IGameChatMessage[], currentPlayer: IPlayer | null }) {
	const bottomMessagesListElemet = useRef<HTMLDivElement>(null)
	const messagesListElement = useRef<HTMLDivElement>(null)

	const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true)

	function toggleAutoScroll(): void {
		if (!messagesListElement.current) return
		const { scrollTop, scrollHeight, clientHeight } = messagesListElement.current
		setIsAutoScrollEnabled(scrollHeight - (scrollTop + clientHeight) < 10)
	}

	messagesListElement.current?.addEventListener('scroll', () => toggleAutoScroll())

	function handleScrollBottom(): void {
		if (isAutoScrollEnabled) {
			scrollToBottom(true)
		} else return
	}

	function scrollToBottom(isInstant: boolean): void {
		setTimeout(() => {
			bottomMessagesListElemet.current?.scrollIntoView({ behavior: 'auto' })
		}, isInstant ? 0 : 50)
	}

	useEffect(() => {
		scrollToBottom(false)
	}, [])

	useEffect(() => {
		handleScrollBottom()
	}, [props.chatMessages])

	return (
		<div className={styles.container}>
			<div className={styles.messages_list} ref={messagesListElement}>
				{props.chatMessages.map(message => <GameChatMessage key={message.id} message={message} currentPlayer={props.currentPlayer} />)}
				<div className={styles.bottom_scroll_position} ref={bottomMessagesListElemet} />
			</div>
			<SendForm currentPlayer={props.currentPlayer} />
		</div>
	)
}

export default GameChat;