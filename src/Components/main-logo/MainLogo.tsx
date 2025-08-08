import styles from './main-logo.module.css'

export enum LogoTypes {
	MAIN,
	AUTH
}

function MainLogo(props: { type: LogoTypes }) {
	switch (props.type) {
		case LogoTypes.MAIN: return (
			<div className={styles.container}>
				<div className={`${styles.text} ${styles.text__main_type}`}>MONOPOLY</div>
			</div>
		) 
		case LogoTypes.AUTH: return (
			<div className={styles.container}>
				<div className={`${styles.text} ${styles.text__auth_type}`}>MONOPOLY</div>
			</div>
		)
	}
}

export default MainLogo;