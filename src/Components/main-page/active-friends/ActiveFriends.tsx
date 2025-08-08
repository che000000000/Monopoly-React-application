import { useAppSelector } from '../../../hoocks/useAppSelector';
import ActiveFriendItem from './friend-item/ActiveFriendItem';
import styles from './active-friends.module.css'

function ActiveFriends() {
	const friendsState = useAppSelector(state => state.friends)

	return (
		<div className={styles.container}>
			{
				friendsState.friends.length !== 0
					? friendsState.friends.map(friend => <ActiveFriendItem {...friend} />)
					: <div className={styles.no_friends_container}>{`У вас пока ещё нет друзей((`}</div>
			}
		</div>
	)
}

export default ActiveFriends;