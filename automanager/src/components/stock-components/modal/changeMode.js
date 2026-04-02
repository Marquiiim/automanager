import styles from './changeMode.module.css';
import { useState } from 'react';
import api from '../../../services/apiInstance'

function ChangeMode({ id }) {

    const [itemData, setItemData] = useState([])
    const [changeInfoData, setChangeInfoData] = useState({
        name: '',
        category: '',
        supplier: '',
        cost: '',
        sale_price: '',
        minimum_stock: ''
    })

    const editStockInfo = async () => {
        try {
            const response = await api.post('/api/stock/change', { changeInfoData })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchItem = async (id) => {
        try {
            const response = await api.post('/api/stock/fetch', { id })
            setItemData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    if (id) fetchItem(id)



    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>
                        Gerênciamento de Produto
                    </h2>
                    <button className={styles.closeButton}>×</button>
                </div>

                <form className={styles.modalForm}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Nome do produto</label>
                        <input
                            type="text"
                            placeholder="Nome do produto"
                            className={styles.formInput}
                            value={id ? itemData.name : changeInfoData.name}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Categoria do produto</label>
                        <select
                            name="category"
                            id="category"
                            value={id ? itemData.name : changeInfoData.name}
                            className={styles.formSelect}
                            defaultValue={itemData ? itemData.category : ''}
                        >
                            <option value="">Selecione uma categoria</option>
                            <option value="manutencao">Manutenção & Lubrificação</option>
                            <option value="freios">Sistema de Freios</option>
                            <option value="suspensao">Suspensão & Direção</option>
                            <option value="motor">Motor & Transmissão</option>
                            <option value="pneus">Pneus & Rodas</option>
                            <option value="eletrica">Elétrica & Iluminação</option>
                            <option value="ar_condicionado">Ar-Condicionado</option>
                            <option value="carroceria">Carroceria & Estética</option>
                            <option value="acessorios">Acessórios Internos</option>
                            <option value="ferramentas">Ferramentas & Equipamentos</option>
                        </select>
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Quantidade</label>
                            <input
                                type="number"
                                name="minimum_stock"
                                id="minimum_stock"
                                value={id ? itemData.minimum_stock : changeInfoData.minimum_stock}
                                placeholder="Quantidade"
                                className={styles.formInput}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Preço Unitário</label>
                            <input
                                type="number"
                                name="sale_price"
                                id="sale_price"
                                value={id ? itemData.sale_price : changeInfoData.sale_price}
                                placeholder="Preço unitário"
                                className={styles.formInput}
                                step="0.01"
                            />
                        </div>
                    </div>

                    <div className={styles.modalActions}>
                        <button
                            type="button"
                            className={styles.cancelButton}
                        >
                            Cancelar
                        </button>
                        <button
                            onSubmit={editStockInfo}
                            type="submit"
                            className={styles.saveButton}
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangeMode