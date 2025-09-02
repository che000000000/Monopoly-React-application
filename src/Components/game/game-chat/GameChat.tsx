import { useCallback, useEffect, useRef, useState } from 'react';
import GameChatMessage from './game-chat-message/GameChatMessage';
import styles from './game-chat.module.css'
import SendForm from './game-chat-send-form/GameChatSendForm';
import { IGameChatMessage } from '../../../store/slices/games/interfaces/game-chat-message';
import { IUser } from '../../../store/slices/auth/interfaces/user';

function GameChat(props: { chatMessages: IGameChatMessage[], authUser: IUser | null }) {
	const bottomMessagesListElemet = useRef<HTMLDivElement>(null)
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
			bottomMessagesListElemet.current?.scrollIntoView({ behavior: 'auto' })
		}, isInstant ? 0 : 50)
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
			<div className={styles.messages_list} ref={messagesListElement}>
				{props.chatMessages.map(message => <GameChatMessage key={message.id} message={message} authUser={props.authUser} />)}
				<div className={styles.bottom_scroll_position} ref={bottomMessagesListElemet} />
			</div>
			<SendForm authUser={props.authUser} />
		</div>
	)
}

export default GameChat;