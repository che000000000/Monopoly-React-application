import styles from './game-dialogue.module.css'
import { useAppSelector } from '../../../../hoocks/useAppSelector';
import { GamesStateT } from '../../../../store/slices/games/types/games-state';
import { AuthStateT } from '../../../../store/slices/auth/types/auth-state';
import { GameTurnStage } from '../../../../store/interfaces/game-turn';
import { IPlayer } from '../../../../store/interfaces/player';
import { IGameField } from '../../../../store/interfaces/game-field';
import { GamePaymentType, IGamePayment } from '../../../../store/interfaces/game-payment';
import Move from './actions/move/Move';
import BuyGameField from './actions/buy-game-field/BuyGameField';
import PayRent from './actions/pay-rent/PayRent';
import ActionCard from './action-card/ActionCard';
import AtJail from './actions/at-jail/AtJail';
import PayTax from './actions/pay-tax/PayTax';
import BuyoutFromJail from './actions/buyout-from-jail/BuyoutFromJail';
import PayMoney from './actions/payments/pay-money/PayMoney';
import PayPlayers from './actions/payments/pay-players/PayPlayers';

function GameDialogue() {
    const authState: AuthStateT = useAppSelector(state => state.auth)
    const gamesState: GamesStateT = useAppSelector(state => state.games)

    const currentGameState = gamesState.currentGame
    if (!authState.user) return null

    const myUserId = authState.user.id
    const currentTurnUserId = currentGameState.turn.player.user.id
    const turnStage = currentGameState.turn.stage

    const findCurrentGameField = (player: IPlayer): IGameField | undefined => {
        return currentGameState.fields.find(f =>
            f.players.some(p => p.id === player.id)
        )
    }

    const findGamePaymentByUserIdAndType = (userId: string, type: GamePaymentType): IGamePayment | undefined => {
        return currentGameState.turn.gamePayments.find(p => (p.payerPlayer.user.id === userId && p.type === type))
    }

    const displayError = (message: string): JSX.Element => {
        return (
            <div className={styles.container}>
                {message}
            </div>
        )
    }

    switch (turnStage) {
        case GameTurnStage.MOVE: {
            if (myUserId === currentTurnUserId) {
                return (
                    <div className={styles.container}>
                        <Move />
                    </div>
                )
            } return null
        }
        case GameTurnStage.BUY_GAME_FIELD: {
            if (myUserId === currentTurnUserId) {
                const field = findCurrentGameField(currentGameState.turn.player)
                const payment = findGamePaymentByUserIdAndType(myUserId, GamePaymentType.BUY_GAME_FIELD)

                if (field && payment) {
                    return (
                        <div className={styles.container}>
                            <BuyGameField { ...{ field, payment }} />
                        </div>
                    )
                } else {
                    return displayError(`Не удалось отобразить покупку поля. field: ${field}; payment: ${payment}.`)
                }
            } return null
        }
        case GameTurnStage.PAY_RENT: {
            if (myUserId === currentTurnUserId) {
                const field = findCurrentGameField(currentGameState.turn.player)
                const payment = findGamePaymentByUserIdAndType(myUserId, GamePaymentType.PAY_RENT)

                if (field && payment) {
                    return (
                        <div className={styles.container}>
                            <PayRent {...{ field, payment }}/>
                        </div>
                    )
                } else {
                    return displayError(`Не удалось обработать оплату ренты. field: ${field}; payment: ${payment}.`)
                }
            } return null
        }
        case GameTurnStage.PAY_TAX: {
            if (myUserId === currentTurnUserId) {
                const field = findCurrentGameField(currentGameState.turn.player)
                const payment = findGamePaymentByUserIdAndType(myUserId, GamePaymentType.PAY_TAX)

                if (field && payment) {
                    return (
                        <div className={styles.container}>
                            <PayTax {...{ field, payment }} />
                        </div>
                    )
                } else {
                    return displayError(`Не удалось обработать оплату ренты. field: ${field}; payment: ${payment}.`)
                }
            } return null
        }
        case GameTurnStage.AT_JAIL: {
            if (myUserId === currentTurnUserId) {
                const payment = findGamePaymentByUserIdAndType(myUserId, GamePaymentType.BUYOUT_FROM_JAIL)

                if (payment) {
                    return (
                        <div className={styles.container}>
                            <AtJail {...{ payment }} />
                        </div>
                    )
                } else {
                    return displayError(`Не удалось обработать прибывание в тюрьме. Платёж не найден.`)
                }
            } return null
        }
        case GameTurnStage.BUYOUT_FROM_JAIL: {
            if (myUserId === currentTurnUserId) {
                const payment = findGamePaymentByUserIdAndType(myUserId, GamePaymentType.BUYOUT_FROM_JAIL)

                if (payment) {
                    return (
                        <div className={styles.container}>
                            <BuyoutFromJail {...{ payment }} />
                        </div>
                    )
                } else {
                    return displayError(`Не удалось обработать стадию платежа за выход из тюрьмы. Платёж не найден.`)
                }
            } return null
        }
        case GameTurnStage.PAY_MONEY: {
            if (myUserId === currentTurnUserId) {
                const payment = findGamePaymentByUserIdAndType(myUserId, GamePaymentType.TO_BANK)
                if (payment) {
                    return (
                        <div className={styles.container}>
                            <PayMoney {...{ payment }} />
                        </div>
                    )
                } else return (
                    displayError(`Не удалось обработать платеж. Платёж не найден.`)
                )
            } return null
        }
        case GameTurnStage.PAY_PLAYERS: {
            if (myUserId === currentTurnUserId) {
                const payment = findGamePaymentByUserIdAndType(myUserId, GamePaymentType.TO_PLAYERS)
                const receiversPlayers = currentGameState.players.filter(p => p.user.id !== myUserId && p.isActive)

                if (payment && receiversPlayers.length !== 0) {
                    return (
                        <div className={styles.container}>
                            <PayPlayers {...{ payment, receiversPlayers }} />
                        </div>
                    )
                } else return (
                    displayError(`Не удалось обработать платеж. Платёж не найден или не найдены получатели.`)
                )
            } return null
        }
        case GameTurnStage.ACTION_CARD_SHOWTIME: {
            const actionCard = currentGameState.turn.actionCard
            if (actionCard) {
                return (
                    <div className={styles.container}>
                        <ActionCard {...actionCard} />
                    </div>
                )
            }
            return displayError(`Не удалось отобразить активную карту.`)
        }
        default: return null
    }
}

export default GameDialogue;