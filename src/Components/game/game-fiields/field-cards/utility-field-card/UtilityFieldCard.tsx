import styles from './utility-field-card.module.css';
import general from '../general.module.css'
import { IGameField } from '../../../../../store/interfaces/game-field';
import { useEffect, useState } from 'react';

function UtilityFieldCard(props: { field: IGameField }) {
    const { field } = props
    
    return (
        <div className={general.container}>
            <div className={general.content}>

            </div>
        </div>
    )
}

export default UtilityFieldCard;