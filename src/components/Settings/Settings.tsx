import s from './Settings.module.css';
import {FormEvent, useState} from "react";

type SettingsProps ={
    setSelectedSize: (size: number) => void;
    handleFormSubmit: (e: FormEvent) => void;
    setCustomTime: (time: number) => void;
    customTime: number | null;
}

export const Settings = ({ setSelectedSize, handleFormSubmit, setCustomTime, customTime } :SettingsProps) => {

    const [activeSize, setActiveSize] = useState<number | null>(null);
    const [timeInput, setTimeInput] = useState<number | null>(customTime);

    const handleSizeClick = (size: number) => {
        setSelectedSize(size);
        setActiveSize(size);
    };

    const handleTimeSubmit = (e: FormEvent) => {
        e.preventDefault();
        const value = parseInt((e.target as HTMLFormElement).time.value);
        if (value >= 10 && value <= 500) {
            setCustomTime(value);
            setTimeInput(value);
        } else {
            alert('Введи правильно время - от 10 до 500 сек. ');
            // alert('Please enter a valid time between 10 and 300 seconds.');
        }
    };

    return (
        <div className={s.settings}>
            <div className={s.sizeButtons}>
                {/*<button*/}
                {/*    className={`${s.sizeButton} ${activeSize === 2 ? s.active : ''}`}*/}
                {/*    onClick={() => handleSizeClick(2)}*/}
                {/*>*/}
                {/*    <span>2x2</span>*/}
                {/*</button>*/}
                <button
                    className={`${s.sizeButton} ${activeSize === 4 ? s.active : ''}`}
                    onClick={() => handleSizeClick(4)}
                >
                    <span>Выбрать 4x4</span>
                </button>
                <button
                    className={`${s.sizeButton} ${activeSize === 6 ? s.active : ''}`}
                    onClick={() => handleSizeClick(6)}
                >
                    <span>Выбрать 6x6</span>
                </button>
            </div>
            <form className={s.form} onSubmit={handleFormSubmit}>
                <label className={s.label}>
                    Задать размер <br/>
                    (чётное число):
                    <input className={s.input} type="number" name="size" min="2" max="10"/>
                </label>
                <button type="submit" className={s.setSizeButton}>
                    <span>⬅️ Установить размер </span>
                </button>
            </form>
            <form className={s.form} onSubmit={handleTimeSubmit}>
                <label className={s.label}>
                    Задать время (сек.):
                    <input className={s.input}
                        type="number"
                        name="time"
                        min="10"
                        max="500"
                        value={timeInput || ''}
                        onChange={(e) => setTimeInput(parseInt(e.target.value))}
                    />
                </label>
                <button type="submit" className={s.setSizeButton}>
                    <span>⬅️ Установить время</span>
                </button>
            </form>
        </div>
    );
};