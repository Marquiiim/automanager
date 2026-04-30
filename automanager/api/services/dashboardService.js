import dashboard from "../models/dashboardmodels.js"

async function getKpiMetricsService() {
    try {
        const metrics = await dashboard.fetchKpiMetricsDB()

        return metrics
    } catch (error) {
        throw error
    }
}

async function getChartMetricsService() {
    try {
        const metrics = await dashboard.fetchChartMetricsDB()

        return metrics
    } catch (error) {
        throw error
    }
}

async function getAllUsersService(page, limit) {
    try {
        const offset = (page - 1) * limit

        const users = await dashboard.fetchAllUsersDB(limit, offset)

        return users
    } catch (error) {
        throw error
    }
}

async function deleteUserService(userId) {
    try {
        await dashboard.deleteUserDB(userId)
    } catch (error) {
        throw error
    }
}

export {
    getKpiMetricsService,
    getChartMetricsService,
    getAllUsersService,
    deleteUserService
}