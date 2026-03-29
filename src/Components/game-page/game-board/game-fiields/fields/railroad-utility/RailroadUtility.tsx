import styles from './styles/railroad-utility.module.css';
import top_section from './styles/top-section.module.css';
import right_section from './styles/right-section.module.css';
import bottom_section from './styles/bottom-section.module.css';
import left_section from './styles/left-section.module.css';
import { GameFieldSection } from '../../enums/game-field-orientation';
import { useEffect, useRef, useState } from 'react';
import { defineGameFieldIcon } from '../action-card-tax/common/define-game-field-icon';
import { IGameField } from '../../../../../../store/interfaces/game-field';
import CardByFieldType from '../action-card-tax/card-by-field-type/CardByFieldType';
import OwnerBackground from '../../owner-backround/OwnerBackground';

function RailroadUtility(props: { field: IGameField, section: GameFieldSection }) {
    const { field, section } = props

    const [isFieldCardVisible, setIsFieldCardVisible] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const cardRef = useRef<HTMLDivElement>(null)

    const toggleCardVision = () => {
        setIsFieldCardVisible(!isFieldCardVisible)
    }

    const handleCardClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const isOutsideContainer = containerRef.current && !containerRef.current.contains(event.target as Node)
            const isOutsideCard = cardRef.current && !cardRef.current.contains(event.target as Node)

            if (isFieldCardVisible && isOutsideContainer && isOutsideCard) {
                setIsFieldCardVisible(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isFieldCardVisible])

    switch (section) {
        case GameFieldSection.TOP: return (
            <div
                ref={containerRef}
                className={`${styles.container} ${top_section.container}`}
                onClick={toggleCardVision}
            >
                <div className={`${styles.content} ${top_section.content}`}>
                    <img className={`${styles.game_field_icon}`} alt={field.name} src={defineGameFieldIcon(field.type, field.name)}></img>
                    <div className={styles.game_field_name}>{field.name}</div>
                    <OwnerBackground playerChip={field.owner?.chip} />
                </div>
                <div
                    ref={cardRef}
                    className={isFieldCardVisible
                        ? `${styles.field_card} ${top_section.field_card}`
                        : `${styles.field_card} ${top_section.field_card} ${styles.field_card_hide}`}
                    onClick={handleCardClick}
                >
                    <CardByFieldType field={field} toggleCardVision={toggleCardVision}/>
                </div>
            </div>
        )
        case GameFieldSection.RIGHT: return (
            <div
                ref={containerRef}
                className={`${styles.container} ${right_section.container}`}
                onClick={toggleCardVision}
            >
                <div className={`${styles.content} ${right_section.content}`}>
                    <span />
                    <div className={`${styles.game_field_name} ${styles.horizontal_field_name}`}>{field.name}</div>
                    <img className={styles.game_field_icon} alt={field.name} src={defineGameFieldIcon(field.type, field.name)}></img>
                    <OwnerBackground playerChip={field.owner?.chip} />
                </div>
                <div
                    ref={cardRef}
                    className={isFieldCardVisible
                        ? `${styles.field_card} ${right_section.field_card}`
                        : `${styles.field_card} ${right_section.field_card} ${styles.field_card_hide}`}
                    onClick={handleCardClick}
                >
                    <CardByFieldType field={field} toggleCardVision={toggleCardVision} />
                </div>
            </div>
        )
        case GameFieldSection.BOTTOM: return (
            <div className={styles.container}>
                <div
                    ref={containerRef}
                    className={`${styles.container} ${bottom_section.container}`}
                    onClick={toggleCardVision}
                >
                    <div className={`${styles.content} ${bottom_section.content}`}>
                        <img className={styles.game_field_icon} alt={field.name} src={defineGameFieldIcon(field.type, field.name)}></img>
                        <div className={`${styles.game_field_name} ${styles.horizontal_field_name}`}>{field.name}</div>
                    <OwnerBackground playerChip={field.owner?.chip} />
                    </div>
                    <div
                        ref={cardRef}
                        className={isFieldCardVisible
                            ? `${styles.field_card} ${bottom_section.field_card}`
                            : `${styles.field_card} ${bottom_section.field_card} ${styles.field_card_hide}`}
                        onClick={handleCardClick}
                    >
                        <CardByFieldType field={field} toggleCardVision={toggleCardVision}/>
                    </div>
                </div>
            </div>
        )
        case GameFieldSection.LEFT: return (
            <div
                ref={containerRef}
                className={`${styles.container} ${left_section.container}`}
                onClick={toggleCardVision}
            >
                <div className={`${styles.content} ${left_section.content}`}>
                    <span />
                    <div className={styles.game_field_name}>{field.name}</div>
                    <img className={styles.game_field_icon} alt={field.name} src={defineGameFieldIcon(field.type, field.name)}></img>
                    <OwnerBackground playerChip={field.owner?.chip} />
                </div>
                <div
                    ref={cardRef}
                    className={isFieldCardVisible
                        ? `${styles.field_card} ${left_section.field_card}`
                        : `${styles.field_card} ${left_section.field_card} ${styles.field_card_hide}`}
                    onClick={handleCardClick}
                >
                    <CardByFieldType field={field} toggleCardVision={toggleCardVision}/>
                </div>
            </div>
        )
        default: return null
    }
}


export default RailroadUtility;