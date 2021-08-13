import { useRef, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import ReactShortcut from 'react-shortcut'
import CsvDownloader from 'react-csv-downloader'
import csv from 'csvtojson'
import { toastMixin, clickById, setTitleBar } from '../functions'

import TrayMslTable from "./TrayMslTable"
import TraySpecTable from "./TraySpecTable"

const Datas = () => {
  // params
  const { mode, id } = useParams<{ mode: string, id: string }>()
  // set title
  if (mode === 'tray_spec')
    setTitleBar('Tray Spec. Maintaince')
  else if (mode === 'tray_msl')
    setTitleBar('MSL Spec. Maintaince')

  const tsRef = useRef<any>()
  const tmRef = useRef<any>()
  // click update data
  const updateSelected = () => {
    // TODO: define tray_spec, tray_msl
    if (mode === 'tray_spec')
      tsRef.current?.updateSelected()
    else if (mode === 'tray_msl')
      tmRef.current?.updateSelected()
  }
  // click delete data
  const delSelected = () => {
    // TODO: define tray_spec, tray_msl
    if (mode === 'tray_spec')
      tsRef.current.delSelected()
    else if (mode === 'tray_msl')
      tmRef.current.delSelected()
  }
  // click export data to csv
  const getDatas = () => {
    if (mode === 'tray_spec')
      return tsRef.current?.getDatas()
    else if (mode === 'tray_msl')
      return tmRef.current?.getDatas()
  }
  // click upload file
  const history = useHistory()
  const handleSelectedFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files
    if (files?.length) {
      const file = files[0]
      toastMixin.fire({
        title: `Upload file: ${file.name}`,
        icon: 'info'
      })
      // read file
      const reader = new FileReader()
      reader.onloadend = (e) => {
        const csvData: string = reader.result?.toString() || ''
        csv().fromString(csvData).then(o => {
          o.forEach(e => {
            // if data is '', then set null
            Object.keys(e).forEach(key => {
              if (!e[key])
                e[key] = null
            })
          })
          // change to preview page
          history.push(
            `/upload_preview/${mode}`,
            {
              previewDatas: o,
              backUrl: `/datas/${mode}/${id}`
            }
          )
        })
      }
      reader.readAsText(file)
      e.target.files = null
    }
    e.preventDefault()
  }

  // show table
  let table = <div />
  // TODO: define tray_spec, tray_msl
  if (mode === 'tray_spec')
    table = <TraySpecTable id={id} ref={tsRef} />
  else if (mode === 'tray_msl')
    table = <TrayMslTable id={id} ref={tmRef} />

  return (
    <>
      <div className="main-body" >
        {table}
      </div>
      <div className="footer-bar">
        <Link to={`/search/${mode}`} id='search' className="btn-list col-12 col-md">F3 離開</Link>
        <Link to={`/add/${mode}/${id}`} id='add' className="btn-list col-12 col-md">F1 新增</Link>
        <button className="btn-list col-12 col-md" id='edit' onClick={updateSelected}>F2 更新</button>
        <button className="btn-list col-12 col-md" id='del' onClick={delSelected}>F4 刪除</button>
        <CsvDownloader datas={getDatas} filename={`exportData-${mode}.csv`} className='btn-list col-12 col-md' id='exportCsv'>F5 儲存檔案</CsvDownloader>
        <button className="btn-list col-12 col-md" onClick={() => clickById('uploadFile')}>F6 讀取檔案</button>
        <input type="file" id="uploadFile" accept=".csv" onChange={handleSelectedFile} hidden />
      </div>
      {/* shortcut setting */}
      <ReactShortcut
        keys={'f3'}
        onKeysPressed={() => { clickById('search') }}
      />
      <ReactShortcut
        keys={'f1'}
        onKeysPressed={() => { clickById('add') }}
      />
      <ReactShortcut
        keys={'f2'}
        onKeysPressed={() => { clickById('edit') }}
      />
      <ReactShortcut
        keys={'f4'}
        onKeysPressed={() => { clickById('del') }}
      />
      <ReactShortcut
        keys={'f5'}
        onKeysPressed={() => { clickById('exportCsv') }}
      />
      <ReactShortcut
        keys={'f6'}
        onKeysPressed={() => { clickById('uploadFile') }}
      />
    </>
  )
}

export default Datas