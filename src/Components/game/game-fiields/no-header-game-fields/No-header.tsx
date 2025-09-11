import { IGameField } from '../../../../store/slices/games/interfaces/game-field'
import { GameFieldSection } from '../enums/game-field-orientation'
import Bottom from './sections/bottom/Bottom'
import Left from './sections/left/Left'
import Top from './sections/top/Top'
import Right from './sections/right/Right'

function NoHeader(props: { orientation: GameFieldSection, fieldData: IGameField }) {
    switch (props.orientation) {
        case GameFieldSection.TOP: return <Top {...props.fieldData} />
        case GameFieldSection.RIGHT: return <Right {...props.fieldData} />
        case GameFieldSection.BOTTOM: return <Bottom {...props.fieldData} />
        case GameFieldSection.LEFT: return <Left {...props.fieldData} />
        default: return null
    }
}

export default NoHeader;