import { getKpiMetrics } from '../services/dashboardService.js'

async function getMetrics(req, res) {
    try {
        const metrics = await getKpiMetrics()

        return res.status(200).json({
            success: true,
            data: metrics
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


export {
    getMetrics
}