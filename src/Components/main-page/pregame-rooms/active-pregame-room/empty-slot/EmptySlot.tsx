import { joinPregameRoom } from '../../../../../API/ws-thunks/pregame-rooms';
import { useAppDispatch } from '../../../../../hoocks/useAppDispatch';
import styles from './empty-slot.module.css'

function EmptySlot(props: { pregameRoomId: string }) {
    const dispatch = useAppDispatch()

    return (
        <div key={props.pregameRoomId} className={styles.container} onClick={() => dispatch(joinPregameRoom(props.pregameRoomId))}>
            <div className={styles.plus}>+</div>
            <div className={styles.text}>Подключиться</div>
        </div>
    )
}

export default EmptySlot;