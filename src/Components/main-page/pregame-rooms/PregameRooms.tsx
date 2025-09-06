import { useEffect } from 'react';
import { useAppDispatch } from '../../../hoocks/useAppDispatch';
import { useAppSelector } from '../../../hoocks/useAppSelector';
import NoPregameRooms from '../no-items/NoItems';
import PregameRoom from './active-pregame-room/ActivePregameRoom';
import styles from './pregame-rooms.module.css'
import { getPregameRoomsPage } from '../../../API/ws-thunks/pregame-rooms';
import { PregameRoomsStateT } from '../../../store/slices/pregame-rooms/types/pregame-rooms-state';
import { IPregameRoom } from '../../../store/slices/pregame-rooms/interfaces/pregame-room';
import { clearPregameRooms } from '../../../store/slices/pregame-rooms/pregame-rooms-slice';

function PregameRooms() {
    const dispatch = useAppDispatch()
    const pregameRoomsState: PregameRoomsStateT = useAppSelector(state => state.pregameRooms)

    useEffect(() => {
        if (pregameRoomsState.isGatewayConnected) {
            dispatch(clearPregameRooms({}))
            dispatch(getPregameRoomsPage({ pageNumber: 1, pageSize: 12 }))
        }
    }, [pregameRoomsState.isGatewayConnected, dispatch])

    const activePregameRooms = pregameRoomsState.pregameRooms.pregameRoomsList.filter((room: IPregameRoom) => room.isCurrent !== true)

    return (
        <div className={styles.container}>
            <div className={styles.active_pregame_rooms_list}>
                {activePregameRooms.length !== 0
                    ? activePregameRooms.map(pregameRoom => {
                        if (pregameRoom.isCurrent === true) return null
                        else return <PregameRoom key={pregameRoom.id} pregameRoom={pregameRoom} authUser={pregameRoomsState.authUser} />
                    })
                    : <NoPregameRooms text='В данный момент активных лобби нет' />
                }
            </div>
        </div>
    )
}

export default PregameRooms;