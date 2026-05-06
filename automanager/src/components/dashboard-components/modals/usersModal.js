import { createPortal } from 'react-dom';
import {
    MdClose,
    MdMoreVert,
    MdNavigateBefore,
    MdNavigateNext,
    MdPersonOutline
} from 'react-icons/md';
import { useState } from 'react';
import styles from './usersModal.module.css';
import ActionsModal from './actionsModal';

export default function UsersModal({ data, pagination, onClose }) {
    const [actionsModal, setActionsModal] = useState({
        show: false,
        position: { top: 0, left: 0 },
        selectedUser: null
    });

    const handleOpenActions = (e, user) => {
        const buttonRect = e.currentTarget.getBoundingClientRect();

        setActionsModal({
            show: true,
            position: {
                top: buttonRect.top,
                left: buttonRect.right,
            },
            selectedUser: user
        });
    };

    const handleCloseActions = () => {
        setActionsModal({
            show: false,
            position: { top: 0, left: 0 },
            selectedUser: null
        });
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>
                        <MdPersonOutline size={20} />
                        Todos os Usuários
                    </h3>
                    <button onClick={onClose}>
                        <MdClose size={18} />
                    </button>
                </div>

                <div className={styles.modalBody}>
                    <div className={styles.tableHeader}>
                        <span className={styles.tableTitle}>Lista completa de usuários</span>
                        <div className={styles.tableActions}>
                        </div>
                    </div>

                    <table className={styles.usersTable}>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Função</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length > 0 ? (
                                data.map(user => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className={styles.userCell}>
                                                <span className={styles.userName}>{user.name}</span>
                                            </div>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`${styles.roleBadge} ${user.role === 'admin' ? styles.roleAdmin : styles.roleUser}`}>
                                                {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`${styles.badge} ${user.status === 'ativo' ? styles.badgeActive : styles.badgeInactive}`}>
                                                {user.status === 'ativo' ? 'Ativo' : 'Inativo'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className={styles.rowActions}>
                                                <button
                                                    onClick={(e) => handleOpenActions(e, user)}
                                                    className={styles.btnIcon}
                                                >
                                                    <MdMoreVert size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className={styles.tableEmpty}>
                                    <td colSpan={5}>
                                        <span>Nenhum usuário encontrado</span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className={styles.pagination}>
                        <div className={styles.paginationControls}>
                            <button onClick={() => pagination('previous')} className={styles.paginationBtn}>
                                <MdNavigateBefore size={16} />
                                Anterior
                            </button>
                            <button onClick={() => pagination('next')} className={styles.paginationBtn}>
                                Próximo
                                <MdNavigateNext size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className={styles.modalFooter}>
                    <button onClick={onClose} className={styles.closeButton}>
                        Fechar
                    </button>
                </div>
            </div>

            {actionsModal.show && createPortal(
                <ActionsModal
                    position={actionsModal.position}
                    onClose={handleCloseActions}
                    user={actionsModal.selectedUser}
                />,
                document.body
            )}
        </div>
    );
}