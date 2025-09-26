import { useCallback, useEffect, useRef, useState } from 'react';
import GameChatMessage from './game-chat-message/GameChatMessage';
import styles from './game-chat.module.css'
import SendForm from './game-chat-send-form/GameChatSendForm';
import { IGameChatMessage } from '../../../store/slices/games/interfaces/game-chat-message';
import ThrowDices from '../throw-dices/ThrowDices';
import GameDialogue from '../game-dialogue/GameDialogue';

function GameChat(props: { chatMessages: IGameChatMessage[] }) {
	const messagesListElement = useRef<HTMLDivElement>(null)

	const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true)

	const toggleAutoScroll = useCallback((): void => {
		if (!messagesListElement.current) return
		const { scrollTop, scrollHeight, clientHeight } = messagesListElement.current
		setIsAutoScrollEnabled(scrollHeight - (scrollTop + clientHeight) < 10)
	}, [])

	useEffect(() => {
		const element = messagesListElement.current;
		if (!element) return;
		
		element.addEventListener('scroll', toggleAutoScroll);
		return () => element.removeEventListener('scroll', toggleAutoScroll);
	}, [toggleAutoScroll])

	const scrollToBottom = useCallback((isInstant: boolean): void => {
		setTimeout(() => {
			if(messagesListElement.current) {
				messagesListElement.current.scrollTop = messagesListElement.current.scrollHeight
			}
		}, isInstant ? 0 : 100)
	}, [])

	const handleScrollBottom = useCallback((): void => {
		if (isAutoScrollEnabled) {
			scrollToBottom(true)
		}
	}, [isAutoScrollEnabled, scrollToBottom])

	useEffect(() => {
		scrollToBottom(false)
	}, [scrollToBottom])

	useEffect(() => {
		handleScrollBottom()
	}, [props.chatMessages, handleScrollBottom])

	return (
		<div className={styles.container}>
			<GameDialogue />
			<ThrowDices />
			<div className={styles.messages_list} ref={messagesListElement}>
				{props.chatMessages.length !== 0 
					? props.chatMessages.map(message => <GameChatMessage key={message.id} message={message} />)
					: <div className={styles.no_messages}>Нет сообщений</div>
				}
			</div>
			<SendForm />
		</div>
	)
}

export default GameChat;