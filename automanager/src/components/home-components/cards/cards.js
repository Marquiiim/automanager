import {
    MdDashboardCustomize,
    MdMyLocation,
    MdVisibility,
    MdSearch,
    MdLabelImportant,
} from 'react-icons/md';

import styles from './cards.module.css'

function Cards({ title, message }) {

    const icon = (title) => {
        switch (title) {
            case 'Controle Total':
                return <MdDashboardCustomize />
            case 'Localização':
                return <MdMyLocation />
            case 'Visual Rápido':
                return <MdVisibility />
            case 'Busca Avançada':
                return <MdSearch />
            case 'Status Visuais':
                return <MdLabelImportant />
            default:
                return 'N/A'
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2>
                    {icon(title)}
                </h2>
                <h3>
                    {title}
                </h3>
                <p>
                    {message}
                </p>
            </div>
        </div>
    )
}

export default Cards