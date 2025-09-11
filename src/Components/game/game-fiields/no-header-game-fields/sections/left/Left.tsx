import styles from './left.module.css'
import general from '../general.module.css'
import { IGameField } from '../../../../../../store/slices/games/interfaces/game-field';
import OwnerBackground from '../../../owner-backround/OwnerBackground';
import { defineGameFieldIcon } from '../../common/define-game-field-icon';
import Players, { GameFieldPlayerOrientation } from '../../../players/Players';

function Left(props: IGameField) {
    return (
        <div className={`${general.container} ${styles.container}`}>
            <span />
            <div className={general.game_field_name}>{props.name}</div>
            <img className={general.game_field_icon} alt={props.name} src={defineGameFieldIcon(props.type, props.name)}></img>
            <Players players={props.players} orientation={GameFieldPlayerOrientation.HORIZONTAL} />
            {props.owner?.chip && <OwnerBackground playerChip={props.owner?.chip} />}
        </div>
    )
}

export default Left;