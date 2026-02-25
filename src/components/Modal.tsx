import { useRef, useEffect } from "react";
import type { ModalProps } from "../types/types";

export function Modal({ isOpen, onClose, children }: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }

        return () => {
            if (dialog.open) {
                dialog.close();
            }
        };
    }, [isOpen]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const handleClose = () => {
            onClose();
        };

        dialog.addEventListener('close', handleClose);

        return () => {
            dialog.removeEventListener('close', handleClose);
        };
    }, [onClose]);

    return (
        <dialog ref={dialogRef}>
            {children}
        </dialog>
    )
}