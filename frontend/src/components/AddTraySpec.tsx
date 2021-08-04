import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams, useLocation } from "react-router-dom"
import ReactShortcut from 'react-shortcut'
import { toastMixin, clickById } from '../functions'
import { addTraySpec, updateTraySpec } from '../api/tray_spec'
import AddTrayLsrMrk from './AddTrayLsrMrk'
import { getTrayLsrMrkById } from '../api/tray_lsr_mrk'


interface stateType {
  isEdit: boolean,
  selectedData: ITraySpec
}

const AddTraySpec = () => {
  const { id } = useParams<{ id: string }>()

  const location = useLocation<stateType>()
  const state = location.state || {}
  const isEdit = state.isEdit || false
  const initData = state.selectedData || {
    CUST_CD: undefined,
    PRODSPEC_ID: undefined,
    CUST_PART_ID: undefined,
    DESCRIPTION: undefined,
    PIN_A1_LOC: undefined,
    PACKING_TYPE: undefined,
    MSL: undefined,
    TRAY_SIZE: '0*0*0',
    CHIP_SIZE: '0*0',
    BIN_GRADE: undefined,
    TERM_COMPOST: undefined,
    PB_FREE: undefined,
    TEMP: undefined,
    UPD_FLAG: undefined,
    CLAIM_USER: undefined,
    CLAIM_TIME: undefined,
    DATECODE_LIMIT: 9999,
  }
  const lsrMrkRef = useRef<any>()
  const [fillLaserMark, setFillLaserMark] = useState(false)

  // formData
  const [formData, setFormData] = useState<ITraySpec>(initData)
  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    // if value is '' change to null
    const key = e.currentTarget.id
    const value = e.currentTarget.value.trim()
    setFormData({
      ...formData,
      [key]: value === '' ? null : value
    })
    if (fillLaserMark && ['CUST_CD', 'PRODSPEC_ID'].includes(key)) {
      lsrMrkRef.current.setTrayLsrMrk({ [key]: value })
    }
    e.preventDefault()
  }
  // tray size handle
  const initTraySize = () => {
    const ts = initData.TRAY_SIZE?.split('*').map(Number)
    if (ts?.length == 3) {
      return {
        traySize_x: ts[0],
        traySize_y: ts[1],
        traySize_z: ts[2]
      }
    } else {
      return {
        traySize_x: 0,
        traySize_y: 0,
        traySize_z: 0
      }
    }
  }
  const [traySizeData, setTraySize] = useState<{ traySize_x: number, traySize_y: number, traySize_z: number }>(initTraySize)
  const handleTraySize = (e: React.FormEvent<HTMLInputElement>): void => {
    // if value is '' change to null
    const value = e.currentTarget.value
    setTraySize({
      ...traySizeData,
      [e.currentTarget.id]: value === '' ? 0 : parseInt(value)
    })
  }
  // if tray size change, then change formData
  useEffect(() => {
    setFormData({
      ...formData,
      TRAY_SIZE: `${traySizeData.traySize_x}*${traySizeData.traySize_y}*${traySizeData.traySize_z}`
    })
  }, [traySizeData])
  // chip size handle
  const initChipSize = () => {
    const ts = initData.CHIP_SIZE?.split('*').map(Number)
    if (ts?.length == 2) {
      return {
        chipSize_x: ts[0],
        chipSize_y: ts[1]
      }
    } else {
      return {
        chipSize_x: 0,
        chipSize_y: 0
      }
    }
  }
  const [chipSizeData, setChipSize] = useState<{ chipSize_x: number, chipSize_y: number }>(initChipSize)
  const handleChipSize = (e: React.FormEvent<HTMLInputElement>): void => {
    // if value is '' change to null
    const value = e.currentTarget.value
    setChipSize({
      ...chipSizeData,
      [e.currentTarget.id]: value === '' ? 0 : parseInt(value)
    })
  }
  // if tray, chip size change, then change formData
  useEffect(() => {
    setFormData({
      ...formData,
      CHIP_SIZE: `${chipSizeData.chipSize_x}*${chipSizeData.chipSize_y}`
    })
  }, [chipSizeData])

  // form submit -> save data
  const saveTraySpec = (e: React.FormEvent, formData: ITraySpec | any): void => {
    e.preventDefault()
    if (isEdit) {
      updateTraySpec(formData)
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
      addTraySpec(formData)
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
    if (fillLaserMark) {
      lsrMrkRef.current.sendLsrMrk()
    }
  }

  // set show laser mark
  const [trayLsrMrk, setTrayLsrMrk] = useState<ITrayLsrMrk>({} as ITrayLsrMrk)
  const handleAddTrayLsrMrk = () => {
    // set id
    if (fillLaserMark) {
      lsrMrkRef.current.setTrayLsrMrk({ CUST_CD: formData.CUST_CD, PRODSPEC_ID: formData.PRODSPEC_ID })
    }

    // update get tray laser mark data
    if (isEdit && formData.CUST_CD && formData.PRODSPEC_ID) {
      getTrayLsrMrkById(formData.CUST_CD, formData.PRODSPEC_ID)
        .then(({ data: { trayLsrMrk: trayLsrMrkBody } }: ITrayLsrMrk | any) => {
          lsrMrkRef.current.setTrayLsrMrk(trayLsrMrkBody)
          // setTrayLsrMrk({
          //   ...trayLsrMrkBody
          // })
        })
        .catch((err: Error) => console.error(err))
    }
  }
  useEffect(() => {
    handleAddTrayLsrMrk()
  }, [fillLaserMark])

  return (
    <>
      <div className="container h-100" onSubmit={e => saveTraySpec(e, formData)}>
        <div className={`main-body pt-2 ${fillLaserMark ? 'add_scroll' : ''}`}>
          <form className="h-auto row">
            <div className='d-flex align-items-center col-6 my-2'>
              <label className="col-5" htmlFor="CUST_CD">Custumer Code</label>
              <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="CUST_CD" value={formData.CUST_CD || ''} required disabled={isEdit} /></div>
            </div>
            <div className='d-flex align-items-center col-6 my-2'>
              <label className="col-5" htmlFor="TRAY_SIZE">Tary Size</label>
              <div className="col-7 row g-0 align-items-center">
                <input className="form-control col" onChange={handleTraySize} type="number" id="traySize_x" value={traySizeData.traySize_x || 0} />*
                <input className="form-control col" onChange={handleTraySize} type="number" id="traySize_y" value={traySizeData.traySize_y || 0} />*
                <input className="form-control col" onChange={handleTraySize} type="number" id="traySize_z" value={traySizeData.traySize_z || 0} />
              </div>
            </div>
            <div className='d-flex align-items-center col-6 my-2'>
              <label className="col-5" htmlFor="PRODSPEC_ID">TSMC Part</label>
              <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="PRODSPEC_ID" value={formData.PRODSPEC_ID || ''} required disabled={isEdit} /></div>
            </div>
            <div className='d-flex align-items-center col-6 my-2'>
              <label className="col-5" htmlFor="CHIP_SIZE">Chip Size</label>
              <div className="col-7 row g-0 align-items-center">
                <input className="form-control col" onChange={handleChipSize} type="text" id="chipSize_x" value={chipSizeData.chipSize_x || 0} />*
                <input className="form-control col" onChange={handleChipSize} type="text" id="chipSize_y" value={chipSizeData.chipSize_y || 0} />
              </div>
            </div>
            <div className='d-flex align-items-center col-6 my-2'>
              <label className="col-5" htmlFor="CUST_PART_ID">Custumer Part</label>
              <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="CUST_PART_ID" value={formData.CUST_PART_ID || ''} /></div>
            </div>
            <div className='d-flex align-items-center col-6 my-2'>
              <label className="col-5" htmlFor="BIN_GRADE">Bin Grade</label>
              <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="BIN_GRADE" value={formData.BIN_GRADE || ''} /></div>
            </div>
            <div className='d-flex align-items-center col-6 my-2'>
              <label className="col-5" htmlFor="PIN_A1_LOC">Pin 1 Location</label>
              <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="PIN_A1_LOC" value={formData.PIN_A1_LOC || ''} /></div>
            </div>
            <div className='d-flex align-items-center col-6 my-2'>
              <label className="col-5" htmlFor="TERM_COMPOST">Terminal Composition</label>
              <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="TERM_COMPOST" value={formData.TERM_COMPOST || ''} /></div>
            </div>
            <div className='d-flex align-items-center col-6 my-2'>
              <label className="col-5" htmlFor="PACKING_TYPE">Package Material</label>
              <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="PACKING_TYPE" value={formData.PACKING_TYPE || ''} /></div>
            </div>
            <div className='d-flex align-items-center col-6 my-2'>
              <label className="col-5" htmlFor="PB_FREE">Pb-Free(ECO Status)</label>
              <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="PB_FREE" value={formData.PB_FREE || ''} /></div>
            </div>
            <div className='d-flex align-items-center col-6 my-2'>
              <label className="col-5" htmlFor="MSL">MSL</label>
              <div className="col-7"><input className="form-control" onChange={handleForm} type="text" id="MSL" value={formData.MSL || ''} /></div>
            </div>
            <div className='d-flex align-items-center col-6 my-2'>
              <label className="col-5" htmlFor="DATECODE_LIMIT">Date Code Limit</label>
              <div className="col-7"><input className="form-control" onChange={handleForm} type="number" id="DATECODE_LIMIT" value={formData.DATECODE_LIMIT || 9999} required /></div>
            </div>
            <div className='d-flex align-items-center col-6 my-2'>
              <label className="col-5" htmlFor="TEMP">Temperature</label>
              <div className="col-7"><input className="form-control" onChange={handleForm} type="number" id="TEMP" value={formData.TEMP || ''} /></div>
            </div>
            <div className='d-flex align-items-center col-12'>
              <label className="col-3" htmlFor="DESCRIPTION">Description</label>
              <div className="col-9"><input className="form-control" onChange={handleForm} type="text" id="DESCRIPTION" value={formData.DESCRIPTION || ''} /></div>
            </div>
            <button type="submit" id='save' className="btn btn-outline-secondary col-2" hidden />
          </form>
          {/* {fillLaserMark ? <AddTrayLsrMrk isEdit={isEdit} selectedData={trayLsrMrk} ref={lsrMrkRef} /> : <></>} */}
          {/* <nav hidden={!fillLaserMark}><AddTrayLsrMrk isEdit={isEdit} selectedData={trayLsrMrk} /></nav> */}
          <nav hidden={!fillLaserMark}><AddTrayLsrMrk isEdit={isEdit} selectedData={trayLsrMrk} ref={lsrMrkRef} /></nav>
        </div>
        <div className="gap-2 p-2 row">
          <Link to={`/datas/tray_spec/${id}`} id='back' className="btn btn-outline-secondary col-2">F3 離開</Link>
          <button className="btn btn-outline-secondary col-2" id='fillLaser' type="button" onClick={() => setFillLaserMark(true)}>F4 Fill Laser Mark</button>
          <button type="button" className="btn btn-outline-secondary col-2" onClick={() => clickById('save')}>F5 確認</button>
        </div>
      </div>
      <ReactShortcut
        keys={'f3'}
        onKeysPressed={() => { clickById('back') }}
      />
      <ReactShortcut
        keys={'f4'}
        onKeysPressed={() => { clickById('fillLaser') }}
      />
      <ReactShortcut
        keys={'f5'}
        onKeysPressed={() => { clickById('save') }}
      />
    </>
  )
}

export default AddTraySpec