import { GameFieldSection } from '../enums/game-field-orientation'
import { IGameField } from '../../../../store/slices/games/interfaces/game-field';
import Top from './sections/top/Top';
import Right from './sections/right/Right';
import Bottom from './sections/bottom/Bottom';
import Left from './sections/left/Left';

function WithHeader(props: { section: GameFieldSection, gameField: IGameField }) {
    switch (props.section) {
        case GameFieldSection.TOP: return <Top {...props.gameField} />
        case GameFieldSection.RIGHT: return <Right {...props.gameField} />
        case GameFieldSection.BOTTOM: return <Bottom {...props.gameField} />
        case GameFieldSection.LEFT: return <Left {...props.gameField} />
        default: return null
    }
}

export default WithHeader;