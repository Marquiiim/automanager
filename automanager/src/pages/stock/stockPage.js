import { useEffect, useMemo, useState } from 'react';
import api from '../../services/apiInstance';

import styles from './stockPage.module.css';
import ChangeMode from '../../components/stock-components/change-modal/changeMode';
import StockMovement from '../../components/stock-components/stockmovement-modal/stockMovement';

const StockPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsData, setItemsData] = useState([])
    const [metricsAndInfo, setMetricsAndInfo] = useState({
        totalItems: 0,
        metrics: {}
    })

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 15
    })

    const [modal, setModal] = useState({
        open: false,
        itemId: null,
        type: null
    })

    const filteredItems = useMemo(() => {
        if (!searchTerm.trim()) return itemsData

        const term = searchTerm.toLowerCase()
        return itemsData.filter(item =>
            item.id.toString().includes(term) ||
            item.name.toLowerCase().includes(term) ||
            item.category_name?.toLowerCase().includes(term)
        )
    }, [itemsData, searchTerm])

    const fetchAllStock = async (pagination) => {
        try {
            const response = await api.post(`/api/stock/in-stock`, pagination)
            setItemsData(response.data.result.paginatedItems)
            setMetricsAndInfo({ totalItems: response.data.result.metricsResult.totalItems, metrics: response.data.result.metricsResult.metrics })
        } catch (error) {
            console.log(error)
        }
    }

    const closeModal = () => {
        setModal({
            open: false,
            itemId: null,
            type: null
        })
    }

    useEffect(() => {
        fetchAllStock(pagination)
    }, [pagination])

    return (
        <section className={styles.container}>
            <div className={styles.content}>

                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>
                            Gerenciamento de Estoque
                        </h1>
                        <p className={styles.subtitle}>Controle completo do seu inventário</p>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button
                            onClick={() => setModal({
                                open: true,
                                itemId: null,
                                type: 'create'
                            })}
                            className={styles.entryButton}
                        >
                            Nova Entrada
                        </button>
                    </div>
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <div>
                                <p className={styles.statLabel}>Total de Produtos</p>
                                <p className={styles.statValue}>{metricsAndInfo.metrics.totalProductsStock}</p>
                            </div>
                        </div>
                        <p className={styles.statTrend}>+0% este mês</p>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <div>
                                <p className={styles.statLabel}>Valor Total em Estoque</p>
                                <p className={styles.statValue}>
                                    R$ {metricsAndInfo.metrics.totalStockValue}
                                </p>
                            </div>
                        </div>
                        <p className={styles.statUpdate}>Atualizado agora</p>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <div>
                                <p className={styles.statLabel}>Itens Baixos</p>
                                <p className={styles.statValueWarning}>{metricsAndInfo.metrics.lowStockItems}</p>
                            </div>
                        </div>
                        <p className={styles.warningText}>Atenção necessária</p>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <div>
                                <p className={styles.statLabel}>Sem Estoque</p>
                                <p className={styles.statValueDanger}>{metricsAndInfo.metrics.outStockItems}</p>
                            </div>
                        </div>
                        <p className={styles.dangerText}>Urgente</p>
                    </div>
                </div>

                <div className={styles.tableContainer}>
                    <div className={styles.tableHeader}>
                        <h2 className={styles.tableTitle}>Produtos em Estoque</h2>

                        <div className={styles.searchWrapper}>
                            <input
                                type="text"
                                placeholder="Buscar por código ou nome do produto..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={styles.searchInput}
                            />
                        </div>
                    </div>

                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead className={styles.tableHead}>
                                <tr>
                                    <th className={styles.thLeft}>Código</th>
                                    <th className={styles.thLeft}>Produto</th>
                                    <th className={styles.thLeft}>Categoria</th>
                                    <th className={styles.thCenter}>Quantidade</th>
                                    <th className={styles.thRight}>Preço Unitário</th>
                                    <th className={styles.thRight}>Valor Total</th>
                                    <th className={styles.thCenter}>Ações</th>
                                </tr>
                            </thead>
                            <tbody className={styles.tableBody}>
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((item) => (
                                        <tr key={item.id} className={styles.tableRow}>
                                            <td className={styles.tdCode}>{item.id}</td>
                                            <td className={styles.tdName}>{item.name}</td>
                                            <td className={styles.tdCategory}>{item.category_name}</td>
                                            <td className={styles.tdCenter}>
                                                <span className={styles.quantity}>
                                                    {item.current_stock}
                                                </span>
                                            </td>
                                            <td className={styles.tdRight}>
                                                R$ {parseFloat(item.sale_price).toFixed(2)}
                                            </td>
                                            <td className={styles.tdTotal}>
                                                R$ {(parseFloat(item.sale_price) * item.current_stock).toFixed(2)}
                                            </td>
                                            <td className={styles.tdCenter}>
                                                <div className={styles.actionButtons}>
                                                    <button className={styles.editButton}
                                                        title="Editar"
                                                        onClick={() => setModal({
                                                            open: true,
                                                            itemId: item.id,
                                                            type: 'adjustment'
                                                        })}
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button className={styles.entryActionButton}
                                                        title="Entrada"
                                                        onClick={() => setModal({
                                                            open: true,
                                                            itemId: item.id,
                                                            type: 'input'
                                                        })}
                                                    >
                                                        +
                                                    </button>
                                                    <button className={styles.exitActionButton}
                                                        title="Saída"
                                                        onClick={() => setModal({
                                                            open: true,
                                                            itemId: item.id,
                                                            type: 'output'
                                                        })}
                                                    >
                                                        −
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                    )
                                ) : (
                                    <tr className={styles.tableNotFound}>
                                        <td colSpan="7" className={styles.notFound}>
                                            NENHUM ITEM ENCONTRADO EM ESTOQUE
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className={styles.paginationContainer}>
                            <button
                                className={styles.paginationBtn}
                                onClick={() => setPagination(prev => ({ ...prev, page: Math.max(prev.page - 1, 1) }))}
                                disabled={pagination.page === 1}
                            >
                                Anterior
                            </button>
                            <span className={styles.paginationInfostyles}>
                                Página {pagination.page} de {Math.ceil(metricsAndInfo.totalItems / pagination.limit) || 1}
                            </span>
                            <button
                                className={styles.paginationBtn}
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                                disabled={pagination.page >= Math.ceil(metricsAndInfo.totalItems / pagination.limit)}
                            >
                                Próxima
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            {modal.open && (
                (modal.type === 'input' ||
                    modal.type === 'output') ? (
                    <StockMovement id={modal.itemId}
                        type={modal.type}
                        onClose={closeModal} />
                ) : (
                    <ChangeMode id={modal.itemId}
                        onClose={closeModal} />
                )
            )}

        </section>
    );
};

export default StockPage;