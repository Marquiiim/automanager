import { useState } from 'react'

import styles from './availablePage.module.css'
import {
    MdShoppingCart,
    MdFilterList,
    MdShoppingBag,
    MdSearchOff
} from 'react-icons/md'

import Filter from '../../components/available-components/filter/filter'

export default function AvailablePage() {

    const [showFilter, setShowFilter] = useState(false)

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
                    <button onClick={() => setShowFilter(true)}
                        className={`${styles.filterButton} ${styles.filterButtonActive}`}>
                        <MdFilterList /> Filtrar
                    </button>
                </div>

                <div className={styles.productsGrid}>
                    <div className={styles.productCard}>
                        <div className={styles.productInfo}>
                            <span className={styles.productCategory}>
                                Category Name
                            </span>
                            <h3 className={styles.productName}>
                                Name
                            </h3>
                            <p className={styles.productDescription}>
                                Description
                            </p>
                            <div className={styles.productPrice}>
                                R$ Value
                            </div>
                            <div className={styles.productActions}>
                                <button className={styles.buyButton}>
                                    <MdShoppingBag /> Comprar
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.emptyState}>
                        <span className={styles.emptyIcon}><MdSearchOff /></span>
                        <p className={styles.emptyText}>Nenhum produto encontrado</p>
                        <p className={styles.emptySubtext}>Tente buscar por outro termo</p>
                    </div>

                </div>
            </div>
            {showFilter && <Filter />}
        </section>
    )
}