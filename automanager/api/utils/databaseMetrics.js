export default async function databaseMetrics(data) {
    const totalStockValue = () =>
        data.rows.reduce((acc, curr) =>
            acc + (parseFloat(curr.sale_price) * curr.current_stock || 0), 0).toFixed(2)

    const totalProductsStock = () =>
        data.rows.reduce((acc, curr) =>
            acc + (curr.current_stock || 0), 0)

    const lowStockItems = () =>
        data.rows.filter(item => item.current_stock <= item.low_stock_threshold).length


    const outStockItems = () =>
        data.rows.filter(item => item.current_stock === 0).length

    return {
        totalItems: data.totalItems,
        metrics: {
            totalStockValue: totalStockValue(),
            totalProductsStock: totalProductsStock(),
            lowStockItems: lowStockItems(),
            outStockItems: outStockItems(),
        }
    }
}