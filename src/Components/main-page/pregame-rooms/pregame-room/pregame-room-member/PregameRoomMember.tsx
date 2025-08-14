import { Link } from 'react-router-dom';
import styles from './pregame-room-member.module.css'
import { PregameRoomMemberT } from '../../../../../store/types/pregame-rooms';
import no_avatar from '../../../../../images/common/no-avatar.jpg'

function PregameRoomMember(props: PregameRoomMemberT ) {
    return (
        <Link to={`/${props.id}`} className={styles.container}>
            <img className={props.isOwner ? `${styles.avatar} ${styles.owner_border}` : `${styles.avatar}`} alt='pregame-room-member-avatar' src={props.avatarUrl ? props.avatarUrl : no_avatar} />
            <div className={styles.username}>{props.name}</div>
        </Link>
    )
}

export default PregameRoomMember;