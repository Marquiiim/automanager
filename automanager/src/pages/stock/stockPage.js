import { useState } from 'react';

import styles from './stockPage.module.css';
import ChangeMode from '../../components/stock-components/modal/changeMode';

const StockPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false)

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
                            onClick={() => setIsModalOpen(true)}
                            className={styles.entryButton}
                        >
                            Nova Entrada
                        </button>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className={styles.exitButton}
                        >
                            Nova Saída
                        </button>
                    </div>
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <div>
                                <p className={styles.statLabel}>Total de Produtos</p>
                                <p className={styles.statValue}>Quantidade de produtos</p>
                            </div>
                        </div>
                        <p className={styles.statTrend}>+12% este mês</p>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <div>
                                <p className={styles.statLabel}>Valor Total em Estoque</p>
                                <p className={styles.statValue}>
                                    R$ Valor total do estoque
                                </p>
                            </div>
                        </div>
                        <p className={styles.statUpdate}>Atualizado agora</p>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <div>
                                <p className={styles.statLabel}>Itens Baixos</p>
                                <p className={styles.statValueWarning}>37</p>
                            </div>
                        </div>
                        <p className={styles.warningText}>Atenção necessária</p>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <div>
                                <p className={styles.statLabel}>Sem Estoque</p>
                                <p className={styles.statValueDanger}>14</p>
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

                        <button className={styles.filterButton}>
                            Filtros
                        </button>
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
                                <tr className={styles.tableRow}>
                                    <td className={styles.tdCode}>Id</td>
                                    <td className={styles.tdName}>Nome</td>
                                    <td className={styles.tdCategory}>Categoria</td>
                                    <td className={styles.tdCenter}>
                                        <span className={styles.quantity}>
                                            Quantidade un
                                        </span>
                                    </td>
                                    <td className={styles.tdRight}>
                                        R$ Preço
                                    </td>
                                    <td className={styles.tdTotal}>
                                        R$ Valor total
                                    </td>
                                    <td className={styles.tdCenter}>
                                        <div className={styles.actionButtons}>
                                            <button className={styles.editButton} title="Editar">
                                                ✏️
                                            </button>
                                            <button className={styles.entryActionButton} title="Entrada">
                                                +
                                            </button>
                                            <button className={styles.exitActionButton} title="Saída">
                                                −
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <ChangeMode />
            )}
        </section>
    );
};

export default StockPage;