import React, { useContext } from 'react'
import styles from './Navbar.module.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import { menuContext } from '../../context/menuContext'
import { languages } from '../../Model/i18n';
import { userLoginContext } from '../../context/loginContext';

const lngs = [
    { code: "en", native: "English" },
    { code: "ar", native: "Arabic" },
];

function Navbar() {

    const navigate = useNavigate()

    const { isOpen, menuToggler, t, handleTrans, language } = useContext(menuContext)
    const { loginUser, setLoginUser } = useContext(userLoginContext)

    const handleLogout = () => {
        menuToggler()
        setLoginUser({ id: 0, name: '', email: '', password: '' })
        navigate('/')
        localStorage.setItem("user", JSON.stringify({ id: 0, name: '', email: '', password: '' }));
    }

    return (
        <>
            <nav className={styles.navigation}>
                <NavLink to="/home" className={styles.brand_name}>{t('AhmedR')}</NavLink>
                <button className={styles.hamburger}
                    onClick={() => {
                        menuToggler()
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="white"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <div
                    className={
                        `${isOpen ? `${styles.navigation_menu} ${styles.expanded}` : styles.navigation_menu}`
                    }>
                    <ul>
                        {
                            loginUser?.name && <li>
                                <NavLink onClick={menuToggler} to={`/home`}>{t('Home')}</NavLink>
                            </li>
                        }
                        <li>
                            <NavLink onClick={menuToggler} to={`/register`}>{t('Register')}</NavLink>
                        </li>
                        {
                            loginUser?.name ? <li>
                                <span className={styles.logout} onClick={handleLogout}>
                                    {t('logout')}
                                </span>
                            </li> :
                                <li>
                                    <NavLink onClick={menuToggler} to={`/`}>{t('Login')}</NavLink>
                                </li>
                        }
                        {loginUser.name &&
                            <li>
                                <span className={language === 'ar' ? styles.user : styles.userEn}>
                                    <span>{t('user')} : {loginUser.name}</span>
                                </span>
                            </li>
                        }

                        <li>
                            <span className={styles.language_container}>
                                {lngs.map((lng: languages, i: number) => {
                                    const { code, native } = lng;
                                    return <div role="button" key={i + 1} onClick={() => handleTrans(code)} className={styles.languageButton}>
                                        {native}
                                    </div>;
                                })}
                            </span>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};


export default Navbar