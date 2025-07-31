import Property from '../game-fiields/Property/Property';
import Special, { SpecialTypes } from '../game-fiields/Special/Special';
import styles from './game.module.css'

function game() {
  return (
    <div className={styles.container}>
      <div className={`${styles.section} ${styles.stop}`}>Бесплатная стоянка</div>
      <div className={`${styles.section} ${styles.top_section}`}>
        <Property orientation='top' color='#c02525ff' name='УЛ. ТВЕРСКАЯ' />
        <Special orientation='top' type={SpecialTypes.CHANCE} name='ШАНС' />
        <Property orientation='top' color='#c02525ff' name='ПУШКИНСКАЯ УЛ.' />
        <Property orientation='top' color='#c02525ff' name='ПЛОЩАДЬ МОЯКОВСКОГО' />
        <Special orientation='top' type={SpecialTypes.RAILROAD} name='КЗАНСКАЯ ЖЕЛЕЗНАЯ ДОРОГА' />
        <Property orientation='top' color='#f0ec14ff' name='УЛ. ГРУЗИНСКИЙ ВАЛ' />
        <Property orientation='top' color='#f0ec14ff' name='УЛ. ЧАЙКОВСКОГО' />
        <Special orientation='top' type={SpecialTypes.UTILITY} name='ВОДОПРОВОД' />
        <Property orientation='top' color='#f0ec14ff' name='СМОЛЕНСКАЯ ПЛОЩАДЬ' />
      </div>
      <div className={`${styles.section} ${styles.goto_prison}`}>В тюрьму</div>
      <div className={`${styles.section} ${styles.left_section}`}>
        <Property orientation='left' color='#f38823ff' name='РУБЛЕВСКОЕ ШОССЕ'/>
        <Property orientation='left' color='#f38823ff' name='УЛ. ВАВИЛОВА'/>
        <Special orientation='left' type={SpecialTypes.COMMUNITY_CHEST} name='ОБЩЕСТВЕННАЯ КАЗНА'/>
        <Property orientation='left' color='#f38823ff' name='РЯЗАНСКИЙ ПРОСПЕКТ'/>
        <Special orientation='left' type={SpecialTypes.RAILROAD} name='КУРСКАЯ ЖЕЛЕЗНАЯ ДОРОГА'/>
        <Property orientation='left' color='#cf2a5bff' name='РОСТОВСКАЯ НАБ.'/>
        <Property orientation='left' color='#cf2a5bff' name='УЛ. СРЕТЕНКА'/>
        <Special orientation='left' type={SpecialTypes.UTILITY} name='ЭЛЕКТРИЧЕСТВО'/>
        <Property orientation='left' color='#cf2a5bff' name='УЛ. ПОЛЯНКА'/>
      </div>
      <div className={`${styles.section} ${styles.chat_section}`}>Секция чата</div>
      <div className={`${styles.section} ${styles.right_section}`}>
        <Property orientation='right' color='#1b7928ff' name='УЛ. ЩУСЕВА'/>
        <Property orientation='right' color='#1b7928ff' name='ГОГОЛЕВКИЙ БУЛЬВАР'/>
        <Special orientation='right' type={SpecialTypes.COMMUNITY_CHEST} name='ОБЩЕСТВЕННАЯ КАЗНА'/>
        <Property orientation='right' color='#1b7928ff' name='КУТУЗОВСКИЙ ПРОСПЕКТ'/>
        <Special orientation='right' type={SpecialTypes.RAILROAD} name='ЛЕНИНГРАДСКАЯ ЖЕЛЕЗНАЯ ДОРОГА'/>
        <Special orientation='right' type={SpecialTypes.CHANCE} name='ШАНС'/>
        <Property orientation='right' color='#274abeff' name='УЛ. МАЛАЯ БРОННАЯ'/>
        <Special orientation='right' type={SpecialTypes.TAX} name='СВЕРХНАЛОГ'/>
        <Property orientation='right' color='#274abeff' name='УЛ. АРБАТ'/>
      </div>
      <div className={`${styles.section} ${styles.forward_joly}`}>Посетить тюрьму</div>
      <div className={`${styles.section} ${styles.bottom_section}`}>
        <Property orientation='bottom' color='#b9d7ffff' name='ПЕРВАЯ ПАРКОВАЯ УЛ.'/>
        <Property orientation='bottom' color='#b9d7ffff' name='УЛ. ОГЕЕВА'/>
        <Special orientation='bottom' type={SpecialTypes.CHANCE} name='ШАНС'/>
        <Property orientation='bottom' color='#b9d7ffff' name='ВАРШАВСКОЕ ШОССЕ'/>
        <Special orientation='bottom' type={SpecialTypes.RAILROAD} name='РИЖСКАЯ ЖЕЛЕЗНАЯ ДОРОГА'/>
        <Special orientation='bottom' type={SpecialTypes.TAX} name='ПОДОХОДНЫЙ НАЛОГ'/>
        <Property orientation='bottom' color='#831717ff' name='НАГАТИНСКАЯ УЛ.'/>
        <Special orientation='bottom' type={SpecialTypes.COMMUNITY_CHEST} name='ОБЩЕСТВЕННАЯ КАЗНА'/>
        <Property orientation='bottom' color='#831717ff' name='ЖИТНАЯ УЛ.'/>
      </div>
      <div className={`${styles.section} ${styles.start}`}>Вперёд</div>
    </div>
  )
}

export default game;