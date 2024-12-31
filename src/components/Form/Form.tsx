import s from './Form.module.css';
import {FormEvent, useState} from "react";

type FormProps = {
    onSubmit: (value: string)=> void;
}

export const Form = ({ onSubmit }: FormProps) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(inputValue);
        setInputValue('');
    };

    return (
        <form className={s.form} onSubmit={handleSubmit}>
            <input
                type="number"
                className={s.game__input}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter even number from 2 to 10"
            />
            <button type="submit" className={s.button}>
                Start Game
            </button>
        </form>
    );
};