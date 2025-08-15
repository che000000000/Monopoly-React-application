import { createPregameRoom } from '../../../../API/ws-thunks/pregame-rooms';
import { useAppDispatch } from '../../../../hoocks/useAppDispatch';
import NoItems from '../../no-items/NoItems';
import styles from './create-pregame-room.module.css'

function CreatePregameRoom() {
    const dispatch = useAppDispatch()

    const handleCreatePregameRoom = () => {
        dispatch(createPregameRoom())
    }

    return (
        <div className={styles.container}>
            <NoItems text={'Вы ещё не в лобби. Создайте или присоеднитесь'} />
            <button className={styles.create_btn} onClick={() => handleCreatePregameRoom()} >Создать лобби</button>
        </div>
    )
}

export default CreatePregameRoom;