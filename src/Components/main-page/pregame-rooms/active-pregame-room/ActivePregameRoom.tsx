import styles from './active-pregame-room.module.css'
import EmptySlot from './empty-slot/EmptySlot';
import { PregameRoomT } from '../../../../store/types/pregame-rooms';
import PregameRoomMember from '../pregame-room-member/PregameRoomMember';

function PregameRoom(props: { pregameRoom: PregameRoomT }) {
	return (
		<div className={styles.container}>
			<div className={styles.members_list}>
				{Array.from({ length: props.pregameRoom.members.length + 1 }).map((_, index) => {
					const member = props.pregameRoom.members[index] ? props.pregameRoom.members[index] : null
					return member ? (
						<PregameRoomMember key={member.id} {...member} />
					) : (
						<EmptySlot pregameRoomId={props.pregameRoom.id} />
					)
				})}
			</div>
		</div>
	)
}

export default PregameRoom;