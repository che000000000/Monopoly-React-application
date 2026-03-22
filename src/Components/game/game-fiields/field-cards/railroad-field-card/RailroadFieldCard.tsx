import styles from './railroad-field-card.module.css'
import general from '../general.module.css'
import { IGameField } from '../../../../../store/interfaces/game-field';

function RailroadFieldCard(props: { field: IGameField }) {
    const { field } = props

    return (
        <div className={general.container}>
            <div className={general.content}>

            </div>
        </div>
    )
}

export default RailroadFieldCard;