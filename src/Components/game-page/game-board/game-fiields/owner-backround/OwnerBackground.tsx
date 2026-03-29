import styles from './owner-background.module.css';
import { definePlayerChipIcon } from '../../../../../common/define-player-chip';
import { PlayerChip } from '../../../../../store/interfaces/player';

function OwnerBackground(props: { playerChip: PlayerChip | undefined }) {
    return (
        <div
            className={`${styles.container} ${props.playerChip ? styles.container_visible : styles.container_none}`}
            style={{ backgroundImage: props.playerChip ? `url(${definePlayerChipIcon(props.playerChip)})` : 'none' }}
        />
    )
}

export default OwnerBackground;