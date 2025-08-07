import InGamePlayer, { PlayerChip, PlayerStatus } from '../player/in-game-player/InGamePlayer';
import styles from './game-header.module.css'

function GameHeader() {
    return (
        <div className={styles.container}>
            <div className={styles.turn_timer}>
                <div className={styles.turn_timer__text}>ТАЙМЕР ХОДА</div>
                <div className={styles.timer}>00 : 60</div>
            </div>
            <ul className={styles.players_list}>
                <InGamePlayer
                    name='видеокал-'
                    avatarUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkEfGn7ner5O1tTQAk9HBUhT_z8phEhvGtrQ&s'
                    playerChip={PlayerChip.CART}
                    status={PlayerStatus.isTurnOwner}
                />
                <InGamePlayer
                    name='Koka'
                    avatarUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzGtI0IPVxNpeV1YleZyyVfYVIZZn1hKxBsQ&s'
                    playerChip={PlayerChip.HAT}
                />
                <InGamePlayer
                    name='Русец отсосской кратодемии'
                    avatarUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGB3V-tAqVQV4bwaakhE54_sbT_MBKBX1Pv4pTktsdsILoyR46'
                    playerChip={PlayerChip.PENGUIN}
                    status={PlayerStatus.isLeft}
                />
                <InGamePlayer
                    name='Sn1k'
                    avatarUrl='https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRrg-RoaiWeDBlA0VQcaAHtgvpzsrUaLHaZsJSOxQ2Tz1ITjK6x'
                    playerChip={PlayerChip.IRON}
                />
            </ul>
        </div>
    )
}

export default GameHeader;