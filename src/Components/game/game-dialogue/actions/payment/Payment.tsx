import common from '../common.module.css'
import { useAppDispatch } from '../../../../../hoocks/useAppDispatch';
import { AppDispatch } from '../../../../../store';
import { acceptPayment } from '../../../../../API/ws-thunks/games';
import { GamePaymentType, IGamePayment } from '../../../../../store/interfaces/game-payment';

const defindGamePaymentText = (payment: IGamePayment): string => {
    switch (payment.type) {
        case GamePaymentType.BUY_GAME_FIELD: {
            return `Вы попали на свободное поле, у вас есть возможность купить его за ${payment.amount}M.`
        }
        case GamePaymentType.PAY_TAX: {
            return `Вы попале на поле налога и должны заплатить государству ${payment.amount}M.`
        }
        case GamePaymentType.PAY_RENT: {
            return `Вы попали на чужую собственность и должны заплатить ренту, в размере ${payment.amount}M игроку ${payment.receiverPaymentPlayer?.user.name}.`
        }
        default: return `Не удалось отобразить текст.`
    }
}

function Payment(props: IGamePayment) {
    const dispatch: AppDispatch = useAppDispatch()
    
    const handleAcceptPayment = () => {
        dispatch(acceptPayment(props.id))
    }

    return (
        <div className={common.container}>
            <div className={common.text}>
                {
                    defindGamePaymentText(props)
                }
            </div>
            <div className={common.options}>
                <button className={`${common.btn} ${common.btn_green}`} onClick={() => handleAcceptPayment()}>Заплатить</button>
                {props.isOptional
                    ? <button className={`${common.btn} ${common.btn_red}`}>Отказаться</button>
                    : <button className={`${common.btn} ${common.btn_red}`}>Сдаться</button>}
            </div>
        </div>
    )
}

export default Payment;