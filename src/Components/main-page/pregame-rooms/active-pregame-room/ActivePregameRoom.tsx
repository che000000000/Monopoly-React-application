import styles from './active-pregame-room.module.css'
import PregameRoomMember from '../pregame-room-member/PregameRoomMember';
import EmptySlot from '../empty-slot/EmptySlot';
import { useAppDispatch } from '../../../../hoocks/useAppDispatch';
import { joinPregameRoom } from '../../../../API/ws-thunks/pregame-rooms';
import { UserT } from '../../../../store/types/auth';
import { PregameRoomMemberT } from '../../../../store/pregame-rooms/types/pregame-room-member';
import { PregameRoomT } from '../../../../store/pregame-rooms/types/pregame-room';

function ActivePregameRoom(props: { pregameRoom: PregameRoomT, authUser: UserT | null }) {
	const dispatch = useAppDispatch()

	const handleJoinPregameRoom = (slotNumber: number) => {
		dispatch(joinPregameRoom({ pregameRoomId: props.pregameRoom.id, slot: slotNumber }))
	}

	return (
		<div className={styles.container}>
			<div className={styles.members_list}>
				{Array.from({ length: 5 }).map((_, index) => {
					const pregameRoomMember = props.pregameRoom.members.find((member: PregameRoomMemberT) => member.slot === index + 1)
					return pregameRoomMember
						? <PregameRoomMember key={pregameRoomMember.id} member={pregameRoomMember} />
						: <EmptySlot key={index + 1} slotNumber={index + 1} onClick={handleJoinPregameRoom} />
				})}
			</div>
		</div>
	)
}

export default ActivePregameRoom;