import styles from './selected-player-chip.module.css'
import { PlayerChip } from '../../../../store/enums/player-chip'
import cart_chip from '../../../../images/cart-chip.png'
import hat_chip from '../../../../images/hat-chip.png'
import iron_chip from '../../../../images/iron-chip.png'
import penguin_chip from '../../../../images/penguin-chip.png'
import thimble_chip from '../../../../images/thimble-chip.png'

const CHIP_IMAGES = {
    [PlayerChip.CART]: cart_chip,
    [PlayerChip.HAT]: hat_chip,
    [PlayerChip.IRON]: iron_chip,
    [PlayerChip.PENGUIN]: penguin_chip,
    [PlayerChip.THIMBLE]: thimble_chip,
} as const

function SelectedPlayerChip(props: { playerChip: PlayerChip | null}) {
    const definedPlayerChip = props.playerChip ? CHIP_IMAGES[props.playerChip] : null

    return definedPlayerChip
        ? (
            <div className={styles.container}>
                <img
                    className={styles.player_chip}
                    alt={`${props.playerChip} chip`}
                    src={definedPlayerChip}
                />
            </div>
        )
        : <span className={styles.player_chip} />
}

export default SelectedPlayerChip;