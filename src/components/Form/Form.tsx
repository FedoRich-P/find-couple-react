
import s from './Form.module.css';
import {FormEvent} from "react";

type FormProps ={
    handleFormSubmit: (e: FormEvent) => void;
    setCustomTime: (time: number) => void;
    customTime: number | null;
}

export const Form = ({ handleFormSubmit, setCustomTime, customTime }: FormProps) => {
    return (
        <form onSubmit={handleFormSubmit}>
            <label>
                Set Size (2-10):
                <input type="number" name="size" min="2" max="10" />
            </label>
            <button type="submit">Set Size</button>
            <div className={s.timeControl}>
                <label>
                    Set Time (seconds):
                    <input
                        type="number"
                        value={customTime || ''}
                        onChange={(e) => setCustomTime(+e.target.value)}
                        min="10"
                        max="300"
                    />
                </label>
            </div>
        </form>
    );
};