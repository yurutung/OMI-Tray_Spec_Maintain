import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { upsertTrayLsrMrk } from '../api/tray_lsr_mrk'

const AddTrayLsrMrk = forwardRef((props: { isEdit: boolean, selectedData: ITrayLsrMrk }, ref) => {
  const isEdit = props.isEdit || false
  const selectData = props.selectedData
  const initData = selectData || {
    CUST_CD: undefined,
    PRODSPEC_ID: undefined,
    MARK_LOGO: undefined,
    MARK_TEXT1: undefined,
    MARK_TEXT2: undefined,
    MARK_TEXT3: undefined,
    MARK_TEXT4: undefined,
    MARK_TEXT5: undefined,
    MARK_TEXT6: undefined,
    MARK_TEXT7: undefined,
    MARK_TEXT8: undefined,
    MARK_TEXT9: undefined,
  }
  const [formData, setFormData] = useState<ITrayLsrMrk>(initData)
  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    // if value is '' change to null
    const value = e.currentTarget.value.trim()
    setFormData({
      ...formData,
      [e.currentTarget.id]: value === '' ? null : value
    })
  }
  // useEffect(() => {
  //   console.log(formData)
  // }, [formData])

  useImperativeHandle(
    ref,
    () => ({
      sendLsrMrk() {
        console.log(formData)
        upsertTrayLsrMrk(formData)
          .then(e => console.log(e))
          .catch(e => console.log(e))
      },
      setTrayLsrMrk(value: {}) {
        setFormData({
          ...formData,
          ...value
        })
      },
    })
  )


  return (
    <>
      <form className="h-auto row">
        <div className='d-flex align-items-center col-6 my-2'>
          <label className="col-5" htmlFor="MARK_LOGO">Mark Logo</label>
          <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="MARK_LOGO" value={formData.MARK_LOGO || ''} /></div>
        </div>
        <div className='d-flex align-items-center col-6 my-2'>
          <label className="col-5" htmlFor="MARK_TEXT5">Laser Mark Temp L5</label>
          <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="MARK_TEXT5" value={formData.MARK_TEXT5 || ''} /></div>
        </div>
        <div className='d-flex align-items-center col-6 my-2'>
          <label className="col-5" htmlFor="MARK_TEXT1">Laser Mark Temp L1</label>
          <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="MARK_TEXT1" value={formData.MARK_TEXT1 || ''} /></div>
        </div>
        <div className='d-flex align-items-center col-6 my-2'>
          <label className="col-5" htmlFor="MARK_TEXT6">Laser Mark Temp L6</label>
          <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="MARK_TEXT6" value={formData.MARK_TEXT6 || ''} /></div>
        </div>
        <div className='d-flex align-items-center col-6 my-2'>
          <label className="col-5" htmlFor="MARK_TEXT2">Laser Mark Temp L2</label>
          <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="MARK_TEXT2" value={formData.MARK_TEXT2 || ''} /></div>
        </div>
        <div className='d-flex align-items-center col-6 my-2'>
          <label className="col-5" htmlFor="MARK_TEXT7">Laser Mark Temp L7</label>
          <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="MARK_TEXT7" value={formData.MARK_TEXT7 || ''} /></div>
        </div>
        <div className='d-flex align-items-center col-6 my-2'>
          <label className="col-5" htmlFor="MARK_TEXT3">Laser Mark Temp L3</label>
          <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="MARK_TEXT3" value={formData.MARK_TEXT3 || ''} /></div>
        </div>
        <div className='d-flex align-items-center col-6 my-2'>
          <label className="col-5" htmlFor="MARK_TEXT8">Laser Mark Temp L8</label>
          <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="MARK_TEXT8" value={formData.MARK_TEXT8 || ''} /></div>
        </div>
        <div className='d-flex align-items-center col-6 my-2'>
          <label className="col-5" htmlFor="MARK_TEXT4">Laser Mark Temp L4</label>
          <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="MARK_TEXT4" value={formData.MARK_TEXT4 || ''} /></div>
        </div>
        <div className='d-flex align-items-center col-6 my-2'>
          <label className="col-5" htmlFor="MARK_TEXT9">Laser Mark Temp L9</label>
          <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="MARK_TEXT9" value={formData.MARK_TEXT9 || ''} /></div>
        </div>
        <button type="submit" id='save_lm' className="btn btn-outline-secondary col-2" hidden />
      </form>
    </>
  )
})

export default AddTrayLsrMrk