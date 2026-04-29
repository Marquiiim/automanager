import dashboard from "../models/dashboardmodels.js"

async function getKpiMetrics() {
    try {
        const metrics = await dashboard.fetchKpiMetricsDB()

        return {
            data: metrics
        }
    } catch (error) {
        throw error
    }
}

async function getChartMetrics() {
    try {
        const metrics = await dashboard.fetchChartMetricsDB()

        return {
            data: metrics
        }
    } catch (error) {
        throw error
    }
}

export {
    getKpiMetrics,
    getChartMetrics
}