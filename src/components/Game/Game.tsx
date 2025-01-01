import React, {useState, useEffect, FormEvent} from 'react';
import s from './Game.module.css';
import { Settings } from "../Settings/Settings";
import { Timer } from "../Timer/Timer";
import { Controls } from "../Controls/Controls";
import { Board } from "../Board/Board";
import { Modal } from "../Modal/Modal";
import { Stats } from "../Stats/Stats";
import {createArrayOfCards} from "../../utils/createArrayOfCards";

export const Game = () => {
    const [gameState, setGameState] = useState({
        cards: [] as number[],
        openCards: [] as number[],
        matchedCards: [] as number[],
        time: 0,
        gameStarted: false,
        isPaused: false,
        isModalOpen: false,
        gridSize: 4,
        selectedSize: 4,
        startTime: 0,
        pauseStartTime: 0,
        pauseDuration: 0,
    });

    const [customTime, setCustomTime] = useState<number | null>(null);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });
    const [bestStats, setBestStats] = useState<{ time: number; cards: number; timePerCard: number } | null>(null);

    useEffect(() => {
        const stats = localStorage.getItem('bestStats');
        if (stats) {
            setBestStats(JSON.parse(stats));
        }
    }, []);

    const startGame = () => {
        const newArr = createArrayOfCards(gameState.selectedSize);
        const calculatedTime = customTime !== null && customTime !== 0 ? customTime : (gameState.selectedSize * gameState.selectedSize / 2) * 10;

        setGameState((prev) => ({
            ...prev,
            cards: newArr,
            time: calculatedTime,
            gameStarted: true,
            openCards: [],
            matchedCards: [],
            isPaused: false,
            isModalOpen: false,
            gridSize: prev.selectedSize,
            startTime: Date.now(),
            pauseDuration: 0,
        }));
    };

    const resetGame = () => {
        setGameState((prev) => ({
            ...prev,
            cards: [],
            openCards: [],
            matchedCards: [],
            gameStarted: false,
            isPaused: false,
            isModalOpen: false,
            gridSize: 4,
            selectedSize: 4,
            time: 0,
            startTime: 0,
            pauseDuration: 0,
        }));
        setCustomTime(null);
    };

    const handleCardClick = (index: number) => {
        if (gameState.isPaused || gameState.openCards.includes(index) || gameState.matchedCards.includes(index)) return;
        if (gameState.openCards.length >= 2) return;

        const newOpenCards = [...gameState.openCards, index];
        setGameState((prev) => ({ ...prev, openCards: newOpenCards }));

        if (newOpenCards.length === 2) {
            const [firstIndex, secondIndex] = newOpenCards;

            if (gameState.cards[firstIndex] === gameState.cards[secondIndex]) {
                setGameState((prev) => ({
                    ...prev,
                    matchedCards: [...prev.matchedCards, firstIndex, secondIndex],
                    openCards: [],
                }));

                if (gameState.matchedCards.length + 2 === gameState.cards.length) {
                    const endTime = Date.now();
                    const elapsedTime = Math.floor((endTime - gameState.startTime - gameState.pauseDuration) / 1000);
                    const timePerCard = elapsedTime / (gameState.gridSize * gameState.gridSize);
                    setModalContent({ title: 'Поздравляем !!! 🎉', message: `Ты выйграл(а), твое время ${elapsedTime} сек.!` });
                    setGameState((prev) => ({
                        ...prev,
                        isModalOpen: true,
                        gameStarted: false
                    }));

                    const stats = { time: elapsedTime, cards: gameState.gridSize * gameState.gridSize, timePerCard };
                    const bestStatsData = localStorage.getItem('bestStats');
                    if (!bestStatsData || JSON.parse(bestStatsData).timePerCard > timePerCard) {
                        localStorage.setItem('bestStats', JSON.stringify(stats));
                        setBestStats(stats);
                    }
                }
            } else {
                setTimeout(() => {
                    setGameState((prev) => ({ ...prev, openCards: [] }));
                }, 500);
            }
        }
    };

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        const value = parseInt((e.target as HTMLFormElement).size.value);
        if (value < 2 || value > 10 || value % 2 !== 0) {
            setModalContent({ title: 'Не верное значение...', message: 'Введи правильно число от 2 до 10.' });
            setGameState((prev) => ({ ...prev, isModalOpen: true }));
        } else {
            setGameState((prev) => ({ ...prev, selectedSize: value }));
        }
    };

    const handleTimeUp = () => {
        setModalContent({ title: 'Время закончилось ! ⏰', message: 'Ты проиграл (' });
        setGameState((prev) => ({ ...prev, isModalOpen: true, gameStarted: false }));
    };

    const togglePause = () => {
        if (gameState.isPaused) {
            const pausedTime = Date.now() - gameState.pauseStartTime;
            setGameState((prev) => ({ ...prev, pauseDuration: prev.pauseDuration + pausedTime, isPaused: false }));
        } else {
            setGameState((prev) => ({ ...prev, pauseStartTime: Date.now(), isPaused: true }));
        }
    };

    useEffect(() => {
        let timer: number | undefined;

        const tick = () => {
            setGameState((prev) => {
                if (prev.time <= 0 || !prev.gameStarted) {
                    if (timer) clearTimeout(timer);
                    if (prev.time <= 0) {
                        handleTimeUp();
                    }
                    return { ...prev, time: 0 };
                }
                return { ...prev, time: prev.time - 1 };
            });

            timer = setTimeout(tick, 1000);
        };

        if (gameState.gameStarted && gameState.time > 0 && !gameState.isPaused) {
            tick();
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [gameState.gameStarted, gameState.isPaused]);

    console.log("Cards:", gameState.cards);

    return (
        <div className={s.container}>
            <h1 className={s.title}>Найди пару</h1>
            {!gameState.gameStarted ? (
                <>
                    {bestStats && <Stats bestStats={bestStats} />}
                    <Settings
                        setSelectedSize={(size) => setGameState((prev) => ({ ...prev, selectedSize: size }))}
                        handleFormSubmit={handleFormSubmit}
                        setCustomTime={setCustomTime}
                        customTime={customTime}
                    />
                    <button onClick={startGame} className={s.startButton}>Начать игру</button>
                </>
            ) : (
                <>
                    <Board
                        cards={gameState.cards}
                        openCards={gameState.openCards}
                        matchedCards={gameState.matchedCards}
                        gridSize={gameState.gridSize}
                        handleCardClick={handleCardClick}
                    />
                    <Timer time={gameState.time} isPaused={gameState.isPaused} />
                    <Controls isPaused={gameState.isPaused} togglePause={togglePause} resetGame={resetGame} />
                </>
            )}
            {gameState.isModalOpen && (
                <Modal
                    modalTitle={modalContent.title}
                    modalMessage={modalContent.message}
                    onClose={() => setGameState((prev) => ({ ...prev, isModalOpen: false }))}
                    onRestart={resetGame}
                />
            )}
        </div>
    );
};