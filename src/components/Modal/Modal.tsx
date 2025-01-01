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
                    <button className={s.modalButton} onClick={onClose}>Close</button>
                    <button className={s.modalButton} onClick={onRestart}>Restart</button>
                </div>
            </div>
        </div>
    );
};