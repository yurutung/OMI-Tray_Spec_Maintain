import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useHistory, useParams } from "react-router-dom"
import ReactShortcut from 'react-shortcut'
import { clickById, setTitleBar } from '../functions'

const Search = () => {
    // i18n
    const { t } = useTranslation()
    const { mode } = useParams<{ mode: string }>()
    const history = useHistory()
    // set title
    if (mode == 'tray_spec')
        setTitleBar('Tray Spec. Maintaince')
    else if (mode == 'tray_msl')
        setTitleBar('MSL Spec. Maintaince')

    const [id, setId] = useState('')
    const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
        setId(e.currentTarget.value)
    }

    const getID = (e: React.FormEvent, id: string): void => {
        e.preventDefault()
        // TODO: define tray_spec, tray_msl
        // TODO: mode in ['tray_spec', 'tray_msl']
        if (['tray_spec', 'tray_msl'].includes(mode)) {
            history.push(`/datas/${mode}/${id}`)
        }
    }

    return (
        <>
            <form className="row main-body g-0" onSubmit={e => getID(e, id)}>
                <div className="d-flex align-items-center justify-content-center">
                    <div className="row col-8">
                        <div className="col-2">
                            <label htmlFor="id" className="col-form-label row justify-content-end">{mode == 'tray_spec' ? 'Cust. Code' : 'MSL ID'}</label>
                        </div>
                        <div className="col-10">
                            <input onChange={handleForm} type="text" id="id" className="form-control" required />
                        </div>
                    </div>
                </div>
                <button type="submit" id="save" hidden />
            </form>
            <div className="footer-bar">
                <Link to="/" id='home' className="btn-list col-12 col-md-2">F3 {t('button.back')}</Link>
                <button type="button" className="btn-list col-12 col-md-2" onClick={() => clickById('save')}>Enter {t('button.submit')}</button>
            </div>
            {/* shortcut setting */}
            <ReactShortcut
                keys={'f3'}
                onKeysPressed={() => { clickById('home') }}
            />
        </>
    )
}

export default Search