import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import { upsertTrayLsrMrk, deleteTrayLsrMrk } from '../api/tray_lsr_mrk'
import { clickById } from '../functions'

const AddTrayLsrMrk = forwardRef((props: { isEdit: boolean }, ref) => {
  const isEdit = props.isEdit || false
  const initData = {} as ITrayLsrMrk

  // formData
  const { register, getValues, setValue, handleSubmit, formState: { errors } } = useForm<ITrayLsrMrk>({ mode: 'all', defaultValues: initData })
  const [isCoWoSPart, setIsCoWoSPart] = useState(false)
  // set id register
  register('CUST_CD', { required: true })
  register('PRODSPEC_ID', { required: true })

  const saveLsrMrk = (formData: ITrayLsrMrk): void => {
    let isDel = false
    // if not cowos part & isedit
    // if all input is null, then delete
    if (!isCoWoSPart && isEdit) {
      isDel = Object.entries(formData).every(([key, value]: any) => {
        if ((!key.includes('MARK_')) || (key.includes('MARK_') && !value))
          return true
        return false
      })
    }
    if (isDel) {
      deleteTrayLsrMrk(formData)
        .then(e => console.log(e))
        .catch(e => console.log(e))
    } else {
      upsertTrayLsrMrk(formData)
        .then(e => console.log(e))
        .catch(e => console.log(e))
    }

  }
  const checkData = () => {
    const data = getValues()
    if (isCoWoSPart) {
      // if (true) {
      for (const [key, value] of Object.entries(data)) {
        if (key.includes('MARK_') && value) return true
      }
      return false
    }
    return true
  }

  useImperativeHandle(
    ref,
    () => ({
      checkLsrMrkData(): boolean {
        clickById('check')
        return checkData()
      },
      sendLsrMrk() {
        if (checkData()) {
          const data = getValues()
          saveLsrMrk(data)
        }
      },
      setTrayLsrMrk(value: {}) {
        Object.entries(value).forEach(([key, value]: any) => {
          setValue(key, value)
        })
      },
      setIsCoWoS(e: boolean) {
        setIsCoWoSPart(e)
      }
    })
  )


  return (
    <>
      <form className={`h-auto row m-0 px-2h-auto row m-0 px-2`} onSubmit={handleSubmit(() => { })} >
        <div className='input-form col-12 col-md-6 my-1 px-1'>
          <label className="col-6" htmlFor="MARK_LOGO">Mark Logo</label>
          <div className="col-6">
            <input className={`form-control ${errors.MARK_LOGO ? 'is-invalid' : ''}`} type="text" id="MARK_LOGO" {...register('MARK_LOGO', { maxLength: 64, validate: checkData })} />
            {/* <div className="invalid-feedback"> */}
            <div className="invalid-tooltip">
              {errors.MARK_LOGO && errors.MARK_LOGO.type === 'validate' && 'Please input one Laser Mark!'}
            </div>
          </div>
        </div>
        <div className='input-form col-12 col-md-6 my-1 px-1'>
          <label className="col-6" htmlFor="MARK_TEXT5">Laser Mark Temp L5</label>
          <div className="col-6"><input className="form-control" type="text" id="MARK_TEXT5" {...register('MARK_TEXT5', { maxLength: 64 })} /></div>
        </div>
        <div className='input-form col-12 col-md-6 my-1 px-1'>
          <label className="col-6" htmlFor="MARK_TEXT1">Laser Mark Temp L1</label>
          <div className="col-6"><input className="form-control" type="text" id="MARK_TEXT1" {...register('MARK_TEXT1', { maxLength: 64 })} /></div>
        </div>
        <div className='input-form col-12 col-md-6 my-1 px-1'>
          <label className="col-6" htmlFor="MARK_TEXT6">Laser Mark Temp L6</label>
          <div className="col-6"><input className="form-control" type="text" id="MARK_TEXT6"  {...register('MARK_TEXT6', { maxLength: 64 })} /></div>
        </div>
        <div className='input-form col-12 col-md-6 my-1 px-1'>
          <label className="col-6" htmlFor="MARK_TEXT2">Laser Mark Temp L2</label>
          <div className="col-6"><input className="form-control" type="text" id="MARK_TEXT2" {...register('MARK_TEXT2', { maxLength: 64 })} /></div>
        </div>
        <div className='input-form col-12 col-md-6 my-1 px-1'>
          <label className="col-6" htmlFor="MARK_TEXT7">Laser Mark Temp L7</label>
          <div className="col-6"><input className="form-control" type="text" id="MARK_TEXT7"  {...register('MARK_TEXT7', { maxLength: 64 })} /></div>
        </div>
        <div className='input-form col-12 col-md-6 my-1 px-1'>
          <label className="col-6" htmlFor="MARK_TEXT3">Laser Mark Temp L3</label>
          <div className="col-6"><input className="form-control" type="text" id="MARK_TEXT3"  {...register('MARK_TEXT3', { maxLength: 64 })} /></div>
        </div>
        <div className='input-form col-12 col-md-6 my-1 px-1'>
          <label className="col-6" htmlFor="MARK_TEXT8">Laser Mark Temp L8</label>
          <div className="col-6"><input className="form-control" type="text" id="MARK_TEXT8" {...register('MARK_TEXT8', { maxLength: 64 })} /></div>
        </div>
        <div className='input-form col-12 col-md-6 my-1 px-1'>
          <label className="col-6" htmlFor="MARK_TEXT4">Laser Mark Temp L4</label>
          <div className="col-6"><input className="form-control" type="text" id="MARK_TEXT4"  {...register('MARK_TEXT4', { maxLength: 64 })} /></div>
        </div>
        <div className='input-form col-12 col-md-6 my-1 px-1'>
          <label className="col-6" htmlFor="MARK_TEXT9">Laser Mark Temp L9</label>
          <div className="col-6"><input className="form-control" type="text" id="MARK_TEXT9"  {...register('MARK_TEXT9', { maxLength: 64 })} /></div>
        </div>
        <button type="submit" id='check' hidden />
      </form>
    </>
  )
})

export default AddTrayLsrMrk