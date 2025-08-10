import styles from './game-builds.module.css'
import house_icon from '../../../icons/game-builds/house.svg'
import hotel_icon from '../../../icons/game-builds/hotel.svg'

function GameBuilds(props: { housesCount: number, hotelsCount: number }) {
    return (
        <div className={styles.container}>
            <div className={styles.hollow}>
                <ul className={`${styles.builds_list} ${styles.houses_list}`}>
                    {Array.from({ length: props.housesCount }).map(_ => <img className={`${styles.build_icon} ${styles.house_icon}`} alt='house' src={house_icon} />)}
                </ul>
                <ul className={`${styles.builds_list} ${styles.hotels_list}`}>
                    {Array.from({ length: props.hotelsCount }).map(_ => <img className={`${styles.build_icon} ${styles.house_icon}`} alt='hotel' src={hotel_icon} />)}
                </ul>
            </div>
        </div>
    )
}

export default GameBuilds;