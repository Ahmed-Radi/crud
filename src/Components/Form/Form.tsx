import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { updateUser } from '../../API/updateUser';
import { userContext } from '../../context/userContext'
import styles from './Form.module.scss';
import { userLoginContext } from '../../context/loginContext';


function Form() {

    const { setSelectedUser, selectedUser } = useContext<any>(userContext)
    const { loginUser, setLoginUser } = useContext(userLoginContext)

    const [error, setError] = useState<string>('')

    const queryClient = useQueryClient()
    const { mutate, isLoading } = useMutation({
        mutationFn: updateUser,
        onSuccess: (data) => {
            setError('')
            nameRef.current!.value = '';
            emailRef.current!.value = '';
            passwordRef.current!.value = '';
            queryClient.invalidateQueries(["user"])
            if (selectedUser[0].id === loginUser.id) {
                setLoginUser(data.data)
            }
            setSelectedUser('')
        }
    })

    const { t, i18n : { language } } = useTranslation()

    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const handleClear = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        nameRef.current!.value = '';
        emailRef.current!.value = '';
        passwordRef.current!.value = '';
        setSelectedUser('')
    }

    const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (!selectedUser || selectedUser.id === 'undefined' || selectedUser.id === 0) {
            return setError(`${t('no user selected')}`)
        }
        if (!nameRef.current!.value) {
            return setError(`${t('name is required')}`)
        }
        if (!emailRef.current!.value) {
            return setError(`${t('email is required')}`)
        }
        if (!passwordRef.current!.value) {
            return setError(`${t('password is required')}`)
        }
        if (nameRef.current!.value && emailRef.current!.value && passwordRef.current!.value && selectedUser[0].id !== 'undefined' && selectedUser[0].id !== 0) {
            mutate({
                name: nameRef.current!.value,
                email: emailRef.current!.value,
                password: passwordRef.current!.value,
                id: selectedUser[0].id
            })
            setError("")
        }
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setSelectedUser([{...selectedUser[0],
            [name]: value
        }])
    }

    return (
        <div className={styles.form_container}>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={(e: any) => handleSubmit(e)} className={language === 'en' ? styles.form_content : styles.form_content_ar}>
                <label className={styles.label}>
                    <span>{t('name')}</span>
                    <input name="name" dir={language === 'ar' ? 'rtl' : 'auto'} type="text" className={error && !nameRef.current!.value ? `${styles.form_content__input} ${styles.showError}` : `${styles.form_content__input}`} placeholder={`${t('name')}`} ref={nameRef} onChange={(e) => handleOnChange(e)} value={selectedUser[0]?.name} />
                </label>
                <label className={styles.label}>
                    <span>{t('email')}</span>
                    <input name="email" dir={language === 'ar' ? 'rtl' : 'auto'} type="email" className={error && !emailRef.current!.value ? `${styles.form_content__input} ${styles.showError}` : `${styles.form_content__input}`} placeholder={`${t('email')}`} ref={emailRef} onChange={(e) => handleOnChange(e)} value={selectedUser[0]?.email} />
                </label>
                <label className={styles.label}>
                    <span>{t('password')}</span>
                    <input name="password" dir={language === 'ar' ? 'rtl' : 'auto'} type="password" className={error && !passwordRef.current!.value ? `${styles.form_content__input} ${styles.showError}` : `${styles.form_content__input}`} placeholder={`${t('password')}`} ref={passwordRef} onChange={(e) => handleOnChange(e)} value={selectedUser[0]?.password} />
                </label>
                <button className={styles.submit_button} disabled={isLoading}>{isLoading ? t('loading') : t('submit')}</button>
                <button className={styles.clear_button} onClick={(e: any) => handleClear(e)}>{t('Clear')}</button>
            </form>
        </div>
    )
}

export default Form