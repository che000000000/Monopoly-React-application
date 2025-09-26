import styles from './builds-area.module.css';
import general from '../general.module.css';
import house_icon from '../../../../icons/game-builds/house.svg';
import hotel_icon from '../../../../icons/game-builds/hotel.svg';

export enum BuildAreaOrientation {
    VERTICAL = 'VERTICAL',
    HORIZONTAL = 'HORIZONTAL'
}

function BuildsArea(props: { buildsCount: number | null, orientation: BuildAreaOrientation }) {
    return (
        <div className={`${general.dynamic_area} ${props.orientation === BuildAreaOrientation.VERTICAL
            ? styles.builds_area_vertical
            : styles.builds_area_horizontal
            }`}>
            {props.buildsCount === 5
                ? <img className={styles.build_icon} alt='hotel' src={hotel_icon} />
                : Array.from({ length: props.buildsCount ? props.buildsCount : 0 }).map((_, index) =>
                    <img key={index} className={styles.build_icon} alt='house' src={house_icon} />
                )
            }
        </div>
    )
}

export default BuildsArea;