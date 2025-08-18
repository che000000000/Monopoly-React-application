import { useEffect } from 'react';
import { getPregameRoomMessagesPage, leavePregameRoom, sendPregameRoomMessage, setPregameRoomMemberSlot } from '../../../../../API/ws-thunks/pregame-rooms';
import { useAppDispatch } from '../../../../../hoocks/useAppDispatch';
import { UserT } from '../../../../../store/types/auth';
import { PregameRoomMessageT, PregameRoomMemberT, PregameRoomT } from '../../../../../store/types/pregame-rooms';
import MainPageChat from '../../../main-prage-chat/MainPageChat';
import EmptySlot from '../../empty-slot/EmptySlot';
import PregameRoomMember from '../../pregame-room-member/PregameRoomMember';
import CreatePregameRoom from '../create-pregame-room/CreatePregameRoom';
import styles from './current-pregame-room.module.css'
import { clearCurrentPregameRoomMessages } from '../../../../../store/pregame-rooms-slice';

function CurrentPregameRoom(props: { pregameRoom: PregameRoomT, messages: PregameRoomMessageT[], authUser: UserT }) {
    const dispatch = useAppDispatch()

    const handleLeavePregameRoom = () => {
        dispatch(leavePregameRoom())
        dispatch(clearCurrentPregameRoomMessages(null))
    }

    const handleSendMessage = (messageText: string) => {
        dispatch(sendPregameRoomMessage({ messageText }))
    }

    const handleSetSlot = (slotNumber: number) => {
        dispatch(setPregameRoomMemberSlot({ slot: slotNumber }))
    }

    useEffect(() => {
        dispatch(clearCurrentPregameRoomMessages(null))
        dispatch(getPregameRoomMessagesPage({ pageNumber: 1, pageSize: 12 }))
    }, [dispatch])

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
            <MainPageChat messages={props.messages} authUser={props.authUser} onSend={handleSendMessage} />
        </div>
    )
}

export default CurrentPregameRoom;