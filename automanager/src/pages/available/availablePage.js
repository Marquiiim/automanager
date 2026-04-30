import {
    useState,
    useEffect,
    useMemo,
    useCallback,
    useRef
} from 'react'
import {
    MdShoppingCart,
    MdFilterList,
    MdShoppingBag,
    MdSearchOff,
    MdClear
} from 'react-icons/md'
import { textFormat } from '../../utils/general/formatTextBd'
import api from '../../services/apiInstance'
import styles from './availablePage.module.css'

import Cart from '../../components/available-components/modals/cart'
import Filter from '../../components/available-components/modals/filter'

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
    const [searchTerm, setSearchTerm] = useState('');
    const [finalizePurchase, setFinalizePurchase] = useState(false)
    const [cartItemCount, setCartItemCount] = useState(0)
    const cartRef = useRef(null)

    const filteredItems = useMemo(() => {
        if (!searchTerm.trim()) return itemsData.data

        const term = searchTerm.toLowerCase()
        return itemsData.data.filter(item =>
            item.name.toLowerCase().includes(term) ||
            item.category_name?.toLowerCase().includes(term))
    }, [itemsData.data, searchTerm])

    const fetchItemsStock = useCallback(async (pagination) => {
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
    }, [])

    const handleFilter = useCallback(async () => {
        try {
            const response = await api.get('/api/available/getfilters')
            const formattedData = textFormat(response.data.filters, ['name'])
            setAvailableFilters({ show: true, data: formattedData })
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleCart = useCallback((item) => {
        if (cartRef.current) cartRef.current.addToCart(item)
    }, [])

    const handleCartUpdate = useCallback((total) => {
        setCartItemCount(total)
    }, [])

    const collectData = useCallback((data) => {
        setItemsData({
            data: data,
            hasActiveFilters: true
        })
    }, [])

    const closeModal = useCallback(() => {
        if (availableFilters.show) {
            setAvailableFilters({
                show: false,
                data: []
            })
        } else if (finalizePurchase) {
            setFinalizePurchase(false)
        }
    }, [availableFilters.show, finalizePurchase])

    useEffect(() => {
        if (!itemsData.hasActiveFilters) fetchItemsStock(pagination)
    }, [fetchItemsStock, itemsData.hasActiveFilters, pagination])

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
                        <button onClick={() => setFinalizePurchase(true)}
                            className={styles.cartButton}>
                            <MdShoppingCart /> Carrinho ({cartItemCount})
                        </button>
                    </div>
                </div>

                <div className={styles.productsHeader}>
                    <h2 className={styles.productsTitle}>Nossos Produtos</h2>

                    <div className={styles.searchWrapper}>
                        <input
                            type="text"
                            placeholder="Buscar por produto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                        setSearchTerm('')
                    }}
                        disabled={!itemsData.hasActiveFilters && !searchTerm}
                        className={styles.clearFiltersBtn}>
                        <MdClear /> Limpar
                    </button>
                </div>

                <div className={styles.productsGrid}>
                    {filteredItems.length > 0 ? (
                        filteredItems.map(item => (
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
                                        <button onClick={() => handleCart(item)}
                                            className={styles.buyButton}>
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
                        disabled={pagination.page === 1 || itemsData.hasActiveFilters || searchTerm}
                    >
                        Anterior
                    </button>
                    <span className={styles.paginationInfo}>
                        {itemsData.hasActiveFilters || searchTerm ? (
                            'Paginação desativada durante filtragem'
                        ) : (
                            `Página ${pagination.page} de ${Math.ceil(metricsAndInfo.totalItems / pagination.limit) || 1}`
                        )
                        }
                    </span>
                    <button
                        className={styles.paginationBtn}
                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                        disabled={pagination.page >= Math.ceil(metricsAndInfo.totalItems / pagination.limit) || itemsData.hasActiveFilters || searchTerm}
                    >
                        Próxima
                    </button>
                </div>
            </div>

            <Cart
                ref={cartRef}
                onClose={closeModal}
                isOpen={finalizePurchase}
                onCartUpdate={handleCartUpdate}
            />

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