import React, { useRef } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import ReactShortcut from 'react-shortcut'
import { useTranslation } from "react-i18next"
import { toastMixin, clickById, setTitleBar } from '../functions'

import TraySpecTable from './TraySpecTable'
import TrayMslTable from './TrayMslTable'

const UploadPreview = () => {
    // i18n
    const { t } = useTranslation()
    const { mode } = useParams<{ mode: string }>()
    const location = useLocation<{ previewDatas: [], backUrl: '' }>()
    const datas = location.state.previewDatas || []
    const backUrl = location.state.backUrl || '/'

    // set title
    if (mode == 'tray_spec')
        setTitleBar('Tray Spec. Maintaince Upload Preview')
    else if (mode == 'tray_msl')
        setTitleBar('MSL Spec. Maintaince Upload Preview')

    const tsRef = useRef<any>()
    const tmRef = useRef<any>()

    const delSelected = () => {
        // TODO: define tray_spec, tray_msl
        if (mode == 'tray_spec')
            tsRef.current.delSelectedPre()
        else if (mode == 'tray_msl')
            tmRef.current.delSelectedPre()
    }

    const uploadDatas = () => {
        // TODO: define tray_spec, tray_msl
        if (mode == 'tray_spec')
            tsRef.current.uploadDatas(backUrl)
        else if (mode == 'tray_msl')
            tmRef.current.uploadDatas(backUrl)
    }

    let table = <></>
    if (mode == 'tray_spec')
        table = <TraySpecTable isPreview={true} uploadData={datas} ref={tsRef} />
    else if (mode == 'tray_msl')
        table = <TrayMslTable isPreview={true} uploadData={datas} ref={tmRef} />

    return (
        <>
            <div className="main-body" >
                {table}
            </div>
            <div className="footer-bar">
                <Link to={backUrl} id='back' className="btn-list col-12 col-md-2">F3 {t('button.back')}</Link>
                <button id='del' className="btn-list col-12 col-md-2" onClick={delSelected}>F4 {t('button.delete')}</button>
                <button id='save' className="btn-list col-12 col-md-2" onClick={uploadDatas}>F1 {t('button.submit')}</button>
            </div>
            <ReactShortcut
                keys={'f3'}
                onKeysPressed={() => { clickById('back') }}
            />
            <ReactShortcut
                keys={'f4'}
                onKeysPressed={() => { clickById('del') }}
            />
            <ReactShortcut
                keys={'f1'}
                onKeysPressed={() => { clickById('save') }}
            />
        </>
    )
}

export default UploadPreview