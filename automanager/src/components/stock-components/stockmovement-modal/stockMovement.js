import { useState } from 'react';
import api from '../../../services/apiInstance';
import styles from './stockMovement.module.css';

function StockMovement({ id, type, onClose }) {
    const [quantity, setQuantity] = useState(1);
    const [reason, setReason] = useState('');

    const isEntry = type === 'entry';
    const title = isEntry ? 'Entrada de Produto' : 'Saída de Produto';

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value) || 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Produto ${id}: ${isEntry ? 'Entrada' : 'Saída'} de ${quantity} unidades`);
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>
                        {title}
                    </h2>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.modalForm}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                            Quantidade {isEntry ? 'a adicionar' : 'a retirar'}
                        </label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className={styles.quantityInput}
                            min="1"
                            step="1"
                            autoFocus
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                            Motivo (opcional)
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className={styles.reasonInput}
                            placeholder={isEntry ?
                                "Ex: Compra de fornecedor, Devolução de cliente..." :
                                "Ex: Venda, Uso interno, Perda..."
                            }
                            rows="3"
                        />
                    </div>

                    <div className={styles.modalActions}>
                        <button
                            type="button"
                            onClick={onClose}
                            className={styles.cancelButton}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={styles.submitButton}
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StockMovement;