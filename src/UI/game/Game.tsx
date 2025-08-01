import Angle, { AngleTypes } from '../game-fiields/Angle/Angle';
import Property from '../game-fiields/Property/Property';
import RandomEvent, { RandomEvents } from '../game-fiields/random-events/RandomEvent';
import GameHeader from '../game-header/GameHeader';
import styles from './game.module.css'

function game() {
  return (
    <div className={styles.container}>
      <div className={`${styles.section} ${styles.stop}`}>
        <Angle type={AngleTypes.FREE_PARKING} />
      </div>
      <div className={`${styles.section} ${styles.top_section}`}>
        <Property orientation='top' color='#c02525ff' name='УЛ. ТВЕРСКАЯ' />
        <RandomEvent orientation='top' type={RandomEvents.CHANCE} name='ШАНС' />
        <Property orientation='top' color='#c02525ff' name='ПУШКИНСКАЯ УЛ.' />
        <Property orientation='top' color='#c02525ff' name='ПЛОЩАДЬ МОЯКОВСКОГО' />
        <RandomEvent orientation='top' type={RandomEvents.RAILROAD} name='КЗАНСКАЯ ЖЕЛЕЗНАЯ ДОРОГА' />
        <Property orientation='top' color='#f0ec14ff' name='УЛ. ГРУЗИНСКИЙ ВАЛ' />
        <Property orientation='top' color='#f0ec14ff' name='УЛ. ЧАЙКОВСКОГО' />
        <RandomEvent orientation='top' type={RandomEvents.UTILITY} name='ВОДОПРОВОД' />
        <Property orientation='top' color='#f0ec14ff' name='СМОЛЕНСКАЯ ПЛОЩАДЬ' />
      </div>
      <div className={`${styles.section} ${styles.goto_prison}`}>
        <Angle type={AngleTypes.JAIL} />
      </div>
      <div className={`${styles.section} ${styles.left_section}`}>
        <Property orientation='left' color='#f38823ff' name='РУБЛЕВСКОЕ ШОССЕ' />
        <Property orientation='left' color='#f38823ff' name='УЛ. ВАВИЛОВА' />
        <RandomEvent orientation='left' type={RandomEvents.COMMUNITY_CHEST} name='ОБЩЕСТВЕННАЯ КАЗНА' />
        <Property orientation='left' color='#f38823ff' name='РЯЗАНСКИЙ ПРОСПЕКТ' />
        <RandomEvent orientation='left' type={RandomEvents.RAILROAD} name='КУРСКАЯ ЖЕЛЕЗНАЯ ДОРОГА' />
        <Property orientation='left' color='#cf2a5bff' name='РОСТОВСКАЯ НАБ.' />
        <Property orientation='left' color='#cf2a5bff' name='УЛ. СРЕТЕНКА' />
        <RandomEvent orientation='left' type={RandomEvents.UTILITY} name='ЭЛЕКТРИЧЕСТВО' />
        <Property orientation='left' color='#cf2a5bff' name='УЛ. ПОЛЯНКА' />
      </div>
      <div className={`${styles.section} ${styles.chat_section}`}>
        <GameHeader />
      </div>
      <div className={`${styles.section} ${styles.right_section}`}>
        <Property orientation='right' color='#1b7928ff' name='УЛ. ЩУСЕВА' />
        <Property orientation='right' color='#1b7928ff' name='ГОГОЛЕВКИЙ БУЛЬВАР' />
        <RandomEvent orientation='right' type={RandomEvents.COMMUNITY_CHEST} name='ОБЩЕСТВЕННАЯ КАЗНА' />
        <Property orientation='right' color='#1b7928ff' name='КУТУЗОВСКИЙ ПРОСПЕКТ' />
        <RandomEvent orientation='right' type={RandomEvents.RAILROAD} name='ЛЕНИНГРАДСКАЯ ЖЕЛЕЗНАЯ ДОРОГА' />
        <RandomEvent orientation='right' type={RandomEvents.CHANCE} name='ШАНС' />
        <Property orientation='right' color='#274abeff' name='УЛ. МАЛАЯ БРОННАЯ' />
        <RandomEvent orientation='right' type={RandomEvents.TAX} name='СВЕРХНАЛОГ' />
        <Property orientation='right' color='#274abeff' name='УЛ. АРБАТ' />
      </div>
      <div className={`${styles.section} ${styles.forward_joly}`}>
        <Angle type={AngleTypes.JUST_VISITING} />
      </div>
      <div className={`${styles.section} ${styles.bottom_section}`}>
        <Property orientation='bottom' color='#b9d7ffff' name='ПЕРВАЯ ПАРКОВАЯ УЛ.' />
        <Property orientation='bottom' color='#b9d7ffff' name='УЛ. ОГЕЕВА' />
        <RandomEvent orientation='bottom' type={RandomEvents.CHANCE} name='ШАНС' />
        <Property orientation='bottom' color='#b9d7ffff' name='ВАРШАВСКОЕ ШОССЕ' />
        <RandomEvent orientation='bottom' type={RandomEvents.RAILROAD} name='РИЖСКАЯ ЖЕЛЕЗНАЯ ДОРОГА' />
        <RandomEvent orientation='bottom' type={RandomEvents.TAX} name='ПОДОХОДНЫЙ НАЛОГ' />
        <Property orientation='bottom' color='#831717ff' name='НАГАТИНСКАЯ УЛ.' />
        <RandomEvent orientation='bottom' type={RandomEvents.COMMUNITY_CHEST} name='ОБЩЕСТВЕННАЯ КАЗНА' />
        <Property orientation='bottom' color='#831717ff' name='ЖИТНАЯ УЛ.' />
      </div>
      <div className={`${styles.section} ${styles.start}`}>
        <Angle type={AngleTypes.GO} />
      </div>
    </div>
  )
}

export default game;