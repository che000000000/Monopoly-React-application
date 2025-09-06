import { useAppSelector } from '../../../../hoocks/useAppSelector';
import { AuthStateT } from '../../../../store/slices/auth/types/auth-state';
import { IPlayerPreview } from '../../../../store/slices/games/interfaces/player-prewiew';
import SelectedPlayerChip from '../../pregame-rooms/selected-player-chip/SelectedPlayerChip';
import styles from './player-item.module.css'
import no_avatar from '../../../../images/common/no-avatar.png'
import { PlayerStatus } from '../../../../store/enums/player-status';

function PlayerItem(props: { player: IPlayerPreview }) {
    const authState: AuthStateT = useAppSelector(state => state.auth)

    return (
        <div className={props.player.status !== PlayerStatus.IS_LEFT ? styles.container : `${styles.container} ${styles.container_is_left}`}>
            <SelectedPlayerChip playerChip={props.player.chip} />
            <div className={styles.user}>
                <img className={styles.avatar} alt={`${props.player.user.name}-avatar`} src={props.player.user.avatarUrl ? props.player.user.avatarUrl : no_avatar} />
                <div className={styles.name}>{props.player.user.id === authState.user?.id ? 'Вы' : props.player.user.name}</div>
            </div>
        </div>
    )
}

export default PlayerItem;