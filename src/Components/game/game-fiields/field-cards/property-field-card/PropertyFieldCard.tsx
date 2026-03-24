import styles from './property-field-card.module.css'
import general from '../general.module.css'
import { IGameField } from '../../../../../store/interfaces/game-field';
import OwnerBackground from '../../owner-backround/OwnerBackground';
import { AppDispatch } from '../../../../../store';
import { useAppDispatch } from '../../../../../hoocks/useAppDispatch';
import { buildOnTheField } from '../../../../../API/ws-thunks/games';
import { GamesStateT } from '../../../../../store/slices/games/types/games-state';
import { AuthStateT } from '../../../../../store/slices/auth/types/auth-state';
import { useAppSelector } from '../../../../../hoocks/useAppSelector';
import { GamePaymentType, IGamePayment } from '../../../../../store/interfaces/game-payment';

function PropertyFieldCard(props: { field: IGameField }) {
    const dispatch: AppDispatch = useAppDispatch()
    const gamesState: GamesStateT = useAppSelector(state => state.games)
    const authState: AuthStateT = useAppSelector(state => state.auth)

    const { field } = props

    const myUserId = authState.user?.id
    const myPlayer = gamesState.currentGame.players.find(p => p.user.id === myUserId)

    let myBuildingPropertyPayments: IGamePayment[] = []
    if (myPlayer) {
        const buildingPropertyPayments = gamesState.currentGame.turn.gamePayments.filter(gp => gp.type === GamePaymentType.PROPERTY_BUILDING)
        myBuildingPropertyPayments = buildingPropertyPayments.filter(gp => gp.payerPlayer.id === myPlayer.id)
    }
    const currentBuildingPayment = myBuildingPropertyPayments.find(gp => field.id === gp.buildingPropertyGameField?.id)

    const gameFieldColor = field.color ? field.color : '#fff'
    const fieldRents = field.rent ?? '???'
    const housePrice = field.housePrice
    const pledgePrice = field.basePrice ? field.basePrice / 2 : '???'

    const handleBuild = () => {
        dispatch(buildOnTheField(field.id))
    }

    return (
        <div className={general.container}>
            <div className={general.content}>
                <div className={styles.title_container} style={{ backgroundColor: gameFieldColor }}>
                    <div className={styles.title}>{field.name}</div>
                </div>
                <div className={styles.base_rent}>
                    Арендная плата за участок: M{fieldRents[0]}
                </div>
                <ul className={styles.build_rents}>
                    <li className={styles.build_rent}>
                        <div className={styles.build_rent__text}>С одним домом</div>
                        <div>M{fieldRents[1]}</div>
                    </li>
                    <li className={styles.build_rent}>
                        <div className={styles.build_rent__text}>С двумя домами</div>
                        <div>M{fieldRents[2]}</div>
                    </li>
                    <li className={styles.build_rent}>
                        <div className={styles.build_rent__text}>С тремя домами</div>
                        <div>M{fieldRents[3]}</div>
                    </li>
                    <li className={styles.build_rent}>
                        <div className={styles.build_rent__text}>С четыремя домами</div>
                        <div>M{fieldRents[4]}</div>
                    </li>
                    <li className={styles.build_rent}>
                        <div className={styles.build_rent__text}>С одним ОТЕЛЕМ</div>
                        <div>M{fieldRents[5]}</div>
                    </li>
                </ul>
                <div className={styles.pledge}>
                    Залоговая стоимость M{pledgePrice}
                </div>
                <div className={styles.build_prices}>
                    <div className={styles.house_price}>
                        Стоимость каждого дома составляет M{housePrice}.
                    </div>
                    <div className={styles.hotel_price}>
                        Стоимость отелей: цена за один отель в размере M{housePrice} всесте с 4 домами.
                    </div>
                </div>
                <div className={general.options}>
                    <button
                        className={`${general.btn} ${general.btn_green}`}
                        onClick={handleBuild}
                        disabled={!currentBuildingPayment || !myPlayer || !housePrice || myPlayer.balance < housePrice}
                    >
                        Построить
                    </button>
                    <button className={`${general.btn} ${general.btn_red}`}>Заложить</button>
                </div>
            </div>
            {field.owner?.chip && (
                <OwnerBackground playerChip={field.owner.chip} />
            )}
        </div>
    )
}

export default PropertyFieldCard;