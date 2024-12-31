import s from './Timer.module.css';
import {useEffect, useState} from "react";

export const Timer = ({ initialTime, onTimeUp }) => {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        if (time > 0) {
            const timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            onTimeUp();
        }
    }, [time, onTimeUp]);

    return <div className={s.timer}>Time left: {time} seconds</div>;
};