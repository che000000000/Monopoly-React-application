import { definePlayerChipIcon } from '../../../../common/define-player-chip';
import { PlayerChip } from '../../../../store/enums/player-chip';
import styles from './owner-background.module.css'

function OwnerBackground(props: { playerChip: PlayerChip }) {
    return (
        <div
            className={styles.owner_background}
            style={{ backgroundImage: `url(${definePlayerChipIcon(props.playerChip)})` }}
        />
    )
}

export default OwnerBackground;