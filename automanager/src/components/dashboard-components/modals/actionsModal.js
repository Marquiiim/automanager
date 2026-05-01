import { MdEdit, MdBlock, MdDelete, MdPersonOff } from 'react-icons/md';
import { useCallback, useRef, useEffect, useState } from 'react';
import api from '../../../services/apiInstance';
import styles from './actionsModal.module.css';

export default function ActionsModal({ position, onClose, userId }) {
    const menuRef = useRef(null);
    const [finalPosition, setFinalPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (menuRef.current) {
            const menuRect = menuRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let left = position.left + 8;
            let top = position.top;

            if (left + menuRect.width > viewportWidth) {
                left = position.left - menuRect.width - 8;
            }

            if (top + menuRect.height > viewportHeight) {
                top = position.top - menuRect.height;
            }

            if (top < 0) {
                top = 8;
            }

            setFinalPosition({ top, left });
        }
    }, [position]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    const handleDelete = useCallback(async () => {
        try {
            await api.delete('/api/dashboard/users/delete', { data: { user: userId } });
            onClose();
        } catch (error) {
            console.log(error);
        }
    }, [userId, onClose]);

    return (
        <div
            ref={menuRef}
            className={styles.dropdownMenu}
            style={{
                position: 'fixed',
                top: finalPosition.top,
                left: finalPosition.left,
                zIndex: 1001
            }}
        >
            <button onClick={() => { }} className={styles.dropdownItem}>
                <MdEdit size={18} />
                <span>Editar</span>
            </button>
            <button onClick={() => { }} className={styles.dropdownItem}>
                <MdPersonOff size={18} />
                <span>Desativar</span>
            </button>
            <button onClick={() => { }} className={styles.dropdownItem}>
                <MdBlock size={18} />
                <span>Bloquear</span>
            </button>
            <button onClick={handleDelete} className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}>
                <MdDelete size={18} />
                <span>Excluir</span>
            </button>
        </div>
    );
}