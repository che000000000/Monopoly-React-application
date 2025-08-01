import styles from './angle.module.css'
import go_arrow from '../../../icons/go_arrow.svg'
import just_visiting from '../../../icons/just_visiting.svg'
import free_parking from '../../../icons/free_parking.svg'
import jail from '../../../icons/jail.svg'

export enum AngleTypes {
    GO = 'GO',
    JUST_VISITING = 'JUST_VISITING',
    FREE_PARKING = 'FREE_PARKING',
    JAIL = 'JAIL'
}

function Angle(props: { type: AngleTypes }) {
    switch (props.type) {
        case AngleTypes.GO: return (
            <div className={styles.container}>
                <div className={styles.go_description}>ПОЛУЧИТЕ ЗАРПЛАТУ M200. КОГДА ВЫ ПРОХОДИТЕ ЭТО ПОЛЕ.</div>
                <div className={styles.go_name}>ВПЕРЕД</div>
                <img className={styles.go_icon} src={go_arrow}></img>
            </div>
        )
        case AngleTypes.JUST_VISITING: return (
            <div className={styles.container}>
                <div className={styles.name}>ПРОСТО</div>
                <img className={styles.icon} src={just_visiting}></img>
                <div className={styles.name}>ПОСЕТИЛИ</div>
            </div>
        )
        case AngleTypes.FREE_PARKING: return (
            <div className={styles.container}>
                <div className={styles.name}>БЕСПЛАТНАЯ</div>
                <img className={styles.icon} src={free_parking}></img>
                <div className={styles.name}>ПАРКОВКА</div>
            </div>
        )
        case AngleTypes.JAIL: return (
            <div className={styles.container}>
                <div className={styles.name}>ОТПРАВЛЯЙТЕСЬ</div>
                <img className={styles.icon} src={jail}></img>
                <div className={styles.name}>В ТЮРЬМУ</div>
            </div>
        )
        default: return (
            <div></div>
        )
    }
}

export default Angle;