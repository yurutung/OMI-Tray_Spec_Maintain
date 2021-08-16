import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useTranslation } from 'react-i18next'
import { Link, useParams, useLocation } from "react-router-dom"
import ReactShortcut from 'react-shortcut'
import { toastMixin, clickById, setTitleBar, getInvalidMsg } from '../functions'
import { addTrayMsl, updateTrayMsl } from '../api/tray_msl'


interface stateType {
  isEdit: boolean,
  selectedData: ITrayMsl
}

const AddTrayMsl = () => {
  // i18n
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()

  const location = useLocation<stateType>()
  const state = location.state || {}
  const isEdit = state.isEdit || false
  const initData = state.selectedData || {} as ITrayMsl
  // formData
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<ITrayMsl>({ mode: 'all', defaultValues: initData })
  // set title
  setTitleBar(`Tray Spec. Maintaince ${isEdit ? 'Update' : 'Add'}`)

  // form submit -> save data
  const saveTrayMsl = (formData: ITrayMsl): void => {
    if (isEdit) {
      updateTrayMsl(formData)
        .then(e => {
          toastMixin.fire({
            title: 'Update data Successfully!'
          })
          clickById('back')
        })
        .catch(err => {
          console.error(err.response)
          toastMixin.fire({
            title: err.response.status === 404 ? 'Nothing has changed!' : err,
            icon: 'error'
          })
        })
    } else {
      addTrayMsl(formData)
        .then(e => {
          toastMixin.fire({
            title: 'Add data Successfully!'
          })
          clickById('back')
        })
        .catch(err => {
          console.error(err.response)
          toastMixin.fire({
            title: err,
            icon: 'error'
          })
        })
    }
  }

  return (
    <>
      <form className="main-body needs-validation p-2" onSubmit={handleSubmit(saveTrayMsl)}>
        <div className='input-form col-12 my-2'>
          <label className="col-6 col-md-3" htmlFor="MSL">MSL ID</label>
          <div className="col-6 col-md-9">
            <input className={`form-control ${errors.MSL ? 'is-invalid' : ''}`} type="text" id="MSL" {...register('MSL', { required: true, maxLength: 5 })} readOnly={isEdit} />
            <div className="invalid-tooltip">
              {errors.MSL && getInvalidMsg(errors.MSL.type)}
            </div>
          </div>
        </div>
        <div className='input-form col-12 my-2'>
          <label className="col-6 col-md-3" htmlFor="FLOOR_LIFE">Floor Life</label>
          <div className="col-6 col-md-9">
            <input className={`form-control ${errors.FLOOR_LIFE ? 'is-invalid' : ''}`} type="text" id="FLOOR_LIFE" {...register('FLOOR_LIFE', { maxLength: 20 })} />
            <div className="invalid-tooltip">
              {errors.FLOOR_LIFE && getInvalidMsg(errors.FLOOR_LIFE.type)}
            </div>
          </div>
        </div>
        <button type="submit" id='save' hidden>F5 確認</button>
      </form>
      <div className="footer-bar">
        <Link to={`/datas/tray_msl/${id}`} id='back' className="btn-list col-12 col-md-2">F3 {t('button.back')}</Link>
        <button type="button" className="btn-list col-12 col-md-2" onClick={() => clickById('save')}>F5 {t('button.submit')}</button>
      </div>
      {/* shortcut setting */}
      <ReactShortcut
        keys={'f3'}
        onKeysPressed={() => { clickById('back') }}
      />
      <ReactShortcut
        keys={'f5'}
        onKeysPressed={() => { clickById('save') }}
      />
    </>
  )
}

export default AddTrayMsl