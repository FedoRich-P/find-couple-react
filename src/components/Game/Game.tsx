import React, { useState, useEffect } from 'react';
import { Card } from '../Card/Card';
import { Timer } from '../Timer/Timer';
import { Form } from '../Form/Form';
import { Modal } from '../Modal/Modal';
import s from './Game.module.css';

export const Game: React.FC = () => {
    const [cards, setCards] = useState<number[]>([]);
    const [openCards, setOpenCards] = useState<number[]>([]);
    const [matchedCards, setMatchedCards] = useState<number[]>([]);
    const [time, setTime] = useState<number>(60);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [customTime, setCustomTime] = useState<number>(60);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>('');
    const [modalMessage, setModalMessage] = useState<string>('');

    // Создание массива карт
    const createArrayOfCards = (value: number): number[] => {
        let arrayOfCards: number[] = [];
        for (let i = 1; i <= (value ** 2) / 2; i++) {
            arrayOfCards.push(i, i);
        }
        arrayOfCards.sort(() => Math.random() - 0.5);
        return arrayOfCards;
    };

    // Начало игры
    const startGame = (value: number = 4): void => {
        const newArr = createArrayOfCards(value);
        setCards(newArr);
        setTime(customTime);
        setGameStarted(true);
        setOpenCards([]);
        setMatchedCards([]);
        setIsPaused(false);
        setIsModalOpen(false);
    };

    // Сброс игры
    const resetGame = (): void => {
        setCards([]);
        setOpenCards([]);
        setMatchedCards([]);
        setTime(60);
        setGameStarted(false);
        setIsPaused(false);
        setCustomTime(60);
        setIsModalOpen(false);
    };

    // Обработка клика по карте
    const handleCardClick = (index: number): void => {
        if (isPaused) return;
        if (openCards.indexOf(index) !== -1 || matchedCards.indexOf(index) !== -1) return;

        const newOpenCards = [...openCards, index];
        setOpenCards(newOpenCards);

        if (newOpenCards.length === 2) {
            const [firstIndex, secondIndex] = newOpenCards;

            if (cards[firstIndex] === cards[secondIndex]) {
                setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
                setOpenCards([]);

                if (matchedCards.length + 2 === cards.length) {
                    setModalTitle('Congratulations! 🎉');
                    setModalMessage('You won the game!');
                    setIsModalOpen(true);
                    setGameStarted(false);
                }
            } else {
                setTimeout(() => {
                    setOpenCards([]);
                }, 500);
            }
        }
    };

    // Обработка отправки формы
    const handleFormSubmit = (value: number): void => {
        if (value < 2 || value > 10 || value % 2) {
            setModalTitle('Invalid Input');
            setModalMessage('Please enter a valid even number from 2 to 10.');
            setIsModalOpen(true);
        } else {
            startGame(value);
        }
    };

    // Обработка завершения времени
    const handleTimeUp = (): void => {
        setModalTitle('Time is up! ⏰');
        setModalMessage('You lost the game.');
        setIsModalOpen(true);
        setGameStarted(false);
    };

    // Пауза/продолжение игры
    const togglePause = (): void => {
        setIsPaused((prev) => !prev);
    };

    // Обновление времени каждую секунду
    useEffect(() => {
        if (gameStarted && !isPaused && time > 0) {
            const timer = setInterval(() => {
                setTime((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (time === 0) {
            handleTimeUp();
        }
    }, [gameStarted, isPaused, time]);

    return (
        <div className={s.container}>
            <h1 className={s.title}>Guess the Couple</h1>
            {!gameStarted ? (
                <div className={s.settings}>
                    <Form onSubmit={(value) => handleFormSubmit(+value)} />
                    <div className={s.timeControl}>
                        <label>
                            Set Time (seconds):
                            <input
                                type="number"
                                value={customTime}
                                onChange={(e) => setCustomTime(+e.target.value)}
                                min="10"
                                max="300"
                            />
                        </label>
                    </div>
                </div>
            ) : (
                <>
                    <Timer initialTime={time} onTimeUp={handleTimeUp} />
                    <button onClick={togglePause} className={s.pauseButton}>
                        {isPaused ? 'Resume' : 'Pause'}
                    </button>
                </>
            )}
            <ul className={s.game__list}>
                {cards.map((number, index) => (
                    <Card
                        key={index}
                        number={number}
                        onClick={() => handleCardClick(index)}
                        isOpen={openCards.indexOf(index) !== -1 || matchedCards.indexOf(index) !== -1}
                        isSuccess={matchedCards.indexOf(index) !== -1}
                    />
                ))}
            </ul>

            {/* Универсальное модальное окно */}
            <Modal
                isOpen={isModalOpen}
                onClose={resetGame}
                title={modalTitle}
                message={modalMessage}
            />
        </div>
    );
};