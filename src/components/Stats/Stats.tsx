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
            <h3>Лучшее время</h3>
            <p>
                Время на одну карту: <strong>{bestStats.timePerCard} сек.</strong> /
                Общее время: <strong>{bestStats.time} сек.</strong> /
                Карт: <strong>{bestStats.cards}</strong>
            </p>
        </div>
    );
};