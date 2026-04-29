import {
    getKpiMetrics,
    getChartMetrics
} from '../services/dashboardService.js'

async function getKpi(req, res) {
    try {
        const kpis = await getKpiMetrics()

        return res.status(200).json({
            success: true,
            kpis
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

async function getChart(req, res) {
    try {
        const charts = await getChartMetrics()

        return res.status(200).json({
            success: true,
            charts
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export {
    getKpi,
    getChart
}