import styles from './special.module.css'

function Special(props: { orientation: string }) {
    switch (props.orientation) {
        case 'top': return (
            <div className={styles.top_container}>
                <div className={styles.vertical_header}></div>
                <div className={styles.field_name}>УЛ. ТВЕРСКАЯ</div>
                <div className={styles.field_price}>M100</div>
            </div>
        )
    }
}

export default Special;