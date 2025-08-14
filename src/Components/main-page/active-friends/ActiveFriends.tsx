import { useAppSelector } from '../../../hoocks/useAppSelector';
import ActiveFriendItem from './friend-item/ActiveFriendItem';
import styles from './active-friends.module.css'
import NoItems from '../no-items/NoItems';

function ActiveFriends() {
	const friendsState = useAppSelector(state => state.friends)

	return (
		<div className={styles.container}>
			{
				friendsState.activeFriends.length !== 0
					? friendsState.activeFriends.map(friend => <ActiveFriendItem {...friend} />)
					: <NoItems text={'Никто из друзей сейчас не в сети'} />
			}
		</div>
	)
}

export default ActiveFriends;