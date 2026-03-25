import { GameFieldType, IGameField } from "../../../../../../store/interfaces/game-field";
import PropertyFieldCard from "../../../field-cards/property-field-card/PropertyFieldCard";
import RailroadFieldCard from "../../../field-cards/railroad-field-card/RailroadFieldCard";
import UtilityFieldCard from "../../../field-cards/utility-field-card/UtilityFieldCard";

function CardByFieldType(props: { field: IGameField }) {
    const { field } = props

    switch (field.type) {
        case GameFieldType.RAILROAD: return (
            <RailroadFieldCard field={field} />
        )
        case GameFieldType.UTILITY: return (
            <UtilityFieldCard field={field} />
        )
        case GameFieldType.PROPERTY: return (
            <PropertyFieldCard field={field} />
        )
        default: return null
    }
}

export default CardByFieldType;