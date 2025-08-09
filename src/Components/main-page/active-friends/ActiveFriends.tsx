import { useAppSelector } from '../../../hoocks/useAppSelector';
import ActiveFriendItem from './friend-item/ActiveFriendItem';
import styles from './active-friends.module.css'

function ActiveFriends() {
	const friendsState = useAppSelector(state => state.friends)

	return (
		<div className={styles.container}>
			{
				friendsState.activeFriends.length !== 0
					? friendsState.activeFriends.map(friend => <ActiveFriendItem {...friend} />)
					: <div className={styles.no_friends_container}>{`Никто из друзей сейчас не в сети`}</div>
			}
		</div>
	)
}

export default ActiveFriends;