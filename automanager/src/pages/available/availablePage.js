import { useState, useEffect } from 'react'
import { textFormat } from '../../utils/general/formatTextBd'
import api from '../../services/apiInstance'

import styles from './availablePage.module.css'
import {
    MdShoppingCart,
    MdFilterList,
    MdShoppingBag,
    MdSearchOff,
    MdClear
} from 'react-icons/md'

import Filter from '../../components/available-components/filter/filter'

export default function AvailablePage() {
    const [availableFilters, setAvailableFilters] = useState({
        show: false,
        data: []
    })
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 15
    })
    const [metricsAndInfo, setMetricsAndInfo] = useState({
        totalItems: 0,
        metrics: {}
    })
    const [itemsData, setItemsData] = useState({
        data: [],
        hasActiveFilters: false
    })

    const fetchItemsStock = async (pagination) => {
        try {
            const response = await api.post('/api/stock/in-stock', pagination)
            const formattedData = textFormat(response.data.result.paginatedItems, ['category_name'])
            setItemsData({
                data: formattedData,
                hasActiveFilters: false
            })
            setMetricsAndInfo({
                totalItems: response.data.result.metricsResult.totalItems,
                metrics: response.data.result.metricsResult.metrics
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleFilter = async () => {
        try {
            const response = await api.get('/api/available/getfilters')
            const formattedData = textFormat(response.data.filters, ['name'])
            setAvailableFilters({ show: true, data: formattedData })
        } catch (error) {
            console.log(error)
        }
    }

    const collectData = (data) => {
        setItemsData({
            data: data,
            hasActiveFilters: true
        })
    }

    const closeModal = () => {
        setAvailableFilters({
            show: false,
            data: []
        })
    }

    useEffect(() => {
        if (!itemsData.hasActiveFilters) fetchItemsStock(pagination)
    }, [pagination, itemsData.hasActiveFilters])

    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>
                            Produtos Disponíveis
                        </h1>
                        <p className={styles.subtitle}>Encontre os melhores produtos para você</p>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button className={styles.cartButton}>
                            <MdShoppingCart /> Carrinho
                        </button>
                    </div>
                </div>

                <div className={styles.productsHeader}>
                    <h2 className={styles.productsTitle}>Nossos Produtos</h2>

                    <div className={styles.searchWrapper}>
                        <input
                            type="text"
                            placeholder="Buscar por produto..."
                            className={styles.searchInput}
                        />
                    </div>
                </div>

                <div className={styles.filtersContainer}>
                    <button onClick={handleFilter}
                        className={`${styles.filterButton} ${styles.filterButtonActive}`}>
                        <MdFilterList /> Filtrar
                    </button>
                    <button onClick={() => {
                        setItemsData({ data: [], hasActiveFilters: false })
                        setPagination({ page: 1, limit: 15 })
                    }}
                        disabled={!itemsData.hasActiveFilters}
                        className={styles.clearFiltersBtn}>
                        <MdClear /> Limpar
                    </button>
                </div>

                <div className={styles.productsGrid}>
                    {itemsData.data.length > 0 ? (
                        itemsData.data.map(item => (
                            <div key={item.id} className={styles.productCard}>
                                <div className={styles.productInfo}>
                                    <span className={styles.productCategory}>
                                        {item.category_name}
                                    </span>
                                    <h3 className={styles.productName}>
                                        {item.name}
                                    </h3>
                                    <p className={styles.productDescription}>
                                        Marca/Fornecedor: {item.supplier}
                                    </p>
                                    <div className={styles.productPrice}>
                                        R$ {item.sale_price}
                                    </div>
                                    <div className={styles.productActions}>
                                        <button className={styles.buyButton}>
                                            <MdShoppingBag /> Comprar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.emptyState}>
                            <span className={styles.emptyIcon}><MdSearchOff /></span>
                            <p className={styles.emptyText}>Nenhum produto encontrado</p>
                            <p className={styles.emptySubtext}>Tente buscar por outro termo</p>
                        </div>
                    )}
                </div>

                <div className={styles.paginationContainer}>
                    <button
                        className={styles.paginationBtn}
                        onClick={() => setPagination(prev => ({ ...prev, page: Math.max(prev.page - 1, 1) }))}
                        disabled={pagination.page === 1 || itemsData.hasActiveFilters}
                    >
                        Anterior
                    </button>
                    <span className={styles.paginationInfo}>
                        {itemsData.hasActiveFilters ? (
                            'Paginação desativada durante filtragem'
                        ) : (
                            `Página ${pagination.page} de ${Math.ceil(metricsAndInfo.totalItems / pagination.limit) || 1}`
                        )
                        }
                    </span>
                    <button
                        className={styles.paginationBtn}
                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                        disabled={pagination.page >= Math.ceil(metricsAndInfo.totalItems / pagination.limit) || itemsData.hasActiveFilters}
                    >
                        Próxima
                    </button>
                </div>
            </div>

            {availableFilters.show && (
                <Filter
                    filters={availableFilters.data}
                    itemsData={collectData}
                    onClose={closeModal}
                />
            )}
        </section>
    )
}