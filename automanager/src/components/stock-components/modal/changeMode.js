import styles from './changeMode.module.css';
import { useEffect, useState } from 'react';
import api from '../../../services/apiInstance'

function ChangeMode({ id }) {
    const [itemData, setItemData] = useState({
        name: '',
        category: '',
        supplier: '',
        sale_price: '',
        minimum_stock: ''
    })

    useEffect(() => {
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
            const response = await api.post('/api/stock/change', itemData)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchItem = async (id) => {
        try {
            const response = await api.post('/api/stock/fetch', { id })
            setItemData(response.data)
            console.log(response.data)
            console.log(itemData)
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
                    <button className={styles.closeButton}>×</button>
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
                            name="category"
                            value={itemData.category}
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
                                name="minimum_stock"
                                value={itemData.minimum_stock}
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

                    <div className={styles.modalActions}>
                        <button
                            type="button"
                            className={styles.cancelButton}
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