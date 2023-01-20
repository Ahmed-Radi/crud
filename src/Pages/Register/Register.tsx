import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import styles from './Register.module.scss'
import { useTranslation } from 'react-i18next';
import { userLoginContext } from '../../context/loginContext';
import { addUser } from '../../API/addUser';

function Register() {

    let navigate = useNavigate();

    const { t, i18n : { language } } = useTranslation()

    // const { t, language: { language } } = useContext(menuContext)
    const { setLoginUser } = useContext(userLoginContext)

    // add user then navigate to home page
    const { mutate } = useMutation(addUser, {
        onSuccess: () => {
            navigate('/home')
        },
    });

    const [error, setError] = useState<string>('')
    const [userName, setUserName] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>('')
    const [userPass, setUserPass] = useState<string>('')
    const [userRePass, setUserRePassPass] = useState<string>('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // if any input not contain data
        if (!userName || !userEmail || !userPass || !userRePass) {
            return setError(`${t("Please fill all inputs.")}`)
        }
        // if all inputs contain data
        if (userName && userEmail && userPass && userRePass) {
            // return error if password not equal to re password
            if (userPass !== userRePass) {
                return setError(`${t("Password not match.")}`)
            }
            const randomId = Math.floor(Math.random() * 100)
            // mutate to create user
            mutate({
                name: userName,
                email: userEmail,
                password: userPass,
                id: randomId
            })
            // reset error
            setError("")
            // set login user data
            setLoginUser({
                name: userName,
                email: userEmail,
                password: userPass,
                id: randomId
            })
            // add logged user data into local storage
            localStorage.setItem("user", JSON.stringify({
                name: userName,
                email: userEmail,
                password: userPass,
                id: randomId
            }));
        }
    }


    return (
        <div className={styles.form_container}>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} className={language === 'en' ? styles.form_content : styles.form_content_ar}>
                <label className={styles.label}>
                    <span>{t('name')}</span>
                    <input type="text" className={error && !userName ? `${styles.form_content__input} ${styles.showError}` : `${styles.form_content__input}`} dir={language === 'ar' ? 'rtl' : 'auto'} onChange={(e: any) => setUserName(e.target.value)} placeholder={`${t("name")}`} />
                </label>
                <label className={styles.label}>
                    <span>{t('email')}</span>
                    <input type="email" className={error && !userEmail ? `${styles.form_content__input} ${styles.showError}` : `${styles.form_content__input}`} dir={language === 'ar' ? 'rtl' : 'auto'} onChange={(e: any) => setUserEmail(e.target.value)} placeholder={`${t("email")}`} />
                </label>
                <label className={styles.label}>
                    <span>{t('password')}</span>
                    <input type="password" className={error && !userPass ? `${styles.form_content__input} ${styles.showError}` : `${styles.form_content__input}`} dir={language === 'ar' ? 'rtl' : 'auto'} onChange={(e: any) => setUserPass(e.target.value)} placeholder={`${t('password')}`} />
                </label>
                <label className={styles.label}>
                    <span>{t('re password')}</span>
                    <input type="password" className={error && !userRePass ? `${styles.form_content__input} ${styles.showError}` : `${styles.form_content__input}`} dir={language === 'ar' ? 'rtl' : 'auto'} onChange={(e: any) => setUserRePassPass(e.target.value)} placeholder={`${t("re password")}`} />
                </label>
                <button className={styles.submit_button}>{t('submit')}</button>
                <Link to={'/'} className={styles.link}>{t('you have an account')}</Link>
            </form>
        </div>
    )
}

export default Register