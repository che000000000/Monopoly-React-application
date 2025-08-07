import styles from './pregame-room.module.css'
import { type PregameRoomT } from '../../types/pregameRooms';
import PregameRoomMember from '../pregame-room-member/PregameRoomMember';

function PregameRoom(props: { pregameRoom: PregameRoomT }) {
	const totalSlots = 5

	return (
		<div className={styles.container}>
			<div className={styles.members_list}>
				{Array.from({ length: totalSlots }).map((_, index) => {
					const slotNumber = index + 1
					const member = props.pregameRoom.members.find(m => m.slot === slotNumber)

					return member ? (
						<PregameRoomMember key={member.id} {...member} />
					) : (
						<div key={`empty-${slotNumber}`} className={styles.empty_slot_container}>
							<div className={styles.empty_slot_container}>+</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default PregameRoom;