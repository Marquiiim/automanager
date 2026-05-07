import * as dashboardService from '../services/dashboardService.js'

async function getKpi(req, res) {
    try {
        const kpis = await dashboardService.getKpis()

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
        const charts = await dashboardService.getCharts()

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

async function listUsers(req, res) {
    try {
        const { page, limit } = req.body

        const users = await dashboardService.findAllUsers(page, limit)

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

async function removeUser(req, res) {
    try {
        await dashboardService.removeUsers(req.params.id)

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

async function disableUser(req, res) {
    try {
        await dashboardService.disableUsers(req.params.id)

        return res.status(200).json({
            success: true,
            message: 'Usuário desabilitado com sucesso'
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

async function getUsersActivity(req, res) {
    try {
        const { page, limit } = req.query.pagination

        const actions = await dashboardService.getAllActivities(page, limit)

        return res.status(200).json({
            success: true,
            activities: actions
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.mesage
        })
    }
}

export {
    getKpi,
    getChart,
    listUsers,
    removeUser,
    disableUser,
    getUsersActivity
}