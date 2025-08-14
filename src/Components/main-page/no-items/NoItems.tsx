import styles from './no-items.module.css'

function NoItems(props: { text: string }) {
    return (
        <div className={styles.container}>
            <div className={styles.text}>
                {props.text}
            </div>
        </div>
    )
}

export default NoItems;