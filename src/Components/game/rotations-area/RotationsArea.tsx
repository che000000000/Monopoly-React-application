import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { IPlayer } from '../../../store/interfaces/player';
import { definePlayerChipIcon } from '../../../common/define-player-chip';
import styles from './rotations-area.module.css';
import { useAppSelector } from '../../../hoocks/useAppSelector';
import { GamesStateT } from '../../../store/slices/games/types/games-state';

interface ChipPosition {
    playerId: string,
    position: number,
    x: number,
    y: number,
    chip: string,
    name: string
}

interface FieldRect {
    position: number,
    centerX: number,
    centerY: number,
    width: number,
    height: number
}

const calculatePlayerPositions = (
    playerCount: number,
    index: number,
    fieldWidth: number,
    fieldHeight: number,
    fieldType: 'corner' | 'horizontal' | 'vertical'
): { x: number; y: number } => {
    if (fieldType === 'corner') {
        const rows = 3
        const cols = 3

        const order = [
            { row: 1, col: 1 },
            { row: 0, col: 1 }, { row: 2, col: 1 }, { row: 1, col: 0 }, { row: 1, col: 2 },
            { row: 0, col: 0 }, { row: 0, col: 2 }, { row: 2, col: 0 }, { row: 2, col: 2 }
        ]

        const cellWidth = fieldWidth / cols
        const cellHeight = fieldHeight / rows

        if (index < order.length) {
            const { row, col } = order[index]
            return {
                x: (col * cellWidth + cellWidth / 2) - fieldWidth / 2,
                y: (row * cellHeight + cellHeight / 2) - fieldHeight / 2
            }
        }

        const row = Math.floor(index / cols)
        const col = index % cols
        return {
            x: (col * cellWidth + cellWidth / 2) - fieldWidth / 2,
            y: (row * cellHeight + cellHeight / 2) - fieldHeight / 2
        }
    }
    else if (fieldType === 'horizontal') {
        const rows = 3
        const cols = 2

        const order = [
            { row: 1, col: 0 },
            { row: 1, col: 1 },
            { row: 0, col: 0 }, { row: 2, col: 0 },
            { row: 0, col: 1 }, { row: 2, col: 1 }
        ]

        const cellWidth = fieldWidth / cols
        const cellHeight = fieldHeight / rows

        if (index < order.length) {
            const { row, col } = order[index]
            return {
                x: (col * cellWidth + cellWidth / 2) - fieldWidth / 2,
                y: (row * cellHeight + cellHeight / 2) - fieldHeight / 2
            }
        }

        const row = Math.floor(index / cols)
        const col = index % cols
        return {
            x: (col * cellWidth + cellWidth / 2) - fieldWidth / 2,
            y: (row * cellHeight + cellHeight / 2) - fieldHeight / 2
        }
    }
    else {
        const rows = 2
        const cols = 3

        const order = [
            { row: 0, col: 1 },
            { row: 1, col: 1 },
            { row: 0, col: 0 }, { row: 0, col: 2 },
            { row: 1, col: 0 }, { row: 1, col: 2 }
        ]

        const cellWidth = fieldWidth / cols
        const cellHeight = fieldHeight / rows

        if (index < order.length) {
            const { row, col } = order[index];
            return {
                x: (col * cellWidth + cellWidth / 2) - fieldWidth / 2,
                y: (row * cellHeight + cellHeight / 2) - fieldHeight / 2
            }
        }

        const row = Math.floor(index / cols)
        const col = index % cols
        return {
            x: (col * cellWidth + cellWidth / 2) - fieldWidth / 2,
            y: (row * cellHeight + cellHeight / 2) - fieldHeight / 2
        }
    }
}

const getFieldType = (position: number): 'corner' | 'horizontal' | 'vertical' => {
    if (position === 1 || position === 11 || position === 21 || position === 31) {
        return 'corner'
    }
    if ((position >= 22 && position <= 30) || (position >= 2 && position <= 10)) {
        return 'horizontal'
    }
    return 'vertical'
}

function RotationsArea() {
    const gamesState: GamesStateT = useAppSelector(state => state.games)
    const currentGame = gamesState.currentGame

    // Мемоизируем fields прямо здесь, чтобы избежать лишних пересозданий
    const fields = useMemo(() => currentGame?.fields || [], [currentGame?.fields])

    const containerRef = useRef<HTMLDivElement>(null)

    const [chipPositions, setChipPositions] = useState<Map<string, ChipPosition>>(new Map())
    const fieldCentersRef = useRef<Map<number, FieldRect>>(new Map())
    const updateTimeoutRef = useRef<NodeJS.Timeout>()
    const fieldsVersionRef = useRef<number>(0)

    // Функция для расчета координат всех полей
    const calculateFieldCenters = useCallback(() => {
        if (!containerRef.current) return new Map<number, FieldRect>()

        const gameContainer = containerRef.current.parentElement;
        if (!gameContainer) return new Map()

        const containerRect = gameContainer.getBoundingClientRect()
        const rotationsRect = containerRef.current.getBoundingClientRect()

        const offsetX = rotationsRect.left - containerRect.left
        const offsetY = rotationsRect.top - containerRect.top

        const containerWidth = containerRect.width
        const containerHeight = containerRect.height

        const cornerWidth = containerWidth * 0.135
        const cornerHeight = containerHeight * 0.135
        const sideWidth = containerWidth * 0.73
        const sideHeight = containerHeight * 0.73

        const fieldWidth = sideWidth / 9
        const fieldHeight = sideHeight / 9

        const centers = new Map<number, FieldRect>()

        centers.set(1, {
            position: 1,
            centerX: offsetX + cornerWidth + sideWidth + cornerWidth / 2,
            centerY: offsetY + cornerHeight + sideHeight + cornerHeight / 2,
            width: cornerWidth,
            height: cornerHeight
        })

        for (let i = 2; i <= 10; i++) {
            const index = i - 2;
            const centerX = offsetX + cornerWidth + (8 - index) * fieldWidth + fieldWidth / 2;
            const centerY = offsetY + cornerHeight + sideHeight + cornerHeight / 2;
            centers.set(i, { position: i, centerX, centerY, width: fieldWidth, height: cornerHeight })
        }

        centers.set(11, {
            position: 11,
            centerX: offsetX + cornerWidth / 2,
            centerY: offsetY + cornerHeight + sideHeight + cornerHeight / 2,
            width: cornerWidth,
            height: cornerHeight
        })

        for (let i = 12; i <= 20; i++) {
            const index = i - 12;
            const centerX = offsetX + cornerWidth / 2;
            const centerY = offsetY + cornerHeight + (8 - index) * fieldHeight + fieldHeight / 2;
            centers.set(i, { position: i, centerX, centerY, width: cornerWidth, height: fieldHeight })
        }

        centers.set(21, {
            position: 21,
            centerX: offsetX + cornerWidth / 2,
            centerY: offsetY + cornerHeight / 2,
            width: cornerWidth,
            height: cornerHeight
        })

        for (let i = 22; i <= 30; i++) {
            const index = i - 22;
            const centerX = offsetX + cornerWidth + index * fieldWidth + fieldWidth / 2;
            const centerY = offsetY + cornerHeight / 2;
            centers.set(i, { position: i, centerX, centerY, width: fieldWidth, height: cornerHeight })
        }

        centers.set(31, {
            position: 31,
            centerX: offsetX + cornerWidth + sideWidth + cornerWidth / 2,
            centerY: offsetY + cornerHeight / 2,
            width: cornerWidth,
            height: cornerHeight
        })

        for (let i = 32; i <= 40; i++) {
            const index = i - 32;
            const centerX = offsetX + cornerWidth + sideWidth + cornerWidth / 2;
            const centerY = offsetY + cornerHeight + index * fieldHeight + fieldHeight / 2;
            centers.set(i, { position: i, centerX, centerY, width: cornerWidth, height: fieldHeight })
        }

        fieldCentersRef.current = centers;
        return centers;
    }, [])

    // Функция для получения позиций всех игроков
    const calculateAllPositions = useCallback(() => {
        const centers = fieldCentersRef.current;
        if (centers.size === 0) return new Map<string, ChipPosition>()

        const positions = new Map<string, ChipPosition>()

        fields.forEach(field => {
            const fieldRect = centers.get(field.position)
            if (!fieldRect) return;

            const playersOnField = field.players
            const playerCount = playersOnField.length
            const fieldType = getFieldType(field.position)

            playersOnField.forEach((player: IPlayer, index: number) => {
                const offset = calculatePlayerPositions(
                    playerCount,
                    index,
                    fieldRect.width,
                    fieldRect.height,
                    fieldType
                )

                const x = fieldRect.centerX + offset.x
                const y = fieldRect.centerY + offset.y

                positions.set(player.id, {
                    playerId: player.id,
                    position: field.position,
                    x,
                    y,
                    chip: definePlayerChipIcon(player.chip),
                    name: player.user.name
                })
            })
        })

        return positions
    }, [fields])

    // Функция для применения позиций (с анимацией через CSS)
    const applyPositions = useCallback(() => {
        const newPositionsMap = calculateAllPositions()

        setChipPositions(prevPositionsMap => {
            const updatedPositions = new Map(prevPositionsMap)

            // Обновляем существующих и добавляем новых игроков
            newPositionsMap.forEach((newPos, playerId) => {
                updatedPositions.set(playerId, newPos);
            })

            // Удаляем игроков, которых больше нет на поле
            const toDelete: string[] = []
            updatedPositions.forEach((_, playerId) => {
                if (!newPositionsMap.has(playerId)) {
                    toDelete.push(playerId)
                }
            })
            toDelete.forEach(playerId => {
                updatedPositions.delete(playerId)
            })

            return updatedPositions
        });
    }, [calculateAllPositions])

    // Инициализация при монтировании и ресайзе
    useEffect(() => {
        if (!containerRef.current) return

        calculateFieldCenters()
        applyPositions()

        const handleResize = () => {
            calculateFieldCenters()
            applyPositions()
        };

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            if (updateTimeoutRef.current) {
                clearTimeout(updateTimeoutRef.current)
            }
        };
    }, [calculateFieldCenters, applyPositions])

    // Отслеживаем изменения полей с debounce
    useEffect(() => {
        if (fieldCentersRef.current.size === 0) return

        // Увеличиваем версию при каждом изменении fields
        fieldsVersionRef.current += 1;
        const currentVersion = fieldsVersionRef.current

        // Очищаем предыдущий таймаут
        if (updateTimeoutRef.current) {
            clearTimeout(updateTimeoutRef.current)
        }

        // Устанавливаем новый таймаут
        updateTimeoutRef.current = setTimeout(() => {
            // Проверяем, не было ли новых изменений за время ожидания
            if (currentVersion === fieldsVersionRef.current) {
                // Все обновления завершены, применяем позиции
                applyPositions()
            }
        }, 500) // Ждем 500ms для накопления всех обновлений
    }, [fields, applyPositions])

    return (
        <div ref={containerRef} className={styles.container}>
            {Array.from(chipPositions.values()).map(chip => (
                <div
                    key={chip.playerId}
                    className={styles.game_chip}
                    style={{
                        left: chip.x,
                        top: chip.y,
                    }}
                >
                    <img
                        src={chip.chip}
                        alt={chip.name}
                        className={styles.chip_image}
                    />
                </div>
            ))}
        </div>
    )
}

export default RotationsArea;