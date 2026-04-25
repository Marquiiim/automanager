import styles from './dashboard.module.css'
import {
    MdPeople,
    MdShoppingCart,
    MdNotifications,
    MdTrendingDown,
    MdMoreVert,
    MdArrowUpward,
    MdArrowDownward,
} from 'react-icons/md'
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

export default function Dashboard() {

    const receitaData = [
        { mes: 'Jan', receita: 12000, pedidos: 45 },
        { mes: 'Fev', receita: 19000, pedidos: 62 },
        { mes: 'Mar', receita: 15000, pedidos: 58 },
        { mes: 'Abr', receita: 22000, pedidos: 78 },
        { mes: 'Mai', receita: 28000, pedidos: 95 },
        { mes: 'Jun', receita: 25000, pedidos: 88 },
    ];

    const produtosData = [
        { name: 'Lubrificação', value: 35, color: '#3b82f6' },
        { name: 'Rodas', value: 25, color: '#10b981' },
        { name: 'Freios', value: 20, color: '#f59e0b' },
        { name: 'Estética', value: 12, color: '#8b5cf6' },
        { name: 'Outros', value: 8, color: '#ef4444' },
    ];

    return (
        <div className={styles.layout}>
            <div className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.headerLeft}>
                        <div>
                            <h1 className={styles.headerTitle}>Visão Geral</h1>
                            <p className={styles.headerSubtitle}>Acompanhe as métricas e atividades do seu negócio</p>
                        </div>
                    </div>

                    <div className={styles.headerRight}>
                        <button className={styles.headerIconBtn}>
                            <MdNotifications />
                            <span className={styles.headerIconBtnBadge} />
                        </button>
                    </div>
                </header>

                <main className={styles.content}>
                    <div className={styles.kpiGrid}>
                        <div className={styles.kpiCard}>
                            <div className={styles.kpiCardHeader}>
                                <span className={styles.kpiCardLabel}>Receita Total</span>
                                <div className={`${styles.kpiCardIcon} ${styles.kpiCardIconBlue}`}>₿</div>
                            </div>
                            <div className={styles.kpiCardValue}>R$ 0,00</div>
                            <div className={styles.kpiCardFooter}>
                                <span className={`${styles.kpiCardDelta} ${styles.kpiCardDeltaPositive}`}>
                                    <MdArrowUpward /> +0%
                                </span>
                                <span className={styles.kpiCardPeriod}>vs mês anterior</span>
                            </div>
                        </div>

                        <div className={styles.kpiCard}>
                            <div className={styles.kpiCardHeader}>
                                <span className={styles.kpiCardLabel}>Novos Usuários</span>
                                <div className={`${styles.kpiCardIcon} ${styles.kpiCardIconGreen}`}>
                                    <MdPeople />
                                </div>
                            </div>
                            <div className={styles.kpiCardValue}>0</div>
                            <div className={styles.kpiCardFooter}>
                                <span className={`${styles.kpiCardDelta} ${styles.kpiCardDeltaPositive}`}>
                                    <MdArrowUpward /> +0%
                                </span>
                                <span className={styles.kpiCardPeriod}>vs mês anterior</span>
                            </div>
                        </div>

                        <div className={styles.kpiCard}>
                            <div className={styles.kpiCardHeader}>
                                <span className={styles.kpiCardLabel}>Pedidos Ativos</span>
                                <div className={`${styles.kpiCardIcon} ${styles.kpiCardIconYellow}`}>
                                    <MdShoppingCart />
                                </div>
                            </div>
                            <div className={styles.kpiCardValue}>0</div>
                            <div className={styles.kpiCardFooter}>
                                <span className={`${styles.kpiCardDelta} ${styles.kpiCardDeltaNegative}`}>
                                    <MdArrowDownward /> -0%
                                </span>
                                <span className={styles.kpiCardPeriod}>vs mês anterior</span>
                            </div>
                        </div>

                        <div className={styles.kpiCard}>
                            <div className={styles.kpiCardHeader}>
                                <span className={styles.kpiCardLabel}>Taxa de Churn</span>
                                <div className={`${styles.kpiCardIcon} ${styles.kpiCardIconRed}`}>
                                    <MdTrendingDown />
                                </div>
                            </div>
                            <div className={styles.kpiCardValue}>0%</div>
                            <div className={styles.kpiCardFooter}>
                                <span className={`${styles.kpiCardDelta} ${styles.kpiCardDeltaPositive}`}>
                                    <MdArrowDownward /> -0%
                                </span>
                                <span className={styles.kpiCardPeriod}>vs mês anterior</span>
                            </div>
                        </div>
                    </div>

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
                                <BarChart data={receitaData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="mes" />
                                    <YAxis yAxisId="left" />
                                    <YAxis yAxisId="right" orientation="right" />
                                    <Tooltip />
                                    <Bar yAxisId="left" dataKey="receita" fill="#3b82f6" name="Receita (R$)" radius={[4, 4, 0, 0]} />
                                    <Bar yAxisId="right" dataKey="pedidos" fill="#10b981" name="Pedidos" radius={[4, 4, 0, 0]} />
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
                                        data={produtosData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        labelLine={true}
                                    >
                                        {produtosData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `${value}%`} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className={styles.bottomGrid}>
                        <div className={styles.tableCard}>
                            <div className={styles.tableCardHeader}>
                                <span className={styles.tableCardTitle}>Usuários Recentes</span>
                                <div className={styles.tableCardActions}>
                                    <button className={styles.btnOutline}>Ver tudo</button>
                                </div>
                            </div>

                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Email</th>
                                        <th>Função</th>
                                        <th>Status</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className={styles.tableCell}>
                                                <div className={styles.tableAvatar}>AN</div>
                                                <span className={styles.tableName}>Nome Exemplo</span>
                                            </div>
                                        </td>
                                        <td>exemplo@email.com</td>
                                        <td>Admin</td>
                                        <td>
                                            <span className={`${styles.badge} ${styles.badgeActive}`}>
                                                Ativo
                                            </span>
                                        </td>
                                        <td>
                                            <div className={styles.tableRowActions}>
                                                <button className={styles.btnDelete}>Remover</button>
                                                <button className={styles.btnIconSm}>
                                                    <MdMoreVert />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className={styles.tableEmpty}>
                                        <td colSpan={5}>
                                            <span>Nenhum usuário encontrado</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className={styles.activityCard}>
                            <div className={styles.activityCardHeader}>
                                <span className={styles.activityCardTitle}>Atividade Recente</span>
                                <button className={styles.btnOutline}>Ver tudo</button>
                            </div>

                            <div className={styles.activityList}>
                                <div className={styles.activityItem}>
                                    <div className={`${styles.activityDot} ${styles.activityDotGreen}`} />
                                    <div className={styles.activityBody}>
                                        <p className={styles.activityText}>
                                            <strong>Usuário</strong> realizou uma ação
                                        </p>
                                        <span className={styles.activityTime}>agora mesmo</span>
                                    </div>
                                </div>

                                <div className={styles.activityItem}>
                                    <div className={`${styles.activityDot} ${styles.activityDotBlue}`} />
                                    <div className={styles.activityBody}>
                                        <p className={styles.activityText}>
                                            <strong>Sistema</strong> atualizou um registro
                                        </p>
                                        <span className={styles.activityTime}>5 min atrás</span>
                                    </div>
                                </div>

                                <div className={styles.activityItem}>
                                    <div className={`${styles.activityDot} ${styles.activityDotYellow}`} />
                                    <div className={styles.activityBody}>
                                        <p className={styles.activityText}>
                                            Pagamento <strong>pendente</strong> detectado
                                        </p>
                                        <span className={styles.activityTime}>20 min atrás</span>
                                    </div>
                                </div>

                                <div className={styles.activityItem}>
                                    <div className={`${styles.activityDot} ${styles.activityDotRed}`} />
                                    <div className={styles.activityBody}>
                                        <p className={styles.activityText}>
                                            <strong>Erro</strong> ao processar pedido
                                        </p>
                                        <span className={styles.activityTime}>1h atrás</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}