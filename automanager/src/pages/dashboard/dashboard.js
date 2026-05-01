import KPIs from '../../components/dashboard-components/kpis'
import Charts from '../../components/dashboard-components/charts'
import Actions from '../../components/dashboard-components/actions'
import { MdNotifications } from 'react-icons/md'
import styles from './dashboard.module.css'

export default function Dashboard() {
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
                    <KPIs />
                    <Charts />
                    <Actions />
                </main>
            </div>
        </div>
    )
}