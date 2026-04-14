import { useState } from 'react';
import api from '../../../services/apiInstance';
import styles from './stockMovement.module.css';

function StockMovement({ id, type, onClose }) {
    const [dataStockMovement, setDataStockMovement] = useState({
        id: id,
        quantity: 1,
        reason: '',
        type: type
    })

    const title = type === 'input' ? 'Entrada de produto' : type === 'output' ? 'Saída de produto' : ''
    const isEntry = type === 'input' ? true : type === 'output' ? false : null

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/api/stock/movement/${type}`, dataStockMovement)
            onClose();
        } catch (error) {
            console.log(error)
            onClose();
        }
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
                            value={dataStockMovement.quantity}
                            onChange={e => setDataStockMovement(prev => ({
                                ...prev,
                                quantity: parseInt(e.target.value) || 1
                            }))}
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
                            value={dataStockMovement.reason}
                            onChange={e => setDataStockMovement(prev => ({
                                ...prev,
                                reason: e.target.value
                            }))}
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