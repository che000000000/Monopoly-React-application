import { Link } from 'react-router-dom';
import styles from './pregame-room-member.module.css'
import no_avatar from '../../../../images/common/no-avatar.png'
import SelectedPlayerChip from '../selected-player-chip/SelectedPlayerChip';
import { UserT } from '../../../../store/types/auth';
import { PregameRoomMemberT } from '../../../../store/pregame-rooms/types/pregame-room-member';

function PregameRoomMember(props: { member: PregameRoomMemberT, authUser?: UserT | null }) {
    return (
        <div className={styles.container}>
            <SelectedPlayerChip playerChip={props.member.playerChip} />
            <Link to={`/${props.member.id}`} className={styles.user}>
                <img className={props.member.isOwner
                    ? `${styles.avatar} ${styles.owner_border}`
                    : `${styles.avatar}`}
                    alt='pregame-room-member-avatar'
                    src={props.member.user.avatarUrl ? props.member.user.avatarUrl : no_avatar}
                />
                <div className={styles.name}>{props.authUser?.id === props.member.user.id ? 'вы' : props.member.user.name}</div>
            </Link>
        </div>
    )
}

export default PregameRoomMember;