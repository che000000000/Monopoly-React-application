import styles from './styles/field-without-header.module.css';
import top_section_field from './styles/top-section-field.module.css';
import right_section_field from './styles/right-section-field.module.css';
import left_section_field from './styles/left-section-field.module.css';
import bottom_section_field from './styles/bottom-section-field.module.css';
import { GameFieldType, IGameField } from '../../../../store/interfaces/game-field';
import { GameFieldSection } from '../enums/game-field-orientation';
import { useEffect, useRef, useState } from 'react';
import { defineGameFieldIcon } from './common/define-game-field-icon';
import Players, { GameFieldPlayerOrientation } from '../players/Players';
import OwnerBackground from '../owner-backround/OwnerBackground';
import CardByFieldType from './card-by-field-type/CardByFieldType';

function FieldWithoutHeader(props: { orientation: GameFieldSection, field: IGameField }) {
    const { orientation, field } = props

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

    switch (orientation) {
        case GameFieldSection.TOP: return (
            <div
                ref={containerRef}
                className={field.type === GameFieldType.RAILROAD || field.type === GameFieldType.UTILITY
                    ? `${styles.container} ${styles.container_cursor} ${top_section_field.container}`
                    : `${styles.container} ${top_section_field.container}`
                }
                onClick={toggleCard}
            >
                <div className={`${styles.content} ${top_section_field.content}`}>
                    <img className={`${styles.game_field_icon}`} alt={field.name} src={defineGameFieldIcon(field.type, field.name)}></img>
                    <div className={styles.game_field_name}>{field.name}</div>
                    <Players players={field.players} orientation={GameFieldPlayerOrientation.VERTICAL} />
                    {field.owner?.chip && <OwnerBackground playerChip={field.owner.chip} />}
                </div>
                <div
                    ref={cardRef}
                    className={isFieldCardVisible
                        ? `${styles.field_card} ${top_section_field.field_card}`
                        : `${styles.field_card} ${top_section_field.field_card} ${styles.field_card_hide}`}
                    onClick={handleCardClick}
                >
                    <CardByFieldType field={field} />
                </div>
            </div>
        )
        case GameFieldSection.RIGHT: return (
            <div
                ref={containerRef}
                className={field.type === GameFieldType.RAILROAD || field.type === GameFieldType.UTILITY
                    ? `${styles.container} ${styles.container_cursor} ${right_section_field.container}`
                    : `${styles.container} ${right_section_field.container}`
                }
                onClick={toggleCard}
            >
                <div className={`${styles.content} ${right_section_field.content}`}>
                    <span />
                    <div className={`${styles.game_field_name} ${styles.horizontal_field_name}`}>{field.name}</div>
                    <img className={styles.game_field_icon} alt={field.name} src={defineGameFieldIcon(field.type, field.name)}></img>
                    <Players players={field.players} orientation={GameFieldPlayerOrientation.HORIZONTAL} />
                    {field.owner?.chip && <OwnerBackground playerChip={field.owner.chip} />}
                </div>
                <div
                    ref={cardRef}
                    className={isFieldCardVisible
                        ? `${styles.field_card} ${right_section_field.field_card}`
                        : `${styles.field_card} ${right_section_field.field_card} ${styles.field_card_hide}`}
                    onClick={handleCardClick}
                >
                    <CardByFieldType field={field} />
                </div>
            </div>
        )
        case GameFieldSection.BOTTOM: return (
            <div className={styles.container}>
                <div
                    ref={containerRef}
                    className={field.type === GameFieldType.RAILROAD || field.type === GameFieldType.UTILITY
                        ? `${styles.container} ${styles.container_cursor} ${bottom_section_field.container}`
                        : `${styles.container} ${bottom_section_field.container}`
                    }
                    onClick={toggleCard}
                >
                    <div className={`${styles.content} ${bottom_section_field.content}`}>
                        <img className={styles.game_field_icon} alt={field.name} src={defineGameFieldIcon(field.type, field.name)}></img>
                        <div className={`${styles.game_field_name} ${styles.horizontal_field_name}`}>{field.name}</div>
                        <Players players={field.players} orientation={GameFieldPlayerOrientation.VERTICAL} />
                        {field.owner?.chip && <OwnerBackground playerChip={field.owner.chip} />}
                    </div>
                    <div
                        ref={cardRef}
                        className={isFieldCardVisible
                            ? `${styles.field_card} ${bottom_section_field.field_card}`
                            : `${styles.field_card} ${bottom_section_field.field_card} ${styles.field_card_hide}`}
                        onClick={handleCardClick}
                    >
                        <CardByFieldType field={field} />
                    </div>
                </div>
            </div>
        )
        case GameFieldSection.LEFT: return (
            <div
                ref={containerRef}
                className={field.type === GameFieldType.RAILROAD || field.type === GameFieldType.UTILITY
                    ? `${styles.container} ${styles.container_cursor} ${left_section_field.container}`
                    : `${styles.container} ${left_section_field.container}`
                }
                onClick={toggleCard}
            >
                <div className={`${styles.content} ${left_section_field.content}`}>
                    <span />
                    <div className={styles.game_field_name}>{field.name}</div>
                    <img className={styles.game_field_icon} alt={field.name} src={defineGameFieldIcon(field.type, field.name)}></img>
                    <Players players={field.players} orientation={GameFieldPlayerOrientation.HORIZONTAL} />
                    {field.owner?.chip && <OwnerBackground playerChip={field.owner.chip} />}
                </div>
                <div
                    ref={cardRef}
                    className={isFieldCardVisible
                        ? `${styles.field_card} ${left_section_field.field_card}`
                        : `${styles.field_card} ${left_section_field.field_card} ${styles.field_card_hide}`}
                    onClick={handleCardClick}
                >
                    <CardByFieldType field={field} />
                </div>
            </div>
        )
        default: return null
    }
}

export default FieldWithoutHeader;