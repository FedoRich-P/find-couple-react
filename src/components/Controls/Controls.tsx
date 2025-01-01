
import s from './Controls.module.css';

type ControlsProps ={
    isPaused: boolean;
    togglePause: () => void;
    resetGame: () => void;
}

export const Controls = ({ isPaused, togglePause, resetGame }: ControlsProps) => {
    return (
        <div className={s.controls}>
            <button onClick={togglePause} className={s.pauseButton}>
                {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button onClick={resetGame} className={s.backButton}>Back</button>
        </div>
    );
};