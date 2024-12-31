import s from './Modal.module.css'
import {ReactNode} from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
};

export const Modal = ({ isOpen, onClose, title, message } :ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className={s.modalOverlay}>
            <div className={s.modalContent}>
                <h2>{title}</h2>
                <p>{message}</p>
                <button onClick={onClose} className={s.modalCloseButton}>
                    Close
                </button>
            </div>
        </div>
    );
};