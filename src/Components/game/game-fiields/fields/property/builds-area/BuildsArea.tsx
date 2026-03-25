import styles from './builds-area.module.css';
import house from '../../../../../../icons/game-builds/house.svg';
import hotel from '../../../../../../icons/game-builds/hotel.svg';

export enum BuildAreaOrientation {
    VERTICAL = 'VERTICAL',
    HORIZONTAL = 'HORIZONTAL'
}

function BuildsArea(props: { buildsCount: number | null, orientation: BuildAreaOrientation }) {
    return (
        <div className={`${props.orientation === BuildAreaOrientation.VERTICAL
            ? styles.builds_area_vertical
            : styles.builds_area_horizontal
            }`}>
            {props.buildsCount === 5
                ? <img
                    className={props.orientation !== BuildAreaOrientation.HORIZONTAL
                        ? styles.build_icon_vertical
                        : styles.build_icon_horizontal
                    }
                    src={hotel}
                    alt='hotel'
                />
                : Array.from({ length: props.buildsCount ? props.buildsCount : 0 }).map((_, index) =>
                    <img key={index}
                        className={
                            props.orientation !== BuildAreaOrientation.HORIZONTAL
                                ? styles.build_icon_vertical
                                : styles.build_icon_horizontal
                        }
                        src={house}
                        alt='house'
                    />
                )
            }
        </div>
    )
}

export default BuildsArea;