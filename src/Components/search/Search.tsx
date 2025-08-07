import styles from './search.module.css'

function Search() {
  return (
    <div className={styles.container}>
      <input className={styles.imput} placeholder='Что вы хотите найти?...'/>
      <button className={styles.btn}>Поиск</button>
    </div>
  )
}

export default Search;