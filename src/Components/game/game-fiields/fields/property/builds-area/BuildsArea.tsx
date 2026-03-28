import styles from './builds-area.module.css';
import house from '../../../../../../icons/game-builds/house.svg';
import hotel from '../../../../../../icons/game-builds/hotel.svg';
import { useState, useEffect } from 'react';

export enum BuildAreaOrientation {
    VERTICAL = 'VERTICAL',
    HORIZONTAL = 'HORIZONTAL'
}

function BuildsArea(props: { buildsCount: number | null, orientation: BuildAreaOrientation }) {
    const { buildsCount, orientation } = props
    const [displayBuilds, setDisplayBuilds] = useState<Array<{ id: number; type: 'house' | 'hotel' }>>([])
    const [newBuildId, setNewBuildId] = useState<number | null>(null)
    
    useEffect(() => {
        if (buildsCount === 5) {
            const newBuild = { id: Date.now(), type: 'hotel' as const }
            setNewBuildId(newBuild.id)
            setDisplayBuilds([newBuild])
            setTimeout(() => setNewBuildId(null), 300)
        } else if (buildsCount && buildsCount > 0) {
            setDisplayBuilds(prevBuilds => {
                const newBuilds = Array.from({ length: buildsCount }).map((_, index) => ({
                    id: Date.now() + index,
                    type: 'house' as const
                }))
                
                const oldIds = new Set(prevBuilds.map(b => b.id))
                const addedBuild = newBuilds.find(b => !oldIds.has(b.id))
                if (addedBuild) {
                    setNewBuildId(addedBuild.id)
                    setTimeout(() => setNewBuildId(null), 300)
                }
                
                return newBuilds
            })
        } else {
            setDisplayBuilds([])
            setNewBuildId(null)
        }
    }, [buildsCount])
    
    const getContainerClass = () => {
        return orientation === BuildAreaOrientation.VERTICAL
            ? styles.builds_area_vertical
            : styles.builds_area_horizontal
    }
    
    const getBuildIconClass = () => {
        return orientation !== BuildAreaOrientation.HORIZONTAL
            ? styles.build_icon_vertical
            : styles.build_icon_horizontal
    }

    return (
        <div className={getContainerClass()}>
            {displayBuilds.map(b => (
                <div 
                    key={b.id} 
                    className={styles.build_wrapper}
                >
                    <img
                        className={`
                            ${getBuildIconClass()} 
                            ${styles.build_icon}
                            ${newBuildId === b.id ? styles.build_icon_appear : ''}
                        `}
                        src={b.type === 'house' ? house : hotel}
                        alt={b.type}
                    />
                </div>
            ))}
        </div>
    )
}

export default BuildsArea;