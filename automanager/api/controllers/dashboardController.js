import {
    getKpiMetricsService,
    getChartMetricsService,
    getAllUsersService,
    deleteUserService
} from '../services/dashboardService.js'

async function getKpi(req, res) {
    try {
        const kpis = await getKpiMetricsService()

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
        const charts = await getChartMetricsService()

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

async function getUsers(req, res) {
    try {
        const { page, limit } = req.body

        const users = await getAllUsersService(page, limit)

        return res.status(200).json({
            success: true,
            users: users
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

async function deleteUser(req, res) {
    try {
        const isDeleted = await deleteUserService(req.body.user)

        return res.status(200).json({
            success: true,
            message: 'Usuário deletado com sucesso'
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
    getChart,
    getUsers,
    deleteUser
}