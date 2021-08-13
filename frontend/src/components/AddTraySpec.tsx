import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams, useLocation } from "react-router-dom"
import { useForm } from "react-hook-form"
import ReactShortcut from 'react-shortcut'
import { toastMixin, clickById, setTitleBar, getInvalidMsg } from '../functions'
import { addTraySpec, updateTraySpec } from '../api/tray_spec'
import AddTrayLsrMrk from './AddTrayLsrMrk'
import { getCoWoSPart, getTrayLsrMrkById } from '../api/tray_lsr_mrk'


interface stateType {
  isEdit: boolean,
  selectedData: ITraySpec
}

const AddTraySpec = () => {
  const { id } = useParams<{ id: string }>()

  const location = useLocation<stateType>()
  const state = location.state || {}
  const isEdit = state.isEdit || false
  const initData = () => {
    const d = state.selectedData
    let init = {
      TRAY_SIZE_dim: {
        x: 0,
        y: 0,
        z: 0
      },
      CHIP_SIZE_dim: {
        x: 0,
        y: 0
      },
      PACKING_TYPE: 'TRAY',
      PB_FREE: 'Y',
      TEMP: 0,
      DATECODE_LIMIT: 9999,
    }
    if (d) {
      init = {
        ...init,
        ...d
      }
      const ts = d.TRAY_SIZE?.split('*').map(Number)
      if (ts?.length == 3) {
        init.TRAY_SIZE_dim = {
          x: ts[0],
          y: ts[1],
          z: ts[2]
        }
      }
      const cs = d.CHIP_SIZE?.split('*').map(Number)
      if (cs?.length == 2) {
        init.CHIP_SIZE_dim = {
          x: cs[0],
          y: cs[1]
        }
      }
    }
    return init as ITraySpec
  }
  // formData
  const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm<ITraySpec>({ mode: 'all', defaultValues: initData() })

  // set title
  setTitleBar(`Tray Spec. Maintaince ${isEdit ? 'Update' : 'Add'}`)

  // set laser mark
  const lsrMrkRef = useRef<any>()
  const [CoWoSParts, setCoWoSParts] = useState<Array<string>>()
  const [isCoWoSPart, setIsCoWoSPart] = useState(false)
  const [btn_fillLaserMark, setFillLaserMark] = useState(false)
  const [isShowLaserMark, setIsShowLaserMark] = useState(false)

  // form submit -> save data
  const addData = (formData: ITraySpec) => {
    addTraySpec(formData)
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
  const updateData = (formData: ITraySpec) => {
    updateTraySpec(formData)
      .then(e => {
        toastMixin.fire({
          title: 'Update data Successfully!'
        })
        clickById('back')
      })
      .catch(err => {
        console.error(err.response)
        toastMixin.fire({
          title: err.response.status == 404 ? 'Nothing has changed!' : err,
          icon: 'error'
        })
      })
  }
  const checkLsrMrk = () => {
    return lsrMrkRef.current.checkLsrMrkData()
  }
  const saveTraySpec = (formData: ITraySpec): void => {
    formData.TRAY_SIZE = `${formData.TRAY_SIZE_dim?.x || 0}*${formData.TRAY_SIZE_dim?.y || 0}*${formData.TRAY_SIZE_dim?.z || 0}`
    formData.CHIP_SIZE = `${formData.CHIP_SIZE_dim?.x || 0}*${formData.CHIP_SIZE_dim?.y || 0}`
    if (isEdit) {
      if (isShowLaserMark && checkLsrMrk()) {
        lsrMrkRef.current.sendLsrMrk()
        updateData(formData)
      } else if (!isShowLaserMark) {
        updateData(formData)
      }
    } else {
      if (isShowLaserMark && checkLsrMrk()) {
        lsrMrkRef.current.sendLsrMrk()
        addData(formData)
      } else if (!isShowLaserMark) {
        addData(formData)
      }
    }
  }

  // set show laser mark
  const CUST_CD = watch('CUST_CD')
  const PRODSPEC_ID = watch('PRODSPEC_ID')
  const getEditTrayLsrMrk = () => {
    // update get tray laser mark data
    if (isEdit && CUST_CD && PRODSPEC_ID) {
      getTrayLsrMrkById(CUST_CD, PRODSPEC_ID)
        .then(({ data: { trayLsrMrk: trayLsrMrkBody } }: ITrayLsrMrk | any) => {
          if (trayLsrMrkBody) {
            lsrMrkRef.current.setTrayLsrMrk(trayLsrMrkBody)
            setFillLaserMark(true)
          }
        })
        .catch((err: Error) => console.error(err))
    }
  }
  const setIsCoWoS = () => {
    let e = false
    if (CoWoSParts?.includes(PRODSPEC_ID))
      e = true
    setIsCoWoSPart(e)
    lsrMrkRef.current.setIsCoWoS(e)
  }
  useEffect(() => {
    getEditTrayLsrMrk()
  }, [isEdit])
  // if CoWoSParts is empty, then get CoWoSParts
  useEffect(() => {
    if (!CoWoSParts) {
      getCoWoSPart()
        .then(({ data: { CoWoSParts: CoWoS } }) => setCoWoSParts(CoWoS))
        .catch(err => console.log(err))
    } else {
      setIsCoWoS()
    }
  }, [CoWoSParts])
  // if id change, set id
  useEffect(() => {
    lsrMrkRef.current.setTrayLsrMrk({ CUST_CD: CUST_CD, PRODSPEC_ID: PRODSPEC_ID })
  }, [CUST_CD, PRODSPEC_ID])
  // if part id is CoWoS Parts, isCoWoSPart set true
  useEffect(() => {
    setIsCoWoS()
  }, [PRODSPEC_ID])
  // if isCoWoSPart or btn_fillLaserMark change, set isShowLaserMark
  useEffect(() => {
    setIsShowLaserMark(isCoWoSPart || btn_fillLaserMark)
  }, [isCoWoSPart, btn_fillLaserMark])


  return (
    <>
      <div className={`main-body add-scroll`}>
        <form className="h-auto row m-0 px-2 needs-validation" onSubmit={handleSubmit(saveTraySpec, checkLsrMrk)}>
          <div className='input-form col-12 col-md-6 my-1 px-1'>
            <label className="col-6" htmlFor="CUST_CD">Customer Code</label>
            <div className="col-6">
              <input className={`form-control ${errors.CUST_CD ? 'is-invalid' : ''}`} type="text" id="CUST_CD" {...register('CUST_CD', { required: true, maxLength: 64 })} readOnly={isEdit} />
              <div className="invalid-tooltip">
                {errors.CUST_CD && getInvalidMsg(errors.CUST_CD.type)}
              </div>
            </div>
          </div>
          <div className='input-form col-12 col-md-6 my-1 px-1'>
            <label className="col-6" htmlFor="TRAY_SIZE">Tary Size</label>
            <div className="col-6 row g-0 align-items-center">
              <input className={`form-control col px-1 me-1 ${errors.TRAY_SIZE_dim?.x ? 'is-invalid' : ''}`} type="number" {...register('TRAY_SIZE_dim.x', { valueAsNumber: true })} />*
              <input className={`form-control col px-1 mx-1 ${errors.TRAY_SIZE_dim?.y ? 'is-invalid' : ''}`} type="number" {...register('TRAY_SIZE_dim.y', { valueAsNumber: true })} />*
              <input className={`form-control col px-1 ms-1 ${errors.TRAY_SIZE_dim?.z ? 'is-invalid' : ''}`} type="number" {...register('TRAY_SIZE_dim.z', { valueAsNumber: true })} />
              <div className="invalid-tooltip">
                {errors.TRAY_SIZE_dim?.x && getInvalidMsg(errors.TRAY_SIZE_dim.x.type)}
                {errors.TRAY_SIZE_dim?.y && getInvalidMsg(errors.TRAY_SIZE_dim.y.type)}
                {errors.TRAY_SIZE_dim?.z && getInvalidMsg(errors.TRAY_SIZE_dim.z.type)}
              </div>
            </div>
          </div>
          <div className='input-form col-12 col-md-6 my-1 px-1'>
            <label className="col-6" htmlFor="PRODSPEC_ID">TSMC Part</label>
            <div className="col-6">
              <input className={`form-control ${errors.PRODSPEC_ID ? 'is-invalid' : ''}`} type="text" id="PRODSPEC_ID" {...register('PRODSPEC_ID', { required: true, maxLength: 64 })} readOnly={isEdit} />
              <div className="invalid-tooltip">
                {errors.PRODSPEC_ID && getInvalidMsg(errors.PRODSPEC_ID.type)}
              </div>
            </div>
          </div>
          <div className='input-form col-12 col-md-6 my-1 px-1'>
            <label className="col-6" htmlFor="CHIP_SIZE">Chip Size</label>
            <div className="col-6 row g-0 align-items-center">
              <input className={`form-control col px-1 me-1 ${errors.CHIP_SIZE_dim?.x ? 'is-invalid' : ''}`} type="text" {...register('CHIP_SIZE_dim.x', { valueAsNumber: true })} />*
              <input className={`form-control col px-1 ms-1 ${errors.CHIP_SIZE_dim?.y ? 'is-invalid' : ''}`} type="text" {...register('CHIP_SIZE_dim.y', { valueAsNumber: true })} />
              <div className="invalid-tooltip">
                {errors.CHIP_SIZE_dim?.x && getInvalidMsg(errors.CHIP_SIZE_dim.x.type)}
                {errors.CHIP_SIZE_dim?.y && getInvalidMsg(errors.CHIP_SIZE_dim.y.type)}
              </div>
            </div>
          </div>
          <div className='input-form col-12 col-md-6 my-1 px-1'>
            <label className="col-6" htmlFor="CUST_PART_ID">Customer Part</label>
            <div className="col-6"><input className="form-control" type="text" id="CUST_PART_ID" {...register('CUST_PART_ID', { maxLength: 64 })} /></div>
          </div>
          <div className='input-form col-12 col-md-6 my-1 px-1'>
            <label className="col-6" htmlFor="BIN_GRADE">Bin Grade</label>
            <div className="col-6"><input className="form-control" type="text" id="BIN_GRADE" {...register('BIN_GRADE', { maxLength: 16 })} /></div>
          </div>
          <div className='input-form col-12 col-md-6 my-1 px-1'>
            <label className="col-6" htmlFor="PIN_A1_LOC">Pin 1 Location</label>
            <div className="col-6"><input className="form-control" type="text" id="PIN_A1_LOC" {...register('PIN_A1_LOC', { maxLength: 5 })} /></div>
          </div>
          <div className='input-form col-12 col-md-6 my-1 px-1'>
            <label className="col-6" htmlFor="TERM_COMPOST">Terminal Composition</label>
            <div className="col-6"><input className="form-control" type="text" id="TERM_COMPOST" {...register('TERM_COMPOST', { maxLength: 16 })} /></div>
          </div>
          <div className='input-form col-12 col-md-6 my-1 px-1'>
            <label className="col-6" htmlFor="PACKING_TYPE">Package Material</label>
            <div className="col-6"><input className="form-control" type="text" id="PACKING_TYPE" {...register('PACKING_TYPE', { maxLength: 20 })} /></div>
          </div>
          <div className='input-form col-12 col-md-6 my-1 px-1'>
            <label className="col-6" htmlFor="PB_FREE">Pb-Free(ECO Status)</label>
            <div className="col-6"><input className="form-control" type="text" id="PB_FREE" {...register('PB_FREE', { maxLength: 1 })} /></div>
          </div>
          <div className='input-form col-12 col-md-6 my-1 px-1'>
            <label className="col-6" htmlFor="MSL">MSL</label>
            <div className="col-6"><input className="form-control" type="text" id="MSL" {...register('MSL', { maxLength: 5 })} /></div>
          </div>
          <div className='input-form col-12 col-md-6 my-1 px-1'>
            <label className="col-6" htmlFor="DATECODE_LIMIT">Date Code Limit</label>
            <div className="col-6"><input className="form-control" type="number" id="DATECODE_LIMIT" {...register('DATECODE_LIMIT', { required: true, valueAsNumber: true })} /></div>
          </div>
          <div className='input-form col-12 col-md-6 my-1 px-1'>
            <label className="col-6" htmlFor="TEMP">Temperature</label>
            <div className="col-6"><input className="form-control" type="number" id="TEMP" {...register('TEMP', { valueAsNumber: true })} /></div>
          </div>
          <div className='input-form col-12 my-1 px-1'>
            <label className="col-6 col-md-3" htmlFor="DESCRIPTION">Description</label>
            <div className="col-6 col-md-9"><input className="form-control" type="text" id="DESCRIPTION" {...register('DESCRIPTION', { maxLength: 128 })} /></div>
          </div>
          <button type="submit" id='save' hidden />
        </form>
        <nav hidden={!isShowLaserMark}><AddTrayLsrMrk isEdit={isEdit} ref={lsrMrkRef} /></nav>
      </div>
      <div className="footer-bar">
        <Link to={`/datas/tray_spec/${id}`} id='back' className="btn-list col-12 col-md-2">F3 離開</Link>
        <button className="btn-list col-12 col-md-3" id='fillLaser' type="button" onClick={() => setFillLaserMark(true)}>F4 Fill Laser Mark</button>
        <button type="button" className="btn-list col-12 col-md-2" onClick={() => clickById('save')}>F5 確認</button>
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