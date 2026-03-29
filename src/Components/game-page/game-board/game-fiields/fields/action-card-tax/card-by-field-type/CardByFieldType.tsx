import { GameFieldType, IGameField } from "../../../../../../../store/interfaces/game-field";
import RailroadFieldCard from "../../../field-cards/railroad-field-card/RailroadFieldCard";
import UtilityFieldCard from "../../../field-cards/utility-field-card/UtilityFieldCard";

function CardByFieldType(props: { field: IGameField, toggleCardVision: () => void }) {
    const { field, toggleCardVision } = props

    switch (field.type) {
        case GameFieldType.RAILROAD: return (
            <RailroadFieldCard field={field} toggleCardVision={toggleCardVision} />
        )
        case GameFieldType.UTILITY: return (
            <UtilityFieldCard field={field} />
        )
        default: return null
    }
}

export default CardByFieldType;