import {
    useState,
    useEffect,
    useCallback
} from 'react'
import api from '../../services/apiInstance'
import Delta from '../../utils/dashboard/deltaStyle'
import {
    MdWarning,
    MdErrorOutline,
    MdDangerous
} from 'react-icons/md'
import styles from './kpis.module.css'

export default function KPIs() {
    const [metrics, setMetrics] = useState({
        kpi: {
            revenue: { total: 0, percentage: 0 },
            criticalProducts: { total: 0, percentage: 0 },
            breakageRate: { percentage: 0, proportion: 0 },
            inventoryTurnover: { total: 0, percentage: 0 }
        },
    })

    const fetchKpiMetrics = useCallback(async () => {
        try {
            const response = await api.get('/api/dashboard/kpis')
            setMetrics(data => ({ ...data, kpi: response.data.kpis }))
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        fetchKpiMetrics()
    }, [fetchKpiMetrics])

    return (
        <div className={styles.kpiGrid}>
            <div className={styles.kpiCard}>
                <div className={styles.kpiCardHeader}>
                    <span className={styles.kpiCardLabel}>Receita Total</span>
                    <div className={`${styles.kpiCardIcon} ${styles.kpiCardIconBlue}`}>$</div>
                </div>
                <div className={styles.kpiCardValue}>R$ {metrics.kpi.revenue.total}</div>
                <div className={styles.kpiCardFooter}>
                    <Delta value={metrics.kpi.revenue.percentage} />
                    <span className={styles.kpiCardPeriod}>vs mês anterior</span>
                </div>
            </div>

            <div className={styles.kpiCard}>
                <div className={styles.kpiCardHeader}>
                    <span className={styles.kpiCardLabel}>Produtos Críticos</span>
                    <div className={`${styles.kpiCardIcon} ${styles.kpiCardIconRed}`}>
                        <MdDangerous />
                    </div>
                </div>
                <div className={styles.kpiCardValue}>{metrics.kpi.criticalProducts.total}</div>
                <div className={styles.kpiCardFooter}>
                    <Delta value={metrics.kpi.criticalProducts.percentage} />
                    <span className={styles.kpiCardPeriod}>do catálogo</span>
                </div>
            </div>

            <div className={styles.kpiCard}>
                <div className={styles.kpiCardHeader}>
                    <span className={styles.kpiCardLabel}>Taxa de Ruptura</span>
                    <div className={`${styles.kpiCardIcon} ${styles.kpiCardIconYellow}`}>
                        <MdWarning />
                    </div>
                </div>
                <div className={styles.kpiCardValue}>{metrics.kpi.breakageRate.percentage}%</div>
                <div className={styles.kpiCardFooter}>
                    <span className={styles.kpiCardPeriod}>{metrics.kpi.breakageRate.proportion} de proporção</span>
                </div>
            </div>

            <div className={styles.kpiCard}>
                <div className={styles.kpiCardHeader}>
                    <span className={styles.kpiCardLabel}>Giro de Estoque</span>
                    <div className={`${styles.kpiCardIcon} ${styles.kpiCardIconGreen}`}>
                        <MdErrorOutline />
                    </div>
                </div>
                <div className={styles.kpiCardValue}>{metrics.kpi.inventoryTurnover.total}%</div>
                <div className={styles.kpiCardFooter}>
                    <Delta value={metrics.kpi.inventoryTurnover.percentage} />
                    <span className={styles.kpiCardPeriod}>vs mês anterior</span>
                </div>
            </div>
        </div>
    )
}