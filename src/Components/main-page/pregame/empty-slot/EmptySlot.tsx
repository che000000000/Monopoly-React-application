import styles from './empty-slot.module.css'

function EmptySlot(props: { slotNumber: number }) {
    return (
        <div key={`empty-${props.slotNumber}`} className={styles.container}>
            <div className={styles.plus}>+</div>
            <div className={styles.text}>Выбрать</div>
        </div>
    )
}

export default EmptySlot;