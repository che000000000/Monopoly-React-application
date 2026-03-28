import styles from './game-dialogue.module.css'
import { useAppSelector } from '../../../../hoocks/useAppSelector';
import { GamesStateT } from '../../../../store/slices/games/types/games-state';
import { AuthStateT } from '../../../../store/slices/auth/types/auth-state';
import { IGameField } from '../../../../store/interfaces/game-field';
import { GamePaymentType, IGamePayment } from '../../../../store/interfaces/game-payment';
import Move from './actions/move/Move';
import BuyGameField from './actions/buy-game-field/BuyGameField';
import PayRent from './actions/pay-rent/PayRent';
import PayTax from './actions/pay-tax/PayTax';
import AtJail from './actions/at-jail/AtJail';
import BuyoutFromJail from './actions/buyout-from-jail/BuyoutFromJail';
import ActionCardShowtime from './action-card-showtime/ActionCardShowtime';
import ToBankPayment from './actions/to-bank-payment/ToBankPayment';
import GetPaymentFromPlayers from './actions/get-payment-from-players/GetPaymentFromPlayers';
import { IPlayer } from '../../../../store/interfaces/player';
import ToPlayersPayment from './actions/to-players-payment/ToPlayersPayment';

function GameDialogue() {
    const authState: AuthStateT = useAppSelector(state => state.auth)
    const gamesState: GamesStateT = useAppSelector(state => state.games)

    const currentGameState = gamesState.currentGame
    if (!authState.user) return null

    const myUserId = authState.user.id
    const turn = currentGameState.turn
    const currentPlayer = currentGameState.players.find(p => p.user.id === myUserId)

    const findCurrentGameFieldByPlayerId = (playerId: string): IGameField | undefined => {
        return currentGameState.fields.find(f =>
            f.players.some(p => p.id === playerId)
        )
    }

    const findGamePaymentPlayerIdAndType = (playerId: string, type: GamePaymentType): IGamePayment | undefined => {
        return currentGameState.turn.gamePayments.find(p => (p.payerPlayer.id === playerId && p.type === type))
    }

    const findAllActivePlayersExceptOnePlayerByPlayerId = (playerId: string): IPlayer[] => {
        return currentGameState.players.filter(p => p.id !== playerId && p.isActive)
    }

    return (
        <div className={styles.container}>
            <Move
                turn={turn}
                player={currentPlayer}
            />
            <BuyGameField
                turn={turn}
                player={currentPlayer}
                field={currentPlayer ? findCurrentGameFieldByPlayerId(currentPlayer.id) : undefined}
                payment={currentPlayer ? findGamePaymentPlayerIdAndType(currentPlayer.id, GamePaymentType.BUY_GAME_FIELD) : undefined}
            />
            <PayRent
                turn={turn}
                player={currentPlayer}
                field={currentPlayer ? findCurrentGameFieldByPlayerId(currentPlayer.id) : undefined}
                payment={currentPlayer ? findGamePaymentPlayerIdAndType(currentPlayer.id, GamePaymentType.PAY_RENT) : undefined}
            />
            <PayTax
                turn={turn}
                player={currentPlayer}
                field={currentPlayer ? findCurrentGameFieldByPlayerId(currentPlayer.id) : undefined}
                payment={currentPlayer ? findGamePaymentPlayerIdAndType(currentPlayer.id, GamePaymentType.PAY_TAX) : undefined}
            />
            <AtJail
                turn={turn}
                player={currentPlayer}
                payment={currentPlayer ? findGamePaymentPlayerIdAndType(currentPlayer.id, GamePaymentType.BUYOUT_FROM_JAIL) : undefined}
            />
            <BuyoutFromJail
                turn={turn}
                player={currentPlayer}
                payment={currentPlayer ? findGamePaymentPlayerIdAndType(currentPlayer.id, GamePaymentType.BUYOUT_FROM_JAIL) : undefined}
            />
            <ActionCardShowtime
                turn={turn}
                actionCard={turn.actionCard ?? undefined}
            />
            <ToBankPayment
                turn={turn}
                player={currentPlayer}
                payment={currentPlayer ? findGamePaymentPlayerIdAndType(currentPlayer.id, GamePaymentType.TO_BANK) : undefined}
            />
            <GetPaymentFromPlayers
                turn={turn}
                player={currentPlayer}
                payment={currentPlayer ? findGamePaymentPlayerIdAndType(currentPlayer.id, GamePaymentType.ONE_OF_TO_PLAYER) : undefined}
            />
            <ToPlayersPayment
                turn={turn}
                player={currentPlayer}
                payment={currentPlayer ? findGamePaymentPlayerIdAndType(currentPlayer.id, GamePaymentType.TO_PLAYERS) : undefined}
                receiversPlayers={currentPlayer ? findAllActivePlayersExceptOnePlayerByPlayerId(currentPlayer.id) : []}
            />
        </div>
    )
}

export default GameDialogue;