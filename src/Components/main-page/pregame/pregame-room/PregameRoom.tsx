import styles from './pregame-room.module.css'
import { type PregameRoomT } from '../../../../types/pregame-rooms';
import PregameRoomMember from './pregame-room-member/PregameRoomMember';
import EmptySlot from '../empty-slot/EmptySlot';

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
						<EmptySlot slotNumber={slotNumber}/>
					)
				})}
			</div>
		</div>
	)
}

export default PregameRoom;