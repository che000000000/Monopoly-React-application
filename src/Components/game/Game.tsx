import { useAppSelector } from '../../hoocks/useAppSelector';
import { GameFieldType } from '../../store/enums/game-field-type';
import Angle from '../game-fiields/angle/Angle';
import { GameFieldOrientation } from '../game-fiields/enums/game-field-orientation';
import Property from '../game-fiields/property/Property';
import RandomEvent from '../game-fiields/random-events/RandomEvent';
import GameHeader from '../game-header/GameHeader';
import styles from './game.module.css'

function Game() {
	const gamesState = useAppSelector(state => state.games)

	const gameSectionFields = {
		go: gamesState.currentGame.fields.filter(field => field.type === GameFieldType.GO),

		bottomSection: gamesState.currentGame.fields
			.filter(field => field.position >= 2 && field.position <= 10)
			.sort((a, b) => b.position - a.position),

		justVisiting: gamesState.currentGame.fields.filter(field => field.type === GameFieldType.JUST_VISITING),

		leftSection: gamesState.currentGame.fields
			.filter(field => field.position >= 12 && field.position <= 20)
			.sort((a, b) => b.position - a.position),

		freeParking: gamesState.currentGame.fields.filter(field =>
			field.type === GameFieldType.FREE_PARKING
		),

		topSection: gamesState.currentGame.fields.filter(field =>
			field.position >= 22 && field.position <= 30
		),

		goToJail: gamesState.currentGame.fields.filter(field =>
			field.type === GameFieldType.GO_TO_JAIL
		),

		rightSection: gamesState.currentGame.fields.filter(field =>
			field.position >= 32 && field.position <= 40
		)
	}

	return (
		<div className={styles.container}>
			<div className={`${styles.section} ${styles.stop}`}>
				<Angle type={GameFieldType.FREE_PARKING} />
			</div>
			<div className={`${styles.section} ${styles.top_section}`}>
				{gameSectionFields.topSection.map(field => (
					field.type === GameFieldType.PROPERTY
						? <Property orientation={GameFieldOrientation.TOP} fieldData={field} />
						: <RandomEvent orientation={GameFieldOrientation.TOP} fieldData={field} />
				))}
			</div>
			<div className={`${styles.section} ${styles.goto_prison}`}>
				<Angle type={GameFieldType.JUST_VISITING} />
			</div>
			<div className={`${styles.section} ${styles.left_section}`}>
				{gameSectionFields.leftSection.map(field => (
					field.type === GameFieldType.PROPERTY
						? <Property orientation={GameFieldOrientation.LEFT} fieldData={field} />
						: <RandomEvent orientation={GameFieldOrientation.LEFT} fieldData={field} />
				))}
			</div>
			<div className={`${styles.section} ${styles.chat_section}`}>
				<GameHeader players={gamesState.currentGame.players} />
			</div>
			<div className={`${styles.section} ${styles.right_section}`}>
				{gameSectionFields.rightSection.map(field => (
					field.type === GameFieldType.PROPERTY
						? <Property orientation={GameFieldOrientation.RIGHT} fieldData={field} />
						: <RandomEvent orientation={GameFieldOrientation.RIGHT} fieldData={field} />
				))}
			</div>
			<div className={`${styles.section} ${styles.forward_joly}`}>
				<Angle type={GameFieldType.JUST_VISITING} />
			</div>
			<div className={`${styles.section} ${styles.bottom_section}`}>
				{gameSectionFields.bottomSection.map(field => (
					field.type === GameFieldType.PROPERTY
						? <Property orientation={GameFieldOrientation.BOTTOM} fieldData={field} />
						: <RandomEvent orientation={GameFieldOrientation.BOTTOM} fieldData={field} />
				))}
			</div>
			<div className={`${styles.section} ${styles.start}`}>
				<Angle type={GameFieldType.GO} />
			</div>
		</div>
	)
}

export default Game;