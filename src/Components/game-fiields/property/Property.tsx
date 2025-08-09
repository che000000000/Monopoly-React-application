import { GameFieldT } from '../../../types/games'
import { GameFieldOrientation } from '../enums/game-field-orientation'
import house_icon from '../../../icons/field-builds/house.svg';
import hotel_icon from '../../../icons/field-builds/hotel.svg'
import styles from './property.module.css'

function Property(props: { orientation: GameFieldOrientation, fieldData: GameFieldT }) {
    const fieldColor = props.fieldData.color ? props.fieldData.color : '#fff'

    switch (props.orientation) {
        case GameFieldOrientation.TOP: return (
            <div className={`${styles.container} ${styles.top_container}`}>
                <div className={styles.top_header} style={{ backgroundColor: fieldColor }}></div>
                <div className={styles.vertical_field_name}>{props.fieldData.name}</div>
                <div className={styles.field_price}>{`M${props.fieldData.basePrice}`}</div>
                <div className={`${styles.vertical_dynamic_area} ${styles.top_players_area}`}></div>
                <div className={`${styles.vertical_dynamic_area} ${styles.top_builds_area}`}>
                    {props.fieldData.buildsCount === 5
                        ? <img className={styles.field_build} alt='hotel' src={hotel_icon} />
                        : Array.from({ length: props.fieldData.buildsCount ? props.fieldData.buildsCount : 0 }).map(build =>
                            <img className={styles.field_build} alt='house' src={house_icon} />
                        )
                    }
                </div>
            </div>
        )
        case GameFieldOrientation.RIGHT: return (
            <div className={`${styles.container} ${styles.right_container}`}>
                <div className={styles.field_price}>{`M${props.fieldData.basePrice}`}</div>
                <div className={styles.horizontal_field_name}>{props.fieldData.name}</div>
                <div className={styles.right_header} style={{ backgroundColor: fieldColor }}></div>
                <div className={`${styles.horizontal_dynamic_area} ${styles.right_players_area}`}></div>
                <div className={`${styles.horizontal_dynamic_area} ${styles.right_builds_area}`}>
                    {props.fieldData.buildsCount === 5
                        ? <img className={styles.field_build} alt='hotel' src={hotel_icon} />
                        : Array.from({ length: props.fieldData.buildsCount ? props.fieldData.buildsCount : 0 }).map(build =>
                            <img className={styles.field_build} alt='house' src={house_icon} />
                        )
                    }
                </div>
            </div>
        )
        case GameFieldOrientation.BOTTOM: return (
            <div className={`${styles.container} ${styles.bottom_container}`}>
                <div className={styles.field_price}>{`M${props.fieldData.basePrice}`}</div>
                <div className={styles.vertical_field_name}>{props.fieldData.name}</div>
                <div className={styles.bottom_header} style={{ backgroundColor: fieldColor }}></div>
                <div className={`${styles.vertical_dynamic_area} ${styles.bottom_players_area}`}></div>
                <div className={`${styles.vertical_dynamic_area} ${styles.bottom_builds_area}`}>
                    {props.fieldData.buildsCount === 5
                        ? <img className={styles.field_build} alt='hotel' src={hotel_icon} />
                        : Array.from({ length: props.fieldData.buildsCount ? props.fieldData.buildsCount : 0 }).map(build =>
                            <img className={styles.field_build} alt='house' src={house_icon} />
                        )
                    }
                </div>
            </div>
        )
        case GameFieldOrientation.LEFT: return (
            <div className={`${styles.container} ${styles.left_container}`}>
                <div className={styles.left_header} style={{ backgroundColor: fieldColor }}></div>
                <div className={styles.horizontal_field_name}>{props.fieldData.name}</div>
                <div className={styles.field_price}>{`M${props.fieldData.basePrice}`}</div>
                <div className={`${styles.horizontal_dynamic_area} ${styles.left_players_area}`}></div>
                <div className={`${styles.horizontal_dynamic_area} ${styles.left_builds_area}`}>
                    {props.fieldData.buildsCount === 5
                        ? <img className={styles.field_build} alt='hotel' src={hotel_icon} />
                        : Array.from({ length: props.fieldData.buildsCount ? props.fieldData.buildsCount : 0 }).map(build =>
                            <img className={styles.field_build} alt='house' src={house_icon} />
                        )
                    }
                </div>
            </div>
        )
        default: return (
            <div></div>
        )
    }
}

export default Property;