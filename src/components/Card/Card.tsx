import s from './Card.module.css';

type CardProps = {
    number: number;
    onClick: () => void;
    isOpen: boolean;
    isSuccess: boolean;
}

export const Card = ({number, onClick, isOpen, isSuccess}: CardProps) => {
    return (
        <li
            className={`${s.card} ${isOpen ? s.open : ''} ${isSuccess ? s.success : ''}`}
            onClick={onClick}
        >
            <span>{isOpen || isSuccess ? number : ''}</span>
        </li>
    );
};