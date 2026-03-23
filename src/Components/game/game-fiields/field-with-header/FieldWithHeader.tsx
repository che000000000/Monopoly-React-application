import styles from './styles/field-with-header.module.css';
import top_section_field from './styles/top-section-field.module.css';
import right_section_field from './styles/right_section-field.module.css';
import left_section_field from './styles/left_section_field.module.css';
import bottom_section_field from './styles/bottom-section-field.module.css';
import { GameFieldSection } from '../enums/game-field-orientation'
import { IGameField } from '../../../../store/interfaces/game-field';
import { useEffect, useRef, useState } from 'react';
import PropertyFieldCard from '../field-cards/property-field-card/PropertyFieldCard';
import BuildsArea, { BuildAreaOrientation } from '../builds-area/BuildsArea';
import Players, { GameFieldPlayerOrientation } from '../players/Players';
import OwnerBackground from '../owner-backround/OwnerBackground';

function FieldWithHeader(props: { section: GameFieldSection, field: IGameField }) {
    const { section, field } = props

    const gameFieldColor = field.color ? field.color : '#fff'
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

    switch (section) {
        case GameFieldSection.TOP: return (
            <div
                ref={containerRef}
                className={`${styles.container} ${top_section_field.container}`}
                onClick={toggleCard}
            >
                <div className={top_section_field.header} style={{ backgroundColor: gameFieldColor }}></div>
                <div className={`${styles.content} ${top_section_field.content}`}>
                    <span />
                    <div className={styles.field_name}>{field.name}</div>
                    <div className={styles.field_price}>{`M${field.basePrice && Math.abs(field.basePrice)}`}</div>
                    {field.owner?.chip && (
                        <OwnerBackground playerChip={field.owner.chip} />
                    )}
                </div>
                <Players players={field.players} orientation={GameFieldPlayerOrientation.VERTICAL} />
                <BuildsArea buildsCount={field.buildsCount} orientation={BuildAreaOrientation.VERTICAL} />
                <div
                    ref={cardRef}
                    className={isFieldCardVisible
                        ? `${styles.field_card} ${top_section_field.field_card}`
                        : `${styles.field_card} ${top_section_field.field_card} ${styles.field_card_hide}`}
                    onClick={handleCardClick}
                >
                    <PropertyFieldCard field={field} />
                </div>
            </div>
        )
        case GameFieldSection.RIGHT: return (
            <div
                ref={containerRef}
                className={`${styles.container} ${right_section_field.container}`}
                onClick={toggleCard}
            >
                <div className={`${styles.content} ${right_section_field.content}`}>
                    <div className={styles.field_price}>{`M${field.basePrice && Math.abs(field.basePrice)}`}</div>
                    <div className={styles.field_name}>{field.name}</div>
                    <span />
                    {field.owner?.chip && (
                        <OwnerBackground playerChip={field.owner.chip} />
                    )}
                </div>
                <div className={right_section_field.header} style={{ backgroundColor: gameFieldColor }}></div>
                <Players players={field.players} orientation={GameFieldPlayerOrientation.HORIZONTAL} />
                <BuildsArea buildsCount={field.buildsCount} orientation={BuildAreaOrientation.HORIZONTAL} />
                <div
                    ref={cardRef}
                    className={isFieldCardVisible
                        ? `${styles.field_card} ${right_section_field.field_card}`
                        : `${styles.field_card} ${right_section_field.field_card} ${styles.field_card_hide}`}
                    onClick={handleCardClick}
                >
                    <PropertyFieldCard field={field} />
                </div>
            </div>
        )
        case GameFieldSection.BOTTOM: return (
            <div
                ref={containerRef}
                className={`${styles.container} ${bottom_section_field.container}`}
                onClick={toggleCard}
            >
                <div className={`${styles.content} ${bottom_section_field.content}`}>
                    <div className={styles.field_price}>{`M${field.basePrice && Math.abs(field.basePrice)}`}</div>
                    <div className={styles.field_name}>{field.name}</div>
                    <span />
                    {field.owner?.chip && (
                        <OwnerBackground playerChip={field.owner.chip} />
                    )}
                </div>
                <div className={bottom_section_field.header} style={{ backgroundColor: gameFieldColor }}></div>
                <Players players={field.players} orientation={GameFieldPlayerOrientation.VERTICAL} />
                <BuildsArea buildsCount={field.buildsCount} orientation={BuildAreaOrientation.VERTICAL} />
                <div
                    ref={cardRef}
                    className={isFieldCardVisible
                        ? `${styles.field_card} ${bottom_section_field.field_card}`
                        : `${styles.field_card} ${bottom_section_field.field_card} ${styles.field_card_hide}`}
                    onClick={handleCardClick}
                >
                    <PropertyFieldCard field={field} />
                </div>
            </div>
        )
        case GameFieldSection.LEFT: return (
            <div
                ref={containerRef}
                className={`${styles.container} ${left_section_field.container}`}
                onClick={toggleCard}
            >
                <div className={left_section_field.header} style={{ backgroundColor: gameFieldColor }}></div>
                <div className={`${styles.content} ${left_section_field.content}`}>
                    <span />
                    <div className={styles.field_name}>{field.name}</div>
                    <div className={styles.field_price}>{`M${field.basePrice && Math.abs(field.basePrice)}`}</div>
                    {field.owner?.chip && (
                        <OwnerBackground playerChip={field.owner.chip} />
                    )}
                </div>
                <Players players={field.players} orientation={GameFieldPlayerOrientation.HORIZONTAL} />
                <BuildsArea buildsCount={field.buildsCount} orientation={BuildAreaOrientation.HORIZONTAL} />
                <div
                    ref={cardRef}
                    className={isFieldCardVisible
                        ? `${styles.field_card} ${left_section_field.field_card}`
                        : `${styles.field_card} ${left_section_field.field_card} ${styles.field_card_hide}`}
                    onClick={handleCardClick}
                >
                    <PropertyFieldCard field={field} />
                </div>
            </div>
        )
        default: return null
    }
}

export default FieldWithHeader;