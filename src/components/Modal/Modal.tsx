import s from './Modal.module.css';

type ModalProps ={
    modalTitle: string;
    modalMessage: string;
    onClose: () => void;
    onRestart: () => void;
}

export const Modal = ({ modalTitle, modalMessage, onClose, onRestart }: ModalProps) => {
    return (
        <div className={s.modal}>
            <div className={s.modalContent}>
                <h2>{modalTitle}</h2>
                <p>{modalMessage}</p>
                <div className={s.modalButtons}>
                    <button className={s.modalButton} onClick={onClose}>Закрыть</button>
                    <button className={s.modalButton} onClick={onRestart}>Сыграем ещё ?</button>
                </div>
            </div>
        </div>
    );
};