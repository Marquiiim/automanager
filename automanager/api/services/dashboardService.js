import dashboard from "../models/dashboardmodels.js"

async function getKpiMetrics() {
    try {
        const metrics = await dashboard.fetchMetricsFromDB()

        return {
            total_revenue: 0,
            total_newUsers: 0,
            rupture_rate: 0,
            stock_turnover: 0
        }
    } catch (error) {
        throw error
    }
}

export {
    getKpiMetrics
}