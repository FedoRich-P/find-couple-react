import s from './Timer.module.css';

type TimerProps = {
    time: number;
    isPaused: boolean;
}

export const Timer = ({ time, isPaused }: TimerProps) => {
    const formatTime = (timeInSeconds: number): string => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className={s.timer}>
            Осталось времени: {formatTime(time)} {isPaused ? '(На паузе)' : ''}
        </div>
    );
};