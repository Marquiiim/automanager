import styles from './changeMode.module.css';
import { useEffect, useState } from 'react';
import { getChangedFields } from '../../../utils/stock/changedFields'
import api from '../../../services/apiInstance'

function ChangeMode({ id, onClose }) {
    const [originalItemData, setOriginalItemData] = useState({})
    const [itemData, setItemData] = useState({
        name: '',
        category_name: '',
        supplier: '',
        sale_price: '',
        current_stock: ''
    })

    useEffect(() => {
        const fetchItem = async (itemId) => {
            try {
                const response = await api.post('/api/stock/fetch', { id: itemId })
                const { name, category_name, supplier, sale_price, current_stock, updated_at } = response.data.item
                setOriginalItemData(response.data.item)
                setItemData({
                    name,
                    category_name,
                    supplier,
                    sale_price,
                    current_stock,
                    updated_at
                })
            } catch (error) {
                console.log(error)
            }
        }

        if (id) fetchItem(id)
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target

        setItemData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const changedInfo = getChangedFields(originalItemData, itemData)
            changedInfo.id = id
            if (Object.keys(changedInfo).length === 1) return onClose()

            await api.post('/api/stock/change', changedInfo)
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>
                        Gerênciamento de Produto
                    </h2>
                    <button className={styles.closeButton}
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <form className={styles.modalForm} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Nome do produto</label>
                        <input
                            type="text"
                            name='name'
                            placeholder="Nome do produto"
                            className={styles.formInput}
                            value={itemData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Nome do fornecedor</label>
                        <input
                            type="text"
                            name='supplier'
                            placeholder="Nome do fornecedor"
                            className={styles.formInput}
                            value={itemData.supplier}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Categoria do produto</label>
                        <select
                            name="category_name"
                            value={itemData.category_name}
                            className={styles.formSelect}
                            onChange={handleChange}
                            required
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
                                name="current_stock"
                                value={itemData.current_stock}
                                className={styles.formInput}
                                onChange={handleChange}
                                placeholder="Quantidade"
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Preço Unitário</label>
                            <input
                                type="number"
                                name="sale_price"
                                value={itemData.sale_price}
                                className={styles.formInput}
                                onChange={handleChange}
                                placeholder="Preço unitário"
                                step="0.01"
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.lastUpdateInfo}>
                        <span className={styles.lastUpdateLabel}>Última atualização:</span>
                        <span className={styles.lastUpdateDate}>{itemData.updated_at ? new Date(itemData.updated_at).toLocaleString('pt-BR') : 'Item sem data'}</span>
                    </div>

                    <div className={styles.modalActions}>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
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