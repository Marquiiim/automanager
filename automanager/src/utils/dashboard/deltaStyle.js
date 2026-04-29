import {
    MdArrowUpward,
    MdArrowDownward
} from 'react-icons/md'
import styles from '../../components/dashboard-components/kpis.module.css'

export default function DeltaStyle({ value }) {
    const num = parseFloat(value)

    if (isNaN(num) || num === 0) {
        return <span className={styles.kpiCardDeltaNeutral}>0%</span>
    }

    const isPositive = num > 0
    const absValue = Math.abs(num)

    return (
        <span className={`${styles.kpiCardDelta} ${isPositive ? styles.kpiCardDeltaPositive : styles.kpiCardDeltaNegative}`}>
            {isPositive ? <MdArrowUpward /> : <MdArrowDownward />}
            {`${isPositive ? '+' : '-'}${absValue}%`}
        </span>
    )
}