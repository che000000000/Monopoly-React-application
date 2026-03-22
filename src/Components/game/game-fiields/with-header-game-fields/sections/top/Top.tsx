import styles from './top.module.css';
import general from '../general.module.css';
import { IGameField } from '../../../../../../store/interfaces/game-field';
import BuildsArea, { BuildAreaOrientation } from '../../../builds-area/BuildsArea';
import Players, { GameFieldPlayerOrientation } from '../../../players/Players';
import OwnerBackground from '../../../owner-backround/OwnerBackground';
import PropertyFieldCard from '../../../field-cards/property-field-card/PropertyFieldCard';
import { useEffect, useRef, useState } from 'react';

function Top(props: IGameField) {
    const gameFieldColor = props.color ? props.color : '#fff'
    const [isFieldCardVisible, setIsFieldCardVisible] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const cardRef = useRef<HTMLDivElement>(null)

    const toggleCard = () => {
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

    return (
        <div
            ref={containerRef}
            className={`${general.container} ${styles.container}`}
            onClick={toggleCard}
        >
            <div className={styles.header} style={{ backgroundColor: gameFieldColor }}></div>
            <div className={`${general.content} ${styles.content}`}>
                <span />
                <div className={general.field_name}>{props.name}</div>
                <div className={general.field_price}>{`M${props.basePrice && Math.abs(props.basePrice)}`}</div>
                {props.owner?.chip && (
                    <OwnerBackground playerChip={props.owner.chip} />
                )}
            </div>
            <Players players={props.players} orientation={GameFieldPlayerOrientation.VERTICAL} />
            <BuildsArea buildsCount={props.buildsCount} orientation={BuildAreaOrientation.VERTICAL} />
            <div
                ref={cardRef}
                className={isFieldCardVisible 
                    ? `${general.field_card} ${styles.field_card}` 
                    : `${general.field_card} ${styles.field_card} ${general.field_card_hide}`}
                onClick={handleCardClick}
            >
                <PropertyFieldCard field={props} />
            </div>
        </div>
    )
}

export default Top;