import s from './Card.module.css';

type CardProps = {
    value: number;
    isFlipped: boolean;
    isMatched: boolean;
    onClick: () => void;
};

export const Card = ({ value, isFlipped, isMatched, onClick }: CardProps) => {
    return (
        <div
            className={`${s.card} ${isFlipped ? s.flipped : ''} ${isMatched ? s.matched : ''}`}
            onClick={onClick}
        >
            {(isFlipped || isMatched) ? value : ''}
        </div>
    );
};