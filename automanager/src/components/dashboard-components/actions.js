import { MdMoreVert } from 'react-icons/md'
import styles from './actions.module.css'

export default function Actions() {
    return (
        <>
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
        </>
    )
}