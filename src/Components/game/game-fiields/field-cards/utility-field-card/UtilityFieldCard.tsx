import styles from './utility-field-card.module.css';
import general from '../general.module.css'
import { IGameField } from '../../../../../store/interfaces/game-field';
import { defineGameFieldIcon } from '../../fields/action-card-tax/common/define-game-field-icon';
import OwnerBackground from '../../owner-backround/OwnerBackground';

function UtilityFieldCard(props: { field: IGameField }) {
    const { field } = props

    const pledgePrice = field.basePrice ? field.basePrice / 2 : '???'

    return (
        <div className={general.container}>
            <div className={general.content}>
                <img className={styles.icon} src={defineGameFieldIcon(field.type, field.name)} alt='utility-icon' />
                <div className={styles.title}>{field.name}</div>
                <ul className={styles.text_list}>
                    <li className={styles.text_item}>
                        Если игрок владеет одним «Коммунальным предприятием», арендная плата составляет четырех кратную сумму очков, выпавших на кубиках.
                    </li>
                    <li className={styles.text_item}>
                        Если в собственности игрока находятся оба «Коммунальных предприятия», арендная плата составляет десятикратную сумму очков, выпавших на кубиках.
                    </li>
                </ul>
                <div className={styles.pledge}>Залоговая стоимость M{pledgePrice}</div>
                <div className={general.options}>
                    <button className={`${general.btn} ${general.btn_red}`}>Заложить</button>
                </div>
            </div>
            <OwnerBackground playerChip={field.owner?.chip} />
        </div>
    )
}

export default UtilityFieldCard;