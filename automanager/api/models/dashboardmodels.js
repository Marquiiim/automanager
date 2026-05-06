import { query } from '../config/database/database.js'

const dashboard = {
    getKpis: async () => {
        const kpiRevenue = await query(
            `SELECT
                SUM(CASE 
                WHEN m.type_movement = 'output' 
                    AND m.movement_date >= DATE_FORMAT(CURDATE(), '%Y-%m-01') 
                    AND m.movement_date < DATE_FORMAT(CURDATE() + INTERVAL 1 MONTH, '%Y-%m-01') 
                THEN m.quantity * m.unit_value 
                ELSE 0 
                END) AS now_revenue,
    
                COUNT(CASE 
                WHEN m.type_movement = 'output' 
                    AND m.movement_date >= DATE_FORMAT(CURDATE(), '%Y-%m-01') 
                    AND m.movement_date < DATE_FORMAT(CURDATE() + INTERVAL 1 MONTH, '%Y-%m-01') 
                THEN 1 
                END) AS now_quantity,
    
	            SUM(CASE 
                WHEN m.type_movement = 'output' 
                    AND m.movement_date >= DATE_FORMAT(CURDATE() - INTERVAL 1 MONTH, '%Y-%m-01') 
                    AND m.movement_date < DATE_FORMAT(CURDATE(), '%Y-%m-01')
                THEN m.quantity * m.unit_value 
                ELSE 0 
                END) AS before_revenue,
    
                COUNT(CASE 
                WHEN m.type_movement = 'output' 
                    AND m.movement_date >= DATE_FORMAT(CURDATE() - INTERVAL 1 MONTH, '%Y-%m-01') 
                    AND m.movement_date < DATE_FORMAT(CURDATE(), '%Y-%m-01') 
                THEN 1 
                END) AS before_quantity
            FROM stock_movement m`
        )

        if (Object.keys(kpiRevenue[0]).length < 4) throw new Error('Sem dados anteriores para cálcular KPI da receita total')
        const percentageRevenue = (((kpiRevenue[0].now_revenue - kpiRevenue[0].before_revenue) / kpiRevenue[0].before_revenue) * 100).toFixed(2)

        const kpiCriticalProducts = await query(
            `SELECT 
	            COUNT(CASE
                    WHEN s.current_stock < c.low_stock_threshold 
                    AND s.current_stock = 0
                    THEN 1 END) AS bellow_minimum,
                COUNT(*) AS total_products
            FROM stock s
                INNER JOIN categories c ON s.category_id = c.id`
        )

        if (Object.keys(kpiCriticalProducts[0]).length < 2) throw new Error('Sem dados anteriores para cálcular KPI dos produtos críticos')
        const percentageCriticalProducts = ((kpiCriticalProducts[0].bellow_minimum / kpiCriticalProducts[0].total_products) * 100).toFixed(2)

        const kpiBreakageRate = await query(
            `SELECT
	            COUNT(CASE 
                    WHEN current_stock <= 0 
                    THEN 1 END) AS out_of_stock_products,
                COUNT(*) AS total_products
            FROM stock s
                INNER JOIN categories c ON s.category_id = c.id 
            WHERE status='ativo'`
        )

        if (Object.keys(kpiBreakageRate[0]).length < 2) throw new Error('Sem dados anteriores para cálcular KPI da taxa de ruptura')
        const percentageBreakage = ((kpiBreakageRate[0].out_of_stock_products / kpiBreakageRate[0].total_products) * 100).toFixed(2)

        const kpiInventoryTurnover = await query(
            `SELECT
	            COALESCE(SUM(c.initial_stock), 0) AS total_initial_stock,
                COALESCE(SUM(s.current_stock), 0) AS total_current_stock,
                COUNT(DISTINCT c.id) AS total_categories,
                COUNT(DISTINCT s.id) AS total_products
            FROM categories c
                LEFT JOIN stock s ON c.id = s.category_id AND s.status='ativo'`
        )

        if (Object.keys(kpiInventoryTurnover[0]).length < 4) throw new Error('Sem dados anteriores para cálcular KPI do giro de estoque')
        const totalInventoryTurnover = ((Number(kpiInventoryTurnover[0].total_initial_stock) - Number(kpiInventoryTurnover[0].total_current_stock)) / ((Number(kpiInventoryTurnover[0].total_initial_stock) + Number(kpiInventoryTurnover[0].total_current_stock)) / 2)).toFixed(2)
        const percentageInventory = (((Number(kpiInventoryTurnover[0].total_initial_stock) - Number(kpiInventoryTurnover[0].total_current_stock)) / Number(kpiInventoryTurnover[0].total_initial_stock)) * 100).toFixed(2)

        return {
            revenue: {
                total: kpiRevenue[0].now_revenue,
                percentage: percentageRevenue
            },
            criticalProducts: {
                total: kpiCriticalProducts[0].bellow_minimum,
                percentage: percentageCriticalProducts
            },
            breakageRate: {
                percentage: percentageBreakage,
                proportion: `${kpiBreakageRate[0].out_of_stock_products} de ${kpiBreakageRate[0].total_products}`
            },
            inventoryTurnover: {
                total: totalInventoryTurnover,
                percentage: percentageInventory
            }
        }
    },

    getCharts: async () => {
        const barMetrics = await query(
            `SELECT 
                DATE_FORMAT(movement_date, '%b') AS month,
                SUM(quantity * unit_value) AS revenue,
                SUM(quantity) AS total_quantity
            FROM stock_movement
            WHERE type_movement = 'output'
                AND YEAR(movement_date) = YEAR(CURDATE())
            GROUP BY MONTH(movement_date)
            ORDER BY MONTH(movement_date) ASC`
        )

        if (barMetrics.length === 0) throw new Error('Sem dados para gráfico de barras')

        const pieMetrics = await query(
            `SELECT 
                c.name AS category,
                COUNT(s.id) AS quantity
            FROM categories c
                LEFT JOIN stock s ON s.category_id = c.id 
                AND s.status = 'ativo'
            GROUP BY c.id, c.name
            ORDER BY quantity DESC`
        )

        if (pieMetrics.length === 0) throw new Error('Sem dados para mix de produtos')

        return {
            bar: barMetrics,
            pie: pieMetrics
        }
    },

    findAllUsers: async (limit, offset) => {
        const usersFound = await query(
            `SELECT
                id,
                name, 
                email, 
                role,
                status
            FROM users
                ORDER BY id LIMIT ? OFFSET ?`, [limit, offset]
        )

        if (usersFound.length === 0) throw new Error('Nenhum usuário foi encontrado')

        return usersFound
    },

    removeUser: async (userId) => {
        const deleteUser = await query(
            `DELETE FROM users WHERE id = ?`, [userId]
        )

        if (deleteUser.affectedRows === 0) throw new Error('Não foi possível excluir usuário')
    },

    disableUser: async (userId) => {
        const isDisabled = await query(
            `SELECT status 
            FROM users
            WHERE id = ?`, [userId]
        )

        if (isDisabled[0].status === 'inativo') {
            const enableUser = await query(
                `UPDATE users
                SET status = 'ativo'
                WHERE id = ?`, [userId]
            )

            if (enableUser.affctedRows === 0) throw new Error('Não foi possível desabilitar o usuário')

            return enableUser
        }

        const disableUser = await query(
            `UPDATE users
            SET status = 'inativo'
            WHERE id = ?`, [userId]
        )

        if (disableUser.affctedRows === 0) throw new Error('Não foi possível desabilitar o usuário')
    }
}

export default dashboard