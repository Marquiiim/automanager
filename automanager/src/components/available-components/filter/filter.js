import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import styles from './filter.module.css'
import api from '../../../services/apiInstance'

export default function Filter({ filters, itemsData, onClose }) {
    const [selectedFilters, setSelectedFilters] = useState([])

    const fetchItems = async () => {
        try {
            const response = await api.get('/api/available/filtered-items', {
                params: { selectedFilters }
            })
            itemsData(response.data.items)
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>Filtrar</h3>
                    <button onClick={onClose}>
                        <MdClose size={20} />
                    </button>
                </div>

                <div className={styles.modalBody}>
                    {filters.map(option => (
                        <label key={option.id} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={selectedFilters.some(item => item.name === option.name)}
                                onChange={() => {
                                    if (selectedFilters.some(item => item.name === option.name))
                                        setSelectedFilters(selectedFilters.filter(item => item.name !== option.name))
                                    else
                                        setSelectedFilters(filters => [...filters, { id: option.id, name: option.name }])
                                }}
                            />
                            {option.name}
                        </label>
                    ))}
                </div>

                <div className={styles.modalFooter}>
                    <button onClick={() => setSelectedFilters([])}>
                        Limpar
                    </button>
                    <button onClick={fetchItems}>
                        Aplicar
                    </button>
                </div>
            </div>
        </div>
    )
}