import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import styles from './filter.module.css'
import api from '../../../services/apiInstance'

export default function Filter() {
    const [isOpen, setIsOpen] = useState(true)
    const [selectedFilters, setSelectedFilters] = useState([])
    const [filterOptions, setFilterOptions] = useState([])

    const getFilterOptions = async () => {
        try {
            const response = await api.get('/api/available/stock-items')
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFilterOptions()
    }, [])

    if (!isOpen) return null

    return (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>Filtrar</h3>
                    <button onClick={() => setIsOpen(false)}>
                        <MdClose size={20} />
                    </button>
                </div>

                <div className={styles.modalBody}>
                    {filterOptions.map(option => (
                        <label key={option} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={selectedFilters.includes(option)}
                                onChange={(e) => e.preventDefault()}
                            />
                            {option}
                        </label>
                    ))}
                </div>

                <div className={styles.modalFooter}>
                    <button onClick={() => setSelectedFilters([])}>
                        Limpar
                    </button>
                    <button onClick={() => setIsOpen(false)}>
                        Aplicar
                    </button>
                </div>
            </div>
        </div>
    )
}