import { useAppSelector } from '../../hoocks/useAppSelector';
import { GameFieldType } from '../../store/enums/game-field-type';
import Angle from './game-fiields/angle/Angle';
import { GameFieldOrientation } from './game-fiields/enums/game-field-orientation';
import Property from './game-fiields/property/Property';
import RandomEvent from './game-fiields/random-events/RandomEvent';
import GameHeader from './game-header/GameHeader';
import GameChat from './game-chat/GameChat';
import styles from './game.module.css'
import GameBuilds from './game-builds/GameBuilds';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hoocks/useAppDispatch';
import { getGameChatMessagesPage } from '../../API/ws-thunks/games';
import { GamesStateT } from '../../store/slices/games/types/games-state';
import NoAuthRedirect from '../../hoc/NoAuthRedirect';
import { clearGameChatMessages } from '../../store/slices/games/games-slice';

function Game() {
	const gamesState: GamesStateT = useAppSelector(state => state.games)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(clearGameChatMessages())
		dispatch(getGameChatMessagesPage({ pageSize: 32 }))
	}, [dispatch, gamesState.isGatewayConnected])

	if (!gamesState.currentGame) return null

	const sortedGameFieldsByPosition = [...gamesState.currentGame.fields].sort((a, b) => a.position - b.position)

	const gameSectionFields = {
		go: sortedGameFieldsByPosition.find(field => field.type === GameFieldType.GO),

		bottomSection: sortedGameFieldsByPosition
			.filter(field => field.position >= 2 && field.position <= 10)
			.sort((a, b) => b.position - a.position),

		justVisiting: sortedGameFieldsByPosition.find(field => field.type === GameFieldType.JUST_VISITING),

		leftSection: sortedGameFieldsByPosition
			.filter(field => field.position >= 12 && field.position <= 20)
			.sort((a, b) => b.position - a.position),

		freeParking: sortedGameFieldsByPosition.find(field =>
			field.type === GameFieldType.FREE_PARKING
		),

		topSection: sortedGameFieldsByPosition.filter(field =>
			field.position >= 22 && field.position <= 30
		),

		goToJail: sortedGameFieldsByPosition.find(field =>
			field.type === GameFieldType.GO_TO_JAIL
		),

		rightSection: sortedGameFieldsByPosition.filter(field =>
			field.position >= 32 && field.position <= 40
		)
	}

	return (
		<div className={styles.container}>
			<div className={`${styles.section} ${styles.stop}`}>
				{gameSectionFields.freeParking ? <Angle {...gameSectionFields.freeParking} /> : null}
			</div>
			<div className={`${styles.section} ${styles.top_section}`}>
				{gameSectionFields.topSection.map(field => (
					field.type === GameFieldType.PROPERTY
						? <Property key={field.id} orientation={GameFieldOrientation.TOP} fieldData={field} />
						: <RandomEvent key={field.id} orientation={GameFieldOrientation.TOP} fieldData={field} />
				))}
			</div>
			<div className={`${styles.section} ${styles.goto_prison}`}>
				{gameSectionFields.goToJail ? <Angle {...gameSectionFields.goToJail} /> : null}
			</div>
			<div className={`${styles.section} ${styles.left_section}`}>
				{gameSectionFields.leftSection.map(field => (
					field.type === GameFieldType.PROPERTY
						? <Property key={field.id} orientation={GameFieldOrientation.LEFT} fieldData={field} />
						: <RandomEvent key={field.id} orientation={GameFieldOrientation.LEFT} fieldData={field} />
				))}
			</div>
			<div className={`${styles.section} ${styles.chat_section}`}>
				<GameHeader players={gamesState.currentGame.players} />
				<GameBuilds housesCount={gamesState.currentGame.houses} hotelsCount={gamesState.currentGame.hotels} />
				<GameChat chatMessages={gamesState.currentGameChat.messages} />
			</div>
			<div className={`${styles.section} ${styles.right_section}`}>
				{gameSectionFields.rightSection.map(field => (
					field.type === GameFieldType.PROPERTY
						? <Property key={field.id} orientation={GameFieldOrientation.RIGHT} fieldData={field} />
						: <RandomEvent key={field.id} orientation={GameFieldOrientation.RIGHT} fieldData={field} />
				))}
			</div>
			<div className={`${styles.section} ${styles.forward_joly}`}>
				{gameSectionFields.justVisiting ? <Angle {...gameSectionFields.justVisiting} /> : null}
			</div>
			<div className={`${styles.section} ${styles.bottom_section}`}>
				{gameSectionFields.bottomSection.map(field => (
					field.type === GameFieldType.PROPERTY
						? <Property key={field.id} orientation={GameFieldOrientation.BOTTOM} fieldData={field} />
						: <RandomEvent key={field.id} orientation={GameFieldOrientation.BOTTOM} fieldData={field} />
				))}
			</div>
			<div className={`${styles.section} ${styles.start}`}>
				{gameSectionFields.go ? <Angle {...gameSectionFields.go} /> : null}
			</div>
		</div>
	)
}

export default NoAuthRedirect(Game);