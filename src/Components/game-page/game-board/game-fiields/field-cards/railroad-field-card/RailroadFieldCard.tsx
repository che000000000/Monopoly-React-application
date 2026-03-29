import styles from './railroad-field-card.module.css';
import general from '../general.module.css';
import { defineGameFieldIcon } from '../../fields/action-card-tax/common/define-game-field-icon';
import OwnerBackground from '../../owner-backround/OwnerBackground';
import { IGameField } from '../../../../../../store/interfaces/game-field';

function RailroadFieldCard(props: { field: IGameField, toggleCardVision: () => void }) {
    const { field } = props
    const fieldRents = field.rent ?? '???'
    const pledgePrice = field.basePrice ? field.basePrice / 2 : '???'

    return (
        <div className={general.container}>
            <div className={general.content}>
                <img className={styles.railroad_icon} src={defineGameFieldIcon(field.type, field.name)} alt='railroad-icon' />
                <div className={styles.title}>{field.name}</div>
                <ul className={styles.rent_list}>
                    <li className={styles.rent_item}>
                        <div>Арендная плата игроку, владеющему:</div>
                        <div>M{fieldRents[0]}</div>
                    </li>
                    <li className={styles.rent_item}>
                        <div>Двумя транспортыми объектами</div>
                        <div>M{fieldRents[1]}</div>
                    </li>
                    <li className={styles.rent_item}>
                        <div>Тремя транспортыми объектами</div>
                        <div>M{fieldRents[2]}</div>
                    </li>
                    <li className={styles.rent_item}>
                        <div>Четыремя транспортными объектами</div>
                        <div>M{fieldRents[3]}</div>
                    </li>
                </ul>
                <div className={styles.pledge}>
                    Залоговая стоимость М{pledgePrice}
                </div>
                <div className={general.options}>
                    <button className={`${general.btn} ${general.btn_red}`}>Заложить</button>
                </div>
            </div>
            <OwnerBackground playerChip={field.owner?.chip} />
        </div>
    )
}

export default RailroadFieldCard;