import styles from './bottom.module.css';
import general from '../general.module.css';
import { IGameField } from '../../../../../../store/slices/games/interfaces/game-field';
import BuildsArea, { BuildAreaOrientation } from '../../../builds-area/BuildsArea';
import Players, { GameFieldPlayerOrientation } from '../../../players/Players';
import OwnerBackground from '../../../owner-backround/OwnerBackground';

function Bottom(props: IGameField) {
    const gameFieldColor = props.color ? props.color : '#fff'

    return (
        <div className={`${general.container} ${styles.container}`}>
            <div className={`${general.content} ${styles.content}`}>
                <div className={general.field_price}>{`M${props.basePrice}`}</div>
                <div className={general.field_name}>{props.name}</div>
                <span />
                {props.owner?.chip && (
                    <OwnerBackground playerChip={props.owner.chip} />
                )}
            </div>
            <div className={styles.header} style={{ backgroundColor: gameFieldColor }}></div>
            <Players players={props.players} orientation={GameFieldPlayerOrientation.VERTICAL} />
            <BuildsArea buildsCount={props.buildsCount} orientation={BuildAreaOrientation.VERTICAL} />
        </div>
    )
}

export default Bottom;