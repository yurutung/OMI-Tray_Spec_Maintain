import React, { useState } from 'react'
import { Link, useParams, useLocation } from "react-router-dom"
import ReactShortcut from 'react-shortcut'
import { toastMixin, clickById } from '../functions'
import { addTrayMsl, updateTrayMsl } from '../api/tray_msl'

interface stateType {
  isEdit: boolean,
  selectedData: ITrayMsl
}

const AddTrayMsl = () => {
  const { id } = useParams<{ id: string }>()

  const location = useLocation<stateType>()
  const state = location.state || {}
  const isEdit = state.isEdit || false
  const initData = state.selectedData || {
    MSL: undefined,
    FLOOR_LIFE: undefined
  }

  // formData
  const [formData, setFormData] = useState<ITrayMsl>(initData)
  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    // if value is '' change to null
    const value = e.currentTarget.value
    setFormData({
      ...formData,
      [e.currentTarget.id]: value.trim() === '' ? null : value.trim()
    })
  }

  // form submit -> save data
  const saveTrayMsl = (e: React.FormEvent, formData: ITrayMsl | any): void => {
    e.preventDefault()
    if (isEdit) {
      updateTrayMsl(formData)
        .then(e => {
          console.log(e)
          toastMixin.fire({
            title: 'Update data Successfully!'
          })
          clickById('back')
        })
        .catch(err => {
          console.log(err)
          toastMixin.fire({
            title: err,
            icon: 'error'
          })
        })
    } else {
      addTrayMsl(formData)
        .then(e => {
          console.log(e)
          toastMixin.fire({
            title: 'Add data Successfully!'
          })
          clickById('back')
        })
        .catch(err => {
          console.log(err)
          toastMixin.fire({
            title: err,
            icon: 'error'
          })
        })
    }
  }

  return (
    <>
      <form className="container h-100" onSubmit={e => saveTrayMsl(e, formData)}>
        <div className="main-body pt-2">
          <div className='d-flex align-items-center col-12 my-2'>
            <label className="col-3" htmlFor="MSL">MSL ID</label>
            <div className="col-9">
              <input className="form-control" onChange={handleForm} type="text" id="MSL" value={formData.MSL || ''} required disabled={isEdit} />
            </div>
          </div>
          <div className='d-flex align-items-center col-12 my-2'>
            <label className="col-3" htmlFor="FLOOR_LIFE">Floor Life</label>
            <div className="col-9">
              <input className="form-control" onChange={handleForm} type="text" id="FLOOR_LIFE" value={formData.FLOOR_LIFE || ''} />
            </div>
          </div>
        </div>
        <div className="gap-2 p-2 row">
          <Link to={`/datas/tray_msl/${id}`} id='back' className="btn btn-outline-secondary col-2">F3 離開</Link>
          <button type="submit" id='save' className="btn btn-outline-secondary col-2">F5 確認</button>
        </div>
      </form>
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