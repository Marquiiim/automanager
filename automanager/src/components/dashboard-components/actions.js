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
        paginationUsers: {
            page: 1,
            limit: 4
        },
        paginationActivities: {
            page: 1,
            limit: 4
        },
        seeAll: {
            active: false,
            allUsers: []
        },
        recentUsers: [],
        recentActivities: []
    })

    const fetchUsers = useCallback(async () => {
        try {
            const response = await api.post('/api/dashboard/users', data.paginationUsers)
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
    }, [data.paginationUsers])

    const fetchUsersActivity = useCallback(async () => {
        try {
            const response = await api.get('/api/dashboard/users/activity', {
                params: {
                    pagination: data.paginationActivities
                }
            })
            setData(data => ({
                ...data,
                recentActivities: response.data.activities
            }))
        } catch (error) {
            console.log(error)
        }
    }, [data.paginationActivities])

    const seeAllUsers = useCallback(() => {
        setData(data => ({
            ...data,
            paginationUsers: { page: 1, limit: 10 },
            seeAll: { active: true, allUsers: [] }
        }))
    }, [])

    const handlePagination = useCallback((type) => {
        if (type === 'previous') setData(data => ({
            ...data,
            paginationUsers: {
                page: Math.max(data.paginationUsers.page - 1, 1),
                limit: data.paginationUsers.limit
            }
        }))

        if (type === 'next') setData(data => ({
            ...data,
            paginationUsers: {
                page: data.paginationUsers.page + 1,
                limit: data.paginationUsers.limit
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
        fetchUsers()
        fetchUsersActivity()
    }, [fetchUsers, fetchUsersActivity])

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
                                    <td>
                                        <span className={`${styles.roleBadge} ${user.role === 'admin' ? styles.roleAdmin : styles.roleUser}`}>
                                            {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`${styles.badge} ${user.status === 'ativo' ? styles.badgeActive : styles.badgeInactive}`}>
                                            {user.status === 'ativo' ? 'Ativo' : 'Inativo'}
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
                </div>

                <div className={styles.activityList}>
                    {data.recentActivities && data.recentActivities.length > 0 &&
                        data.recentActivities.map(activity => (
                            <div key={activity.id} className={styles.activityItem}>
                                <div className={`${styles.activityDot} ${activity.type_movement === 'output' ? styles.activityOutput : styles.activityInput}`} />
                                <div className={styles.activityBody}>
                                    <p className={styles.activityText}>
                                        <strong>{activity.user_name}</strong> realizou uma {activity.type_movement === 'output' ? 'venda' : 'compra'}
                                    </p>
                                    <span className={styles.activityTime}>{new Date(activity.movement_date).toLocaleString('pt-br')}</span>
                                </div>
                            </div>
                        ))
                    }
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