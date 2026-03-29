import styles from './rotations-area.module.css';
import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { GamesStateT } from '../../../../store/slices/games/types/games-state';
import { useAppSelector } from '../../../../hoocks/useAppSelector';
import { MovementType } from '../../../../store/interfaces/game-turn';
import { IPlayer } from '../../../../store/interfaces/player';
import { definePlayerChipIcon } from '../../../../common/define-player-chip';

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

const CORNER_POSITIONS = [1, 11, 21, 31]

// Функция для получения следующей позиции по часовой стрелке
const getNextPositionClockwise = (current: number): number => {
    let next = current + 1
    if (next > 40) next = 1
    return next
}

// Функция для получения предыдущей позиции против часовой стрелки
const getNextPositionCounterClockwise = (current: number): number => {
    let next = current - 1
    if (next < 1) next = 40
    return next
}

// Функция для получения всех угловых полей на пути по часовой стрелке
const getCornersOnPathClockwise = (start: number, target: number): number[] => {
    const corners: number[] = []
    let current = start
    while (current !== target) {
        current = getNextPositionClockwise(current)
        if (CORNER_POSITIONS.includes(current)) {
            corners.push(current)
        }
    }
    return corners
}

// Функция для получения всех угловых полей на пути против часовой стрелки
const getCornersOnPathCounterClockwise = (start: number, target: number): number[] => {
    const corners: number[] = []
    let current = start
    while (current !== target) {
        current = getNextPositionCounterClockwise(current)
        if (CORNER_POSITIONS.includes(current)) {
            corners.push(current)
        }
    }
    return corners
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

    // Получаем movementType и expires из стейта игры
    const movementType = currentGame?.turn?.movementType || MovementType.CLOCKWISE

    // Получаем expires (время окончания хода) и вычисляем длительность анимации
    const expires = currentGame?.turn?.expires
    const getAnimationDuration = useCallback(() => {
        if (!expires) return 500

        const remainingTime = expires * 1000

        if (remainingTime <= 0) return 100
        return Math.min(remainingTime, 2000)
    }, [expires])

    const fields = useMemo(() => currentGame?.fields || [], [currentGame?.fields])

    const containerRef = useRef<HTMLDivElement>(null)
    const [chipPositions, setChipPositions] = useState<Map<string, ChipPosition>>(new Map())
    const fieldCentersRef = useRef<Map<number, FieldRect>>(new Map())
    const animationFrameRef = useRef<number>()
    const prevPositionsRef = useRef<Map<string, number>>(new Map())
    const [isAnimating, setIsAnimating] = useState(false)
    const pendingAnimationsRef = useRef<Map<string, boolean>>(new Map())
    const isPageVisibleRef = useRef<boolean>(true)
    // Реф для хранения ID анимируемых игроков, чтобы блокировать их обновление
    const animatingPlayersRef = useRef<Set<string>>(new Set())
    // Реф для хранения стартовых позиций анимируемых игроков
    const animatingStartPositionsRef = useRef<Map<string, ChipPosition>>(new Map())

    const updateChipPositions = useCallback(() => {
        const positions = new Map<string, ChipPosition>()

        fields.forEach(field => {
            const fieldRect = fieldCentersRef.current.get(field.position)
            if (!fieldRect) return

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

        setChipPositions(prev => {
            const updated = new Map(prev)

            // Для анимируемых игроков сохраняем их анимированную позицию
            positions.forEach((pos, playerId) => {
                if (animatingPlayersRef.current.has(playerId)) {
                    // Если игрок в процессе анимации, сохраняем его анимированную позицию из рефа
                    const animatingPos = animatingStartPositionsRef.current.get(playerId)
                    if (animatingPos) {
                        updated.set(playerId, animatingPos)
                        return
                    }
                }
                updated.set(playerId, pos)
            })

            // Удаляем игроков, которых больше нет на поле
            const toDelete: string[] = []
            updated.forEach((_, playerId) => {
                if (!positions.has(playerId) && !animatingPlayersRef.current.has(playerId)) {
                    toDelete.push(playerId)
                }
            })
            toDelete.forEach(playerId => {
                updated.delete(playerId)
            })

            return updated
        })
    }, [fields])

    useEffect(() => {
        const handleVisibilityChange = () => {
            isPageVisibleRef.current = !document.hidden

            if (isPageVisibleRef.current && isAnimating) {
                updateChipPositions()
                setIsAnimating(false)
                pendingAnimationsRef.current.clear()
                animatingPlayersRef.current.clear()
                animatingStartPositionsRef.current.clear()
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [isAnimating, updateChipPositions])

    const calculateFieldCenters = useCallback(() => {
        if (!containerRef.current) return new Map<number, FieldRect>()

        const gameContainer = containerRef.current.parentElement
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
            const index = i - 2
            const centerX = offsetX + cornerWidth + (8 - index) * fieldWidth + fieldWidth / 2
            const centerY = offsetY + cornerHeight + sideHeight + cornerHeight / 2
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
            const index = i - 12
            const centerX = offsetX + cornerWidth / 2
            const centerY = offsetY + cornerHeight + (8 - index) * fieldHeight + fieldHeight / 2
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
            const index = i - 22
            const centerX = offsetX + cornerWidth + index * fieldWidth + fieldWidth / 2
            const centerY = offsetY + cornerHeight / 2
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
            const index = i - 32
            const centerX = offsetX + cornerWidth + sideWidth + cornerWidth / 2
            const centerY = offsetY + cornerHeight + index * fieldHeight + fieldHeight / 2
            centers.set(i, { position: i, centerX, centerY, width: cornerWidth, height: fieldHeight })
        }

        fieldCentersRef.current = centers
        return centers
    }, [])

    const getPlayerPositionOnField = useCallback((playerId: string, fieldPosition: number, fieldsData: typeof fields): { x: number; y: number } | null => {
        const fieldRect = fieldCentersRef.current.get(fieldPosition)
        if (!fieldRect) return null

        const field = fieldsData.find(f => f.position === fieldPosition)
        if (!field) return null

        const playersOnField = field.players
        const playerIndex = playersOnField.findIndex(p => p.id === playerId)
        if (playerIndex === -1) return null

        const playerCount = playersOnField.length
        const fieldType = getFieldType(fieldPosition)

        const offset = calculatePlayerPositions(
            playerCount,
            playerIndex,
            fieldRect.width,
            fieldRect.height,
            fieldType
        )

        return {
            x: fieldRect.centerX + offset.x,
            y: fieldRect.centerY + offset.y
        }
    }, [])

    // Прямая анимация от точки к точке с использованием requestAnimationFrame
    const animateDirectMovement = useCallback((
        playerId: string,
        fromX: number,
        fromY: number,
        toX: number,
        toY: number,
        duration: number
    ): Promise<void> => {
        return new Promise((resolve, reject) => {
            const startTime = performance.now()
            let animationId: number

            const animate = (now: number) => {
                if (!isPageVisibleRef.current) {
                    if (animationId) {
                        cancelAnimationFrame(animationId)
                    }
                    reject(new Error('Page hidden'))
                    return
                }

                const elapsed = now - startTime
                let progress = Math.min(1, elapsed / duration)

                // Используем плавную функцию easing
                const easeInOutCubic = (t: number) => {
                    return t < 0.5
                        ? 4 * t * t * t
                        : 1 - Math.pow(-2 * t + 2, 3) / 2
                }
                const eased = easeInOutCubic(progress)

                const currentX = fromX + (toX - fromX) * eased
                const currentY = fromY + (toY - fromY) * eased

                setChipPositions(prev => {
                    const updated = new Map(prev)
                    const existing = updated.get(playerId)
                    if (existing) {
                        const newPosition = {
                            ...existing,
                            x: currentX,
                            y: currentY
                        }
                        updated.set(playerId, newPosition)
                        // Обновляем стартовую позицию в рефе для блокировки обновлений
                        animatingStartPositionsRef.current.set(playerId, newPosition)
                    }
                    return updated
                })

                if (progress < 1) {
                    animationId = requestAnimationFrame(animate)
                } else {
                    // Убеждаемся, что финальная позиция точная
                    setChipPositions(prev => {
                        const updated = new Map(prev)
                        const existing = updated.get(playerId)
                        if (existing) {
                            updated.set(playerId, {
                                ...existing,
                                x: toX,
                                y: toY
                            })
                        }
                        return updated
                    })
                    resolve()
                }
            }

            animationId = requestAnimationFrame(animate)
            animationFrameRef.current = animationId
        })
    }, [])

    // Анимация через угловые поля (по часовой стрелке)
    const animateClockwise = useCallback(async (
        playerId: string,
        startPosition: { x: number; y: number },
        finalPosition: { x: number; y: number },
        pathPositions: number[]
    ) => {
        // Строим точки анимации через центры полей
        const points: { x: number; y: number }[] = [
            { x: startPosition.x, y: startPosition.y }
        ]

        for (let i = 1; i < pathPositions.length; i++) {
            const pos = pathPositions[i]
            const fieldRect = fieldCentersRef.current.get(pos)
            if (fieldRect) {
                points.push({ x: fieldRect.centerX, y: fieldRect.centerY })
            }
        }

        if (points.length > 0) {
            points[points.length - 1] = finalPosition
        }

        if (points.length >= 2) {
            const animationDuration = getAnimationDuration()
            const segmentDuration = animationDuration / (points.length - 1)

            for (let i = 0; i < points.length - 1; i++) {
                if (!isPageVisibleRef.current) {
                    throw new Error('Page hidden')
                }
                const from = points[i]
                const to = points[i + 1]
                await animateDirectMovement(playerId, from.x, from.y, to.x, to.y, segmentDuration)
            }
        }
    }, [animateDirectMovement, getAnimationDuration])

    // Анимация через угловые поля (против часовой стрелки)
    const animateCounterClockwise = useCallback(async (
        playerId: string,
        startPosition: { x: number; y: number },
        finalPosition: { x: number; y: number },
        pathPositions: number[]
    ) => {
        // Строим точки анимации через центры полей
        const points: { x: number; y: number }[] = [
            { x: startPosition.x, y: startPosition.y }
        ]

        for (let i = 1; i < pathPositions.length; i++) {
            const pos = pathPositions[i]
            const fieldRect = fieldCentersRef.current.get(pos)
            if (fieldRect) {
                points.push({ x: fieldRect.centerX, y: fieldRect.centerY })
            }
        }

        if (points.length > 0) {
            points[points.length - 1] = finalPosition
        }

        if (points.length >= 2) {
            const animationDuration = getAnimationDuration()
            const segmentDuration = animationDuration / (points.length - 1)

            for (let i = 0; i < points.length - 1; i++) {
                if (!isPageVisibleRef.current) {
                    throw new Error('Page hidden')
                }
                const from = points[i]
                const to = points[i + 1]
                await animateDirectMovement(playerId, from.x, from.y, to.x, to.y, segmentDuration)
            }
        }
    }, [animateDirectMovement, getAnimationDuration])

    // Прямая анимация (просто перемещение от начальной к конечной точке)
    const animateDirect = useCallback(async (
        playerId: string,
        startPosition: { x: number; y: number },
        finalPosition: { x: number; y: number }
    ) => {
        // Просто анимируем от начальной к конечной точке за всю длительность
        const animationDuration = getAnimationDuration()
        await animateDirectMovement(
            playerId,
            startPosition.x,
            startPosition.y,
            finalPosition.x,
            finalPosition.y,
            animationDuration
        )
    }, [animateDirectMovement, getAnimationDuration])

    const animatePlayer = useCallback(async (
        playerId: string,
        fromPos: number,
        toPos: number,
        startPosition: { x: number; y: number },
        finalPosition: { x: number; y: number },
        pathPositions: number[]
    ) => {
        if (movementType === MovementType.CLOCKWISE) {
            await animateClockwise(playerId, startPosition, finalPosition, pathPositions)
        } else if (movementType === MovementType.COUNTERCLOCKWISE) {
            await animateCounterClockwise(playerId, startPosition, finalPosition, pathPositions)
        } else {
            await animateDirect(playerId, startPosition, finalPosition)
        }
    }, [animateClockwise, animateCounterClockwise, animateDirect, movementType])

    useEffect(() => {
        if (fieldCentersRef.current.size === 0) return

        const currentPositions = new Map<string, number>()
        fields.forEach(field => {
            field.players.forEach(player => {
                currentPositions.set(player.id, field.position)
            })
        })

        const movesToAnimate: Array<{
            playerId: string,
            fromPos: number,
            toPos: number,
            startPosition: { x: number; y: number },
            finalPosition: { x: number; y: number },
            pathPositions: number[]
        }> = []

        currentPositions.forEach((newPos, playerId) => {
            const prevPos = prevPositionsRef.current.get(playerId)

            if (prevPos !== undefined && prevPos !== newPos && !isAnimating && !pendingAnimationsRef.current.get(playerId)) {
                let startPosition = chipPositions.get(playerId)

                if (!startPosition) {
                    const fallbackPos = getPlayerPositionOnField(playerId, prevPos, fields)
                    if (fallbackPos) {
                        startPosition = {
                            playerId,
                            position: prevPos,
                            x: fallbackPos.x,
                            y: fallbackPos.y,
                            chip: '',
                            name: ''
                        }
                    }
                }

                if (!startPosition) return

                const finalPosition = getPlayerPositionOnField(playerId, newPos, fields)
                if (!finalPosition) return

                // Выбираем правильную функцию для получения угловых полей в зависимости от типа анимации
                let corners: number[]
                if (movementType === MovementType.CLOCKWISE) {
                    corners = getCornersOnPathClockwise(prevPos, newPos)
                } else if (movementType === MovementType.COUNTERCLOCKWISE) {
                    corners = getCornersOnPathCounterClockwise(prevPos, newPos)
                } else {
                    corners = []
                }

                const pathPositions = [prevPos, ...corners, newPos]
                const uniquePathPositions: number[] = []
                for (const pos of pathPositions) {
                    if (!uniquePathPositions.includes(pos)) {
                        uniquePathPositions.push(pos)
                    }
                }

                movesToAnimate.push({
                    playerId,
                    fromPos: prevPos,
                    toPos: newPos,
                    startPosition: { x: startPosition.x, y: startPosition.y },
                    finalPosition,
                    pathPositions: uniquePathPositions
                })

                pendingAnimationsRef.current.set(playerId, true)
            }
        })

        if (movesToAnimate.length > 0) {
            // Помечаем игроков как анимируемых и сохраняем их стартовые позиции
            movesToAnimate.forEach(move => {
                animatingPlayersRef.current.add(move.playerId)
                const startPos = chipPositions.get(move.playerId)
                if (startPos) {
                    animatingStartPositionsRef.current.set(move.playerId, startPos)
                } else {
                    animatingStartPositionsRef.current.set(move.playerId, {
                        playerId: move.playerId,
                        position: move.fromPos,
                        x: move.startPosition.x,
                        y: move.startPosition.y,
                        chip: '',
                        name: ''
                    })
                }
            })

            // Принудительно обновляем позиции, чтобы заблокировать фигурки в стартовых позициях
            updateChipPositions()

            setIsAnimating(true)

            const runAnimations = async () => {
                const animationPromises = movesToAnimate.map(async (move) => {
                    try {
                        await animatePlayer(
                            move.playerId,
                            move.fromPos,
                            move.toPos,
                            move.startPosition,
                            move.finalPosition,
                            move.pathPositions
                        )
                    } catch (error) {
                        setChipPositions(prev => {
                            const updated = new Map(prev)
                            const existing = updated.get(move.playerId)
                            if (existing) {
                                updated.set(move.playerId, {
                                    ...existing,
                                    x: move.finalPosition.x,
                                    y: move.finalPosition.y
                                })
                            }
                            return updated
                        })
                    } finally {
                        pendingAnimationsRef.current.delete(move.playerId)
                        animatingPlayersRef.current.delete(move.playerId)
                        animatingStartPositionsRef.current.delete(move.playerId)
                    }
                })

                await Promise.all(animationPromises)

                setIsAnimating(false)
                // Финальное обновление позиций
                updateChipPositions()
            }

            runAnimations()
        }

        prevPositionsRef.current = currentPositions

    }, [fields, isAnimating, getPlayerPositionOnField, chipPositions, animatePlayer, movementType, updateChipPositions])

    useEffect(() => {
        if (!containerRef.current) return

        calculateFieldCenters()
        updateChipPositions()

        const initialPositions = new Map<string, number>()
        fields.forEach(field => {
            field.players.forEach(player => {
                initialPositions.set(player.id, field.position)
            })
        })
        prevPositionsRef.current = initialPositions

        const handleResize = () => {
            calculateFieldCenters()
            updateChipPositions()
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [calculateFieldCenters, updateChipPositions, fields])

    return (
        <div ref={containerRef} className={styles.container}>
            {Array.from(chipPositions.values()).map(chip => (
                <div
                    key={chip.playerId}
                    className={styles.game_chip}
                    style={{
                        left: chip.x,
                        top: chip.y,
                        transition: 'none'
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