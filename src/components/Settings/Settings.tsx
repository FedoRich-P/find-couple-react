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

    const handleTimeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const value = parseInt((e.target as HTMLFormElement).time.value);
        if (value >= 10 && value <= 500) {
            setCustomTime(value);
            setTimeInput(value);
        } else {
            alert('Please enter a valid time between 10 and 300 seconds.');
        }
    };

    return (
        <div className={s.settings}>
            <div className={s.sizeButtons}>
                <button
                    className={`${s.sizeButton} ${activeSize === 2 ? s.active : ''}`}
                    onClick={() => handleSizeClick(2)}
                >
                    <span>2x2</span>
                </button>
                <button
                    className={`${s.sizeButton} ${activeSize === 4 ? s.active : ''}`}
                    onClick={() => handleSizeClick(4)}
                >
                    <span>4x4</span>
                </button>
                <button
                    className={`${s.sizeButton} ${activeSize === 6 ? s.active : ''}`}
                    onClick={() => handleSizeClick(6)}
                >
                    <span>6x6</span>
                </button>
            </div>
            <form onSubmit={handleFormSubmit}>
                <label className={s.label}>
                    Set Size (2-10):
                    <input className={s.input} type="number" name="size" min="2" max="10" />
                </label>
                <button type="submit" className={s.setSizeButton}>
                    <span>Set Size</span>
                </button>
            </form>
            <form onSubmit={handleTimeSubmit}>
                <label className={s.label}>
                    Set Time (seconds):
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
                    <span>Set Time</span>
                </button>
            </form>
        </div>
    );
};