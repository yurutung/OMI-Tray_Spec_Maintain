import React, { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from "react-router-dom"
import ReactShortcut from 'react-shortcut'


const AddTrayLsrMrk = () => {

  // const [formData, setFormData] = useState<ITrayLsrMrk | {}>({})
  // const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
  //   // if value is '' change to null
  //   const value = e.currentTarget.value
  //   setFormData({
  //     ...formData,
  //     [e.currentTarget.id]: value.trim() === '' ? null : value.trim()
  //   })
  // }

  return (
    <>
      <div className="h-auto row">
        <div className='d-flex align-items-center col-6 my-2'>
          <label className="col-5" htmlFor="MARK_LOGO">Mark Logo</label>
          <div className="col-7"><input className="form-control" type="text" id="MARK_LOGO" /></div>
          {/* <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="MARK_LOGO" value={formData.MARK_LOGO || ''} /></div> */}
        </div>
        <div className='d-flex align-items-center col-6 my-2'>
          <label className="col-5" htmlFor="MARK_TEXT5">Laser Mark Temp L5</label>
          <div className="col-7"><input className="form-control" type="text" id="MARK_TEXT5" /></div>
          {/* <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="MARK_TEXT5" value={formData.MARK_TEXT5 || ''} /></div> */}
        </div>
        <div className='d-flex align-items-center col-6 my-2'>
          <label className="col-5" htmlFor="MARK_TEXT1">Laser Mark Temp L1</label>
          <div className="col-7"><input className="form-control" type="text" id="MARK_TEXT1" /></div>
          {/* <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="MARK_TEXT1" value={formData.MARK_TEXT1 || ''} /></div> */}
        </div>
        <div className='d-flex align-items-center col-6 my-2'>
          <label className="col-5" htmlFor="MARK_TEXT6">Laser Mark Temp L6</label>
          <div className="col-7"><input className="form-control" type="text" id="MARK_TEXT6" /></div>
          {/* <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="MARK_TEXT6" value={formData.MARK_TEXT6 || ''} /></div> */}
        </div>
        <div className='d-flex align-items-center col-6 my-2'>
          <label className="col-5" htmlFor="MARK_TEXT2">Laser Mark Temp L2</label>
          <div className="col-7"><input className="form-control" type="text" id="MARK_TEXT2" /></div>
          {/* <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="MARK_TEXT2" value={formData.MARK_TEXT2 || ''} /></div> */}
        </div>
        <div className='d-flex align-items-center col-6 my-2'>
          <label className="col-5" htmlFor="MARK_TEXT7">Laser Mark Temp L7</label>
          <div className="col-7"><input className="form-control" type="text" id="MARK_TEXT7" /></div>
          {/* <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="MARK_TEXT7" value={formData.MARK_TEXT7 || ''} /></div> */}
        </div>
        <div className='d-flex align-items-center col-6 my-2'>
          <label className="col-5" htmlFor="MARK_TEXT3">Laser Mark Temp L3</label>
          <div className="col-7"><input className="form-control" type="text" id="MARK_TEXT3" /></div>
          {/* <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="MARK_TEXT3" value={formData.MARK_TEXT3 || ''} /></div> */}
        </div>
        <div className='d-flex align-items-center col-6 my-2'>
          <label className="col-5" htmlFor="MARK_TEXT8">Laser Mark Temp L8</label>
          <div className="col-7"><input className="form-control" type="text" id="MARK_TEXT8" /></div>
          {/* <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="MARK_TEXT8" value={formData.MARK_TEXT8 || ''} /></div> */}
        </div>
        <div className='d-flex align-items-center col-6 my-2'>
          <label className="col-5" htmlFor="MARK_TEXT4">Laser Mark Temp L4</label>
          <div className="col-7"><input className="form-control" type="text" id="MARK_TEXT4" /></div>
          {/* <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="MARK_TEXT4" value={formData.MARK_TEXT4 || ''} /></div> */}
        </div>
        <div className='d-flex align-items-center col-6 my-2'>
          <label className="col-5" htmlFor="MARK_TEXT9">Laser Mark Temp L9</label>
          <div className="col-7"><input className="form-control" type="text" id="MARK_TEXT9" /></div>
          {/* <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="MARK_TEXT9" value={formData.MARK_TEXT9 || ''} /></div> */}
        </div>
      </div>
    </>
  )
}

export default AddTrayLsrMrk