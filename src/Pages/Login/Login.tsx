import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Login.module.scss';
import { userLoginContext } from '../../context/loginContext';
import { useGetUser } from '../../API/FetchUser';
import { User } from '../../Model/User';




function Login() {

    // const { t, language } = useContext(menuContext)
    const { t, i18n: { language } } = useTranslation()
    const { setLoginUser } = useContext(userLoginContext)

    let navigate = useNavigate();

    const [error, setError] = useState<string>('')

    // use Ref rather than state to prevent re-render
    // const refEmail = useRef<HTMLInputElement>(null)
    // const refPass = useRef<HTMLInputElement>(null)

    const [userEmail, setUserEmail] = useState<string>('')
    const [userPass, setUserPass] = useState<string>('')

    // to prevent crash project if no data received from API make the default value equal empty array
    const { data = [] } = useGetUser()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // check if user enter his email and password and data come from server
        if (userEmail && userPass && data.length !== 0) {
            // get user data dependent on data entered in the form
            const loginUser = data.filter((data: User) => {
                return data.email === userEmail && data.password === userPass
            })
            // check if user data is correct
            if (loginUser.length === 0) {
                setError(`${t("Your email or password not correct.")}`)
            }
            // if user data is correct, set user data in context and localStorage then navigate to home page
            if (loginUser.length >= 1) {
                setLoginUser({
                    name: loginUser[0].name,
                    email: loginUser[0].email,
                    password: loginUser[0].password,
                    id: loginUser[0].id
                })
                localStorage.setItem("user", JSON.stringify({
                    name: loginUser[0].name,
                    email: loginUser[0].email,
                    password: loginUser[0].password,
                    id: loginUser[0].id
                }));
                navigate('/home')
            }
        } else {
            // if user click login width out enter password or email
            setError(`${t("Please enter your email and password.")}`)
        }
    }

    return (
        <div className={styles.form_container}>
            {error && <p data-cy="login-error" className={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} id="login-form" className={language === 'en' ? styles.form_content : styles.form_content_ar}>
                <label className={styles.label}>
                    <span>{t('email')}</span>
                    <input data-cy="login-email" type="email" className={error && !userEmail ? `${styles.form_content__input} ${styles.showError}` : `${styles.form_content__input}`} dir={language === 'ar' ? 'rtl' : 'auto'} onChange={(e: any) => setUserEmail(e.target.value)} placeholder={`${t('email')}`} />
                </label>
                <label className={styles.label}>
                    <span>{t('password')}</span>
                    <input data-cy="login-password" type="password" className={error && !userPass ? `${styles.form_content__input} ${styles.showError}` : `${styles.form_content__input}`} dir={language === 'ar' ? 'rtl' : 'auto'} onChange={(e: any) => setUserPass(e.target.value)} placeholder={`${t("password")}`} />
                </label>
                <button data-cy="login-submit" className={styles.submit_button} type='submit'>{t('submit')}</button>
                <Link to={'/register'} className={styles.link}>{t('create account')}</Link>
            </form>
        </div>
    )
}

export default Login