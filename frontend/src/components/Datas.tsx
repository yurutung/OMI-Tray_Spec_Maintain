import { useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import ReactShortcut from 'react-shortcut'
import CsvDownloader from 'react-csv-downloader'
import csv from 'csvtojson'
import { toastMixin, clickById } from '../functions'
import { uploadTraySpec } from '../api/tray_spec'
import { uploadTrayMsl } from '../api/tray_msl'

import TrayMslTable from "./TrayMslTable"
import TraySpecTable from "./TraySpecTable"

const Datas = () => {
  // params
  const { mode, id } = useParams<{ mode: string, id: string }>()

  const tsRef = useRef<any>()
  const tmRef = useRef<any>()
  // click update data
  const updateSelected = () => {
    // TODO: define tray_spec, tray_msl
    if (mode == 'tray_spec')
      tsRef.current?.updateSelected()
    else if (mode == 'tray_msl')
      tmRef.current?.updateSelected()
  }
  // click delete data
  const delSelected = () => {
    // TODO: define tray_spec, tray_msl
    if (mode == 'tray_spec')
      tsRef.current.delSelected()
    else if (mode == 'tray_msl')
      tmRef.current.delSelected()
  }
  // click export data to csv
  const getDatas = () => {
    if (mode == 'tray_spec')
      return tsRef.current?.getDatas()
    else if (mode == 'tray_msl')
      return tmRef.current?.getDatas()
  }
  // upload file
  const handleSelectedFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files
    if (files?.length) {
      const file = files[0]
      toastMixin.fire({
        title: `Upload file: ${file.name}`,
        icon: 'info'
      })

      const reader = new FileReader()
      reader.onloadend = (e) => {
        const csvData: string = reader.result?.toString() || ''
        csv().fromString(csvData).then(o => {
          o.forEach(e => {
            // if data is null or '', then del
            Object.keys(e).forEach(key => {
              if (!e[key])
                delete e[key]
            })
          })
          console.log(o)
          if (mode == 'tray_spec')
            tsRef.current.uploadDatas(o)
          else if (mode == 'tray_msl')
            tmRef.current.uploadDatas(o)
        })
      }
      reader.readAsText(file)
    }
    e.preventDefault()
  }

  // show table
  let table = <div />
  // TODO: define tray_spec, tray_msl
  if (mode == 'tray_spec')
    table = <TraySpecTable mode={mode} id={id} ref={tsRef} />
  else if (mode == 'tray_msl')
    table = <TrayMslTable mode={mode} id={id} ref={tmRef} />

  return (
    <>
      <div className="container h-100">
        <div className="main-body" >
          {table}
        </div>
        <div className="gap-2 p-2 row">
          <Link to={`/search/${mode}`} id='search' className="btn btn-outline-secondary col">F3 離開</Link>
          <Link to={`/add/${mode}/${id}`} id='add' className="btn btn-outline-secondary col">F1 新增</Link>
          <button className="btn btn-outline-secondary col" id='edit' onClick={updateSelected}>F2 更新</button>
          <button className="btn btn-outline-secondary col" id='del' onClick={delSelected}>F4 刪除</button>
          <CsvDownloader datas={getDatas} filename={`exportData-${mode}.csv`} className='btn btn-outline-secondary col' id='exportCsv'>F5 儲存檔案</CsvDownloader>
          <button className="btn btn-outline-secondary col" onClick={() => clickById('uploadFile')}>F6 讀取檔案</button>
          <input type="file" id="uploadFile" accept=".csv" onChange={handleSelectedFile} hidden />
        </div>
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