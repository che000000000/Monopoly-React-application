import Property from '../game-fiields/Property/Property';
import styles from './game.module.css'

function game() {
  return (
    <div className={styles.container}>
      <div className={`${styles.section} ${styles.stop}`}>Остановка</div>
      <div className={`${styles.section} ${styles.top_section}`}>
        <Property orientation='top' color='#c02525ff' name='УЛ. ТВЕРСКАЯ'/>
        <Property orientation='top' color='#ffffffff' name='ШАНС'/>
        <Property orientation='top' color='#c02525ff' name='ПУШКИНСКАЯ УЛ.'/>
        <Property orientation='top' color='#c02525ff' name='ПЛОЩАДЬ МОЯКОВСКОГО'/>
        <Property orientation='top' color='#ffffffff' name='КАЗАНСКАЯ ЖЕЛЕЗНАЯ ДОРОГА'/>
        <Property orientation='top' color='#f0ec14ff' name='УЛ. ГРУЗИНСКИЙ ВАЛ'/>
        <Property orientation='top' color='#f0ec14ff' name='УЛ. ЧАЙКОВСКОГО'/>
        <Property orientation='top' color='#ffffffff' name='ВОДОПРОВОД'/>
        <Property orientation='top' color='#f0ec14ff' name='СМОЛЕНСКАЯ ПЛОЩАДЬ'/>
      </div>
      <div className={`${styles.section} ${styles.goto_prison}`}>В тюрьму</div>
      <div className={`${styles.section} ${styles.left_section}`}>
        <Property orientation='left' color='#f38823ff' name='РУБЛЕВСКОЕ ШОССЕ'/>
        <Property orientation='left' color='#f38823ff' name='УЛ. ВАВИЛОВА'/>
        <Property orientation='left' color='#ffffffff' name='ОБЩЕСТВЕННАЯ КАЗНА'/>
        <Property orientation='left' color='#f38823ff' name='РЯЗАНСКИЙ ПРОСПЕКТ'/>
        <Property orientation='left' color='#ffffffff' name='КУРСКАЯ ЖЕЛЕЗНАЯ ДОРОГА'/>
        <Property orientation='left' color='#cf2a5bff' name='РОСТОВСКАЯ НАБ.'/>
        <Property orientation='left' color='#cf2a5bff' name='УЛ. СРЕТЕНКА'/>
        <Property orientation='left' color='#ffffffff' name='ЭЛЕКТРОСТАНЦИЯ'/>
        <Property orientation='left' color='#cf2a5bff' name='УЛ. ПОЛЯНКА'/>
      </div>
      <div className={`${styles.section} ${styles.chat_section}`}>Секция чата</div>
      <div className={`${styles.section} ${styles.right_section}`}>
        <Property orientation='right' color='#1b7928ff' name='УЛ. ЩУСЕВА'/>
        <Property orientation='right' color='#1b7928ff' name='ГОГОЛЕВКИЙ БУЛЬВАР'/>
        <Property orientation='right' color='#ffffffff' name='ОБЩЕСТВЕННАЯ КАЗНА'/>
        <Property orientation='right' color='#1b7928ff' name='КУТУЗОВСКИЙ ПРОСПЕКТ'/>
        <Property orientation='right' color='#ffffffff' name='ЛЕНИНГРАДСКАЯ ЖЕЛЕЗНАЯ ДОРОГА'/>
        <Property orientation='right' color='#ffffffff' name='ШАНС'/>
        <Property orientation='right' color='#274abeff' name='УЛ. МАЛАЯ БРОННАЯ'/>
        <Property orientation='right' color='#ffffffff' name='СВЕРХНАЛОГ'/>
        <Property orientation='right' color='#274abeff' name='УЛ. АРБАТ'/>
      </div>
      <div className={`${styles.section} ${styles.forward_joly}`}>Посетить тюрьму</div>
      <div className={`${styles.section} ${styles.bottom_section}`}>
        <Property orientation='bottom' color='#b9d7ffff' name='ПЕРВАЯ ПАРКОВАЯ УЛ.'/>
        <Property orientation='bottom' color='#b9d7ffff' name='УЛ. ОГЕЕВА'/>
        <Property orientation='bottom' color='#ffffffff' name='ШАНС'/>
        <Property orientation='bottom' color='#b9d7ffff' name='ВАРШАВСКОЕ ШОССЕ'/>
        <Property orientation='bottom' color='#ffffffff' name='РИЖСКАЯ ЖЕЛЕЗНАЯ ДОРОГА'/>
        <Property orientation='bottom' color='#ffffffff' name='ПОДОХОДНЫЙ НАЛОГ'/>
        <Property orientation='bottom' color='#611212ff' name='НАГАТИНСКАЯ УЛ.'/>
        <Property orientation='bottom' color='#ffffffff' name='ОБЩЕСТВЕННАЯ КАЗНА'/>
        <Property orientation='bottom' color='#611212ff' name='ЖИТНАЯ УЛ.'/>
      </div>
      <div className={`${styles.section} ${styles.start}`}>Вперёд</div>
    </div>
  )
}

export default game;