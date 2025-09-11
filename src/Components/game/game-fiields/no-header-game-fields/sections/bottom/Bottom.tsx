import { IGameField } from '../../../../../../store/slices/games/interfaces/game-field';
import OwnerBackground from '../../../owner-backround/OwnerBackground';
import Players, { GameFieldPlayerOrientation } from '../../../players/Players';
import { defineGameFieldIcon } from '../../common/define-game-field-icon';
import styles from './bottom.module.css'
import general from '../general.module.css'

function Bottom(props: IGameField) {
    return (
        <div className={`${general.container} ${styles.container}`}>
            <img className={general.game_field_icon} alt={props.name} src={defineGameFieldIcon(props.type, props.name)}></img>
            <div className={`${general.game_field_name} ${styles.horizontal_field_name}`}>{props.name}</div>
            <Players players={props.players} orientation={GameFieldPlayerOrientation.VERTICAL} />
            {props.owner?.chip && <OwnerBackground playerChip={props.owner?.chip} />}
        </div>
    )
}

export default Bottom;