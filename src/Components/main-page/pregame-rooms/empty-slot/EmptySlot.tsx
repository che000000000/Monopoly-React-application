import SelectedPlayerChip from '../selected-player-chip/SelectedPlayerChip';
import styles from './empty-slot.module.css'

function EmptySlot(props: { slotNumber: number, onClick: (slotNumber: number) => void }) {
    return (
        <div className={styles.container}>
            <SelectedPlayerChip playerChip={null}/>
            <div className={styles.action} onClick={() => props.onClick(props.slotNumber)}>
                <div className={styles.plus}>+</div>
                <div className={styles.text}>Выбрать</div>
            </div>
        </div>
    )
}

export default EmptySlot;