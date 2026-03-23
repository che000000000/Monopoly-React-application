import { ActionCardDeckType, IActionCard } from '../../../../../store/interfaces/action-card';
import styles from './action-card.module.css'

function ActionCard(props: { actionCard: IActionCard }) {
    const { actionCard } = props
    const deckType = actionCard.deckType

    return (
        <div className={
            deckType === ActionCardDeckType.CHANCE
                ? `${styles.container} ${styles.chance__background_color}`
                : `${styles.container} ${styles.community_chest__background_color}`}>
            <div className={styles.content}>
                <div className={styles.title}>
                    {
                        deckType === ActionCardDeckType.CHANCE
                            ? 'ШАНС'
                            : 'ОБЩЕСТВЕННАЯ КАЗНА'
                    }
                </div>
                <div className={styles.description}>
                    <div className={styles.text}>
                        {actionCard.description}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActionCard;