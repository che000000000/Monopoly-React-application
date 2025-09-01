import { useEffect } from 'react';
import { getPregameRoomMessagesPage, leavePregameRoom, sendPregameRoomMessage, setPregameRoomMemberSlot } from '../../../../../API/ws-thunks/pregame-rooms';
import { useAppDispatch } from '../../../../../hoocks/useAppDispatch';
import { UserT } from '../../../../../store/types/auth';
import MainPageChat from '../../../main-prage-chat/MainPageChat';
import EmptySlot from '../../empty-slot/EmptySlot';
import PregameRoomMember from '../../pregame-room-member/PregameRoomMember';
import CreatePregameRoom from '../create-pregame-room/CreatePregameRoom';
import styles from './current-pregame-room.module.css'
import { clearCurrentPregameRoomMessages } from '../../../../../store/pregame-rooms/pregame-rooms-slice';
import { startGame } from '../../../../../API/ws-thunks/games';
import { IPregameRoomMember } from '../../../../../store/pregame-rooms/interfaces/pregame-room-member';
import { IPregameRoom } from '../../../../../store/pregame-rooms/interfaces/pregame-room';
import { IPregameRoomMessage } from '../../../../../store/pregame-rooms/interfaces/pregame-room-message';

function CurrentPregameRoom(props: { pregameRoom: IPregameRoom, messages: IPregameRoomMessage[], authUser: UserT }) {
    const dispatch = useAppDispatch()

    const handleStartGame = () => {
        dispatch(startGame())
    }

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
                <button className={styles.options__start_game_btn} onClick={() => handleStartGame()}>Начать игру</button>
                <div className={styles.options__leave} onClick={() => handleLeavePregameRoom()}>Выйти</div>
            </div>
            <div className={styles.members_list}>
                {props.pregameRoom
                    ? Array.from({ length: 5 }).map((_, index) => {
                        const pregameRoomMember = props.pregameRoom?.members.find((member: IPregameRoomMember) => member.slot === index + 1)
                        return pregameRoomMember
                            ? <PregameRoomMember
                                member={pregameRoomMember}
                                authUser={props.authUser}
                            />
                            : <EmptySlot key={index + 1} slotNumber={index + 1} onClick={handleSetSlot} />
                    })
                    : <CreatePregameRoom />}
            </div>
            <MainPageChat messages={props.messages} authUser={props.authUser} onSend={handleSendMessage} />
        </div>
    )
}

export default CurrentPregameRoom;