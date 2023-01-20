import styles from './NotFound.module.scss'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function NotFound() {

    const { t } = useTranslation()

    return (
        <div className={styles.page_container}>
            <h2 className={styles.header}>{t('404 Page Not Found')}</h2>
            <Link to="/home" className={styles.link}>{t('Back to home page')}</Link>
        </div>
    )
}

export default NotFound