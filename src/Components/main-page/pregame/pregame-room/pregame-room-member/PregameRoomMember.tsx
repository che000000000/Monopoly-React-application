import { Link } from 'react-router-dom';
import { type PregameRoomMemberT } from '../../../../../types/pregame-rooms';
import styles from './pregame-room-member.module.css'

function PregameRoomMember(props: PregameRoomMemberT ) {
    return (
        <Link to={`/${props.id}`} className={styles.container}>
            <img className={styles.avatar} alt='pregame-room-member-avatar' src={props.avatarUrl} />
            <div className={styles.username}>{props.name}</div>
        </Link>
    )
}

export default PregameRoomMember;