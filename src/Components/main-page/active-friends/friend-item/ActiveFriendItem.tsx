import { Link } from 'react-router-dom';
import styles from './active-friend-item.module.css'
import { UserT } from '../../../../types/auth';

function ActiveFriendItem(props: UserT) {
    return (
        <Link to={`/profile/${props.id}`} className={styles.container}>
            <img className={styles.avatar} src={props.avatarUrl} />
            <div className={styles.name}>{props.name}</div>
        </Link>
    )
}

export default ActiveFriendItem;