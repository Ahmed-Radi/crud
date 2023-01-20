import React, { useContext } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { User } from '../../Model/User';
import { useGetUser } from '../../API/FetchUser';
import styles from './Table.module.scss';
import { userContext } from '../../context/userContext';
import { useTranslation } from 'react-i18next';
import { deleteUser } from '../../API/deleteUser';

function Table() {

    const queryClient = useQueryClient()

    const { handleSelectUser } = useContext<any>(userContext)

    const { t } = useTranslation()

    // Delete user
    const deleteUserRecord = useMutation({
        mutationFn: (id: number) => deleteUser(id),
        onSuccess: () => {
            // to update data in real time
            queryClient.invalidateQueries(["user"])
        }
    });

    // fetch user data
    const { isFetching, error, data } = useGetUser()

    if (error) { return <h2 className={styles.error}>{`${t('Error ...')}`}</h2> }
    if (isFetching) return <h2 className={styles.loading}><span>{`${t('Fetching ...')}`}</span></h2>

    // Select user to set user data into form to update
    const handleUpdate = (id: number) => {
        console.log('id', id)
        handleSelectUser(id);
    }

    return (
        <div className={styles.table_container}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>
                        <th>{t("id")}</th>
                        <th>{t('name')}</th>
                        <th>{t('email')}</th>
                        <th>{t('action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((user: User) => {
                        return (<tr key={user.id}>
                            <td>{user?.id}</td>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td>
                                <button className={styles.update_button} onClick={() => handleUpdate(user.id)}>{t('Update')}</button>
                                <button className={styles.delete_button} onClick={() => deleteUserRecord.mutate(user.id)}>{t('Delete')}</button>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table