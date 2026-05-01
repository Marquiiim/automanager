import {
    useState,
    useEffect,
    useCallback
} from 'react'
import api from '../../services/apiInstance'
import UsersModal from './modals/usersModal'
import styles from './actions.module.css'

export default function Actions() {
    const [data, setData] = useState({
        pagination: {
            page: 1,
            limit: 4
        },
        seeAll: {
            active: false,
            allUsers: []
        },
        recentUsers: []
    })

    const fetchUsers = useCallback(async (pagination) => {
        try {
            const response = await api.post('/api/dashboard/users', pagination)
            setData(data => ({
                ...data,
                ...(data.seeAll.active ?
                    { seeAll: { ...data.seeAll, allUsers: response.data.users } } :
                    { recentUsers: response.data.users }
                )
            }))
        } catch (error) {
            console.log(error)
        }
    }, [])

    const seeAllUsers = useCallback(() => {
        setData(data => ({
            ...data,
            pagination: { page: 1, limit: 10 },
            seeAll: { active: true, allUsers: [] }
        }))
    }, [])

    const handlePagination = useCallback((type) => {
        if (type === 'previous') setData(data => ({
            ...data,
            pagination: {
                page: Math.max(data.pagination.page - 1, 1),
                limit: data.pagination.limit
            }
        }))

        if (type === 'next') setData(data => ({
            ...data,
            pagination: {
                page: data.pagination.page + 1,
                limit: data.pagination.limit
            }
        }))
    }, [])

    const onClose = useCallback(() => {
        setData(data => ({
            ...data,
            seeAll: {
                active: false,
                allUsers: []
            }
        }))
    }, [])

    useEffect(() => {
        fetchUsers(data.pagination)
    }, [fetchUsers, data.pagination])

    return (
        <div className={styles.bottomGrid}>
            <div className={styles.tableCard}>
                <div className={styles.tableCardHeader}>
                    <span className={styles.tableCardTitle}>Usuários do Recentes</span>
                    <div className={styles.tableCardActions}>
                        <button onClick={seeAllUsers}
                            className={styles.btnOutline}>
                            Ver tudo
                        </button>
                    </div>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Função</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.recentUsers && data.recentUsers.length > 0 ? (
                            data.recentUsers.map(user => (
                                <tr key={user.id}>
                                    <td>
                                        <div className={styles.tableCell}>
                                            <span className={styles.tableName}>{user.name}</span>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <span className={`${styles.badge} ${styles.badgeActive}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className={styles.tableEmpty}>
                                <td colSpan={4}>
                                    <span>Nenhum usuário encontrado</span>
                                </td>
                            </tr>
                        )}
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
                </div>
            </div>
            {data.seeAll.active &&
                <UsersModal
                    data={data.seeAll.allUsers}
                    pagination={handlePagination}
                    onClose={onClose} />
            }
        </div>
    )
}