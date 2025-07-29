import styles from './nav-bar.module.css'

function NavBar() {
    return (
        <ul className={styles.nav_list}>
            <li className={styles.nav_item}>Играть</li>
            <li className={styles.nav_item}>Сообщения</li>
            <li className={styles.nav_item}>Друзья</li>
            <li className={styles.nav_item}>Магазин</li>
            <li className={styles.nav_item}>Обновления</li>
        </ul>
    )
}

export default NavBar;   