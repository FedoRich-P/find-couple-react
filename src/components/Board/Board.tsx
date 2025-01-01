import { Card } from '../Card/Card';
import s from './Board.module.css';

type BoardProps = {
    cards: number[];
    openCards: number[];
    matchedCards: number[];
    gridSize: number;
    handleCardClick: (index: number) => void;
};

export const Board = ({ cards, openCards, matchedCards, gridSize, handleCardClick }: BoardProps) => {
    return (
        <div className={s.board} style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
            {cards.map((card, index) => (
                <Card
                    key={index}
                    value={card}
                    isFlipped={openCards.includes(index)}
                    isMatched={matchedCards.includes(index)}
                    onClick={() => handleCardClick(index)}
                />
            ))}
        </div>
    );
};