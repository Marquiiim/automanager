import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from 'recharts';
import styles from './charts.module.css'

export default function Charts({ revenueData, productsData }) {
    return (
        <div className={styles.chartRow}>
            <div className={styles.chartCard}>
                <div className={styles.chartCardHeader}>
                    <span className={styles.chartCardTitle}>Receita Mensal</span>
                    <div className={styles.chartCardLegend}>
                        <div className={styles.chartCardLegendItem}>
                            <span className={`${styles.chartCardLegendDot} ${styles.chartCardLegendDotBlue}`} />
                            Receita (R$)
                        </div>
                        <div className={styles.chartCardLegendItem}>
                            <span className={`${styles.chartCardLegendDot} ${styles.chartCardLegendDotGreen}`} />
                            Pedidos
                        </div>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" name="Receita (R$)" radius={[4, 4, 0, 0]} />
                        <Bar yAxisId="right" dataKey="total_quantity" fill="#10b981" name="Pedidos" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className={styles.chartCard}>
                <div className={styles.chartCardHeader}>
                    <span className={styles.chartCardTitle}>Mix de Produtos</span>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={productsData.filter(item => item.quantity > 0)}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="quantity"
                            nameKey="category"
                            label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                            labelLine={true}
                        >
                            {productsData.filter(item => item.quantity > 0).map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={`hsl(${index * 360 / productsData.filter(item => item.quantity > 0).length}, 70%, 55%)`}
                                />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value} produtos`} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}