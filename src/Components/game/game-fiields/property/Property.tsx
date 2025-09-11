import { GameFieldOrientation } from '../enums/game-field-orientation'
import { IGameField } from '../../../../store/slices/games/interfaces/game-field';
import Top from './orientations/top/Top';
import Right from './orientations/right/Right';
import Bottom from './orientations/bottom/Bottom';
import Left from './orientations/left/Left';

function Property(props: { orientation: GameFieldOrientation, gameField: IGameField }) {
    switch (props.orientation) {
        case GameFieldOrientation.TOP: return <Top {...props.gameField} />
        case GameFieldOrientation.RIGHT: return <Right {...props.gameField} />
        case GameFieldOrientation.BOTTOM: return <Bottom {...props.gameField} />
        case GameFieldOrientation.LEFT: return <Left {...props.gameField} />
        default: return null
    }
}

export default Property;