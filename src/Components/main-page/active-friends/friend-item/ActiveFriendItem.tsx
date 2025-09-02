import { Link } from 'react-router-dom';
import styles from './active-friend-item.module.css'
import { IUser } from '../../../../store/slices/auth/interfaces/user';

function ActiveFriendItem(props: IUser) {
    return (
        <Link to={`/profile/${props.id}`} className={styles.container}>
            <img className={styles.avatar} alt={`${props.name} avatar`} src={props.avatarUrl} />
            <div className={styles.name}>{props.name}</div>
        </Link>
    )
}

export default ActiveFriendItem;