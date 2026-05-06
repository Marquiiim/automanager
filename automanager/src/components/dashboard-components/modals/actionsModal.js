import { MdDelete, MdPersonRemove, MdPersonAdd } from 'react-icons/md';
import { useCallback, useRef, useEffect, useState } from 'react';
import api from '../../../services/apiInstance';
import styles from './actionsModal.module.css';

export default function ActionsModal({ position, onClose, user }) {
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

    const handleDisable = useCallback(async () => {
        try {
            await api.patch(`/api/dashboard/users/disable/${user.id}`)
            onClose()
        } catch (error) {
            console.log(error)
        }
    }, [user.id, onClose])

    const handleDelete = useCallback(async () => {
        try {
            await api.delete(`/api/dashboard/users/delete/${user.id}`)
            onClose()
        } catch (error) {
            console.log(error)
        }
    }, [user.id, onClose])

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
            <button onClick={handleDisable} className={styles.dropdownItem}>
                {user.status === 'ativo' ? (
                    <>
                        <MdPersonRemove size={18} />
                        <span>Desativar</span>
                    </>
                ) : (
                    <>
                        <MdPersonAdd size={18} />
                        <span>Ativar</span>
                    </>
                )}
            </button>
            <button onClick={handleDelete} className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}>
                <MdDelete size={18} />
                <span>Excluir</span>
            </button>
        </div>
    );
}