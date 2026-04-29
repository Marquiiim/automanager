import { useState, useEffect } from 'react'

import api from '../../services/apiInstance'

import KPIs from '../../components/dashboard-components/kpis'
import Charts from '../../components/dashboard-components/charts'
import Actions from '../../components/dashboard-components/actions'

import { MdNotifications } from 'react-icons/md'
import styles from './dashboard.module.css'

export default function Dashboard() {
    const [metrics, setMetrics] = useState({
        kpi: {
            revenue: { total: 0, percentage: 0 },
            criticalProducts: { total: 0, percentage: 0 },
            breakageRate: { percentage: 0, proportion: 0 },
            inventoryTurnover: { total: 0, percentage: 0 }
        },
        chart: {
            bar: [],
            pie: []
        },
        actions: {}
    })

    const fetchKpiMetrics = async () => {
        try {
            const response = await api.get('/api/dashboard/kpis')
            setMetrics(data => ({ ...data, kpi: response.data.kpis.data }))
        } catch (error) {
            console.log(error)
        }
    }

    const fetchChartMetrics = async () => {
        try {
            const response = await api.get('/api/dashboard/charts')
            setMetrics(data => ({ ...data, chart: response.data.charts.data }))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchKpiMetrics()
        fetchChartMetrics()
    }, [])

    return (
        <div className={styles.layout}>
            <div className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.headerLeft}>
                        <div>
                            <h1 className={styles.headerTitle}>Visão Geral</h1>
                            <p className={styles.headerSubtitle}>Acompanhe as métricas e atividades do seu negócio</p>
                        </div>
                    </div>

                    <div className={styles.headerRight}>
                        <button className={styles.headerIconBtn}>
                            <MdNotifications />
                            <span className={styles.headerIconBtnBadge} />
                        </button>
                    </div>
                </header>

                <main className={styles.content}>
                    <KPIs metrics={metrics} />
                    <Charts revenueData={metrics.chart.bar} productsData={metrics.chart.pie} />
                    <Actions />
                </main>
            </div>
        </div>
    )
}