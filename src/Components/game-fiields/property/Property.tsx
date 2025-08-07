import styles from './property.module.css'

function Property(props: { orientation: string, color: string, name: string }) {
    switch (props.orientation) {
        case 'top': return (
            <div className={`${styles.container} ${styles.top_container}`}>
                <div className={styles.top_header} style={{ backgroundColor: props.color }}></div>
                <div className={styles.vertical_field_name}>{props.name}</div>
                <div className={styles.field_price}>M100</div>
            </div>
        )
        case 'right': return (
            <div className={`${styles.container} ${styles.right_container}`}>
                <div className={styles.field_price}>M100</div>
                <div className={styles.horizontal_field_name}>{props.name}</div>
                <div className={styles.right_header} style={{ backgroundColor: props.color }}></div>
            </div>
        )
        case 'bottom': return (
            <div className={`${styles.container} ${styles.bottom_container}`}>
                <div className={styles.field_price}>M100</div>
                <div className={styles.vertical_field_name}>{props.name}</div>
                <div className={styles.bottom_header} style={{ backgroundColor: props.color }}></div>
            </div>
        )
        case 'left': return (
            <div className={`${styles.container} ${styles.left_container}`}>
                <div className={styles.left_header} style={{ backgroundColor: props.color }}></div>
                <div className={styles.horizontal_field_name}>{props.name}</div>
                <div className={styles.field_price}>M100</div>
            </div>
        )
        default: return (
            <div></div>
        )
    }
}

export default Property;