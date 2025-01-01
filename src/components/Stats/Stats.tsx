import React from 'react';
import s from './Stats.module.css';

type StatsProps ={
    bestStats: { time: number; cards: number; timePerCard: number } | null;
}

export const Stats = ({ bestStats }: StatsProps) => {
    if (!bestStats) {
        return null;
    }

    return (
        <div className={s.bestTime}>
            <h3>Best Stats</h3>
            <p>
                Time per Card: <strong>{bestStats.timePerCard} seconds</strong> /
                Time: <strong>{bestStats.time} sec.</strong> /
                Cards: <strong>{bestStats.cards}</strong>
            </p>
        </div>
    );
};