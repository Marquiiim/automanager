import dashboard from "../models/dashboardmodels.js"

async function getKpis() {
    try {
        const metrics = await dashboard.getKpis()

        return metrics
    } catch (error) {
        throw error
    }
}

async function getCharts() {
    try {
        const metrics = await dashboard.getCharts()

        return metrics
    } catch (error) {
        throw error
    }
}

async function findAllUsers(page, limit) {
    try {
        const offset = (page - 1) * limit

        const users = await dashboard.findAllUsers(limit, offset)

        return users
    } catch (error) {
        throw error
    }
}

async function removeUsers(userId) {
    try {
        await dashboard.removeUser(userId)
    } catch (error) {
        throw error
    }
}

async function disableUsers(userId) {
    try {
        await dashboard.disableUser(userId)
    } catch (error) {
        throw error
    }
}

async function getAllActivities(page, limit) {
    try {
        const offset = (page - 1) * limit

        const activities = await dashboard.findActivities(limit, offset)

        return activities
    } catch (error) {
        throw error
    }
}

export {
    getKpis,
    getCharts,
    findAllUsers,
    removeUsers,
    disableUsers,
    getAllActivities
}