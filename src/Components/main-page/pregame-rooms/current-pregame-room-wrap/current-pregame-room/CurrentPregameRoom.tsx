import { leavePregameRoom, setPregameRoomMemberSlot } from '../../../../../API/ws-thunks/pregame-rooms';
import { useAppDispatch } from '../../../../../hoocks/useAppDispatch';
import { pushMessage } from '../../../../../store/pregame-rooms-slice';
import { UserT } from '../../../../../store/types/auth';
import { CurrentPregameRoomChatMessageT, PregameRoomMemberT, PregameRoomT } from '../../../../../store/types/pregame-rooms';
import MainPageChat from '../../../main-prage-chat/MainPageChat';
import EmptySlot from '../../empty-slot/EmptySlot';
import PregameRoomMember from '../../pregame-room-member/PregameRoomMember';
import CreatePregameRoom from '../create-pregame-room/CreatePregameRoom';
import styles from './current-pregame-room.module.css'

function CurrentPregameRoom(props: { pregameRoom: PregameRoomT, messages: CurrentPregameRoomChatMessageT[], authUser: UserT | null }) {
    const dispatch = useAppDispatch()

    const handleLeavePregameRoom = () => {
        dispatch(leavePregameRoom())
    }

    const handleSendMessage = (message: CurrentPregameRoomChatMessageT) => {
        dispatch(pushMessage(message))
    }

    const handleSetSlot = (slotNumber: number) => {
        dispatch(setPregameRoomMemberSlot({ slot: slotNumber }))
    }

    return (
        <div className={styles.container}>
            <div className={styles.options}>
                <div className={styles.options__select_chip}></div>
                <div className={styles.options__leave} onClick={() => handleLeavePregameRoom()}>Выйти</div>
            </div>
            <div className={styles.members_list}>
                {props.pregameRoom
                    ? Array.from({ length: 5 }).map((_, index) => {
                        const pregameRoomMember = props.pregameRoom?.members.find((member: PregameRoomMemberT) => member.slot === index + 1)
                        return pregameRoomMember
                            ? <PregameRoomMember member={pregameRoomMember} authUser={props.authUser} />
                            : <EmptySlot key={index + 1} slotNumber={index + 1} onClick={handleSetSlot} />
                    })
                    : <CreatePregameRoom />}
            </div>
            <MainPageChat messages={props.messages} onSend={handleSendMessage} />
        </div>
    )
}

export default CurrentPregameRoom;