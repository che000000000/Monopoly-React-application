import styles from './pregame-room.module.css'
import PregameRoomMember from './pregame-room-member/PregameRoomMember';
import EmptySlot from './empty-slot/EmptySlot';
import { PregameRoomT } from '../../../../store/types/pregame-rooms';

function PregameRoom(props: { pregameRoom: PregameRoomT }) {
	return (
		<div className={styles.container}>
			<div className={styles.members_list}>
				{Array.from({ length: props.pregameRoom.members.length + 1 }).map((_, index) => {
					const slotNumber = index + 1
					const member = props.pregameRoom.members[index] ? props.pregameRoom.members[index] : null

					return member ? (
						<PregameRoomMember key={member.id} {...member} />
					) : (
						<EmptySlot slotNumber={slotNumber}/>
					)
				})}
			</div>
		</div>
	)
}

export default PregameRoom;