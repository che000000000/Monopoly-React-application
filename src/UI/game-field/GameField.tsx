import styles from './game-field.module.css'

function GameField(props: { name: string }) {
    return (
        <div className={props.name ? styles.container : styles.empty_container}>
            <div className={styles.container_color}></div>
            <div className={styles.container_name}>
                {props.name}
            </div>
        </div>
    )
}

export default GameField;