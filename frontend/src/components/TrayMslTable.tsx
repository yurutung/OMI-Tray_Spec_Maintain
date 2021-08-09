import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { useHistory } from "react-router-dom"
import BootstrapTable, { SelectRowProps } from "react-bootstrap-table-next"
// @ts-ignore
import cellEditFactory from "react-bootstrap-table2-editor"
import { toastMixin, errAlert } from '../functions'
import { getTrayMsls, deleteTrayMsl, uploadTrayMsl } from '../api/tray_msl'

const getDatasAddId = (d: ITrayMsl[]) => {
  d.forEach((e: ITrayMsl, i) => e.id = `${i}_${e.MSL}`)
  return d
}

const TrayMslTable = forwardRef((props: { isPreview?: boolean, id?: string, uploadData?: ITrayMsl[] }, ref) => {
  // props
  const isPreview = props.isPreview || false
  const id = props.id || '*'
  const initData = props.uploadData || []
  // table data
  const [datas, setDatas] = useState<ITrayMsl[]>(getDatasAddId(initData))
  useEffect(() => {
    fetchDatas()
  }, [])
  const fetchDatas = (): void => {
    if (!isPreview)
      getTrayMsls(id)
        .then(({ data: { trayMsls } }: ITrayMsl[] | any) => setDatas(getDatasAddId(trayMsls)))
        .catch((err: Error) => console.error(err))
  }
  // select row
  const [selected, setSelected] = useState<ITrayMsl>()
  const handleOnSelect = (row: ITrayMsl, isSelect: boolean) => {
    if (isSelect) {
      setSelected(row)
    }
  }
  // get select and send to update page
  const history = useHistory()
  useImperativeHandle(
    ref,
    () => ({
      getDatas() {
        return datas
      },
      updateSelected() {
        if (selected) {
          history.push(
            `/add/tray_msl/${id}`,
            {
              isEdit: true,
              selectedData: selected
            }
          )
        } else {
          toastMixin.fire({
            title: 'Please select update item!',
            icon: 'info'
          })
        }
      },
      delSelected() {
        if (selected) {
          deleteTrayMsl(selected)
            .then(e => {
              toastMixin.fire({
                title: 'Delete data Successfully!'
              })
              fetchDatas()
            })
            .catch(err => {
              console.log(err)
              toastMixin.fire({
                title: err,
                icon: 'error'
              })
            })
        } else {
          toastMixin.fire({
            title: 'Please select delete item!',
            icon: 'info'
          })
        }
      },
      uploadDatas(backUrl: string) {
        if (document.getElementsByClassName('table-alert').length === 0) {
          uploadTrayMsl(datas)
            .then(e => {
              console.log(e)
              toastMixin.fire({
                title: 'Upload data Successfully!'
              })
            })
            .catch(err => {
              const errData = err.response.data
              let showMsg = ''
              errData.errData.forEach((e: { data: any; err: any }) => {
                showMsg += `${JSON.stringify(e.data)} => ${e.err.original.text} \n`
              })
              errAlert.fire({
                title: errData.msg,
                text: showMsg
              })
            })
            .finally(() => history.push(backUrl))
        } else {
          toastMixin.fire({
            title: 'Please filled ID!',
            icon: 'error'
          })
        }
      },
      delSelectedPre() {
        if (selected && isPreview) {
          setDatas(datas.filter(d => !(d.MSL === selected.MSL)))
        } else {
          toastMixin.fire({
            title: 'Please select delete item!',
            icon: 'info'
          })
        }
      }
    }),
  )

  const columns = [
    {
      dataField: "id",
      text: "id",
      hidden: true
    },
    {
      dataField: "MSL",
      text: "MSL ID",
      classes: (cell: string, row: {}) => {
        if (!cell) return 'table-alert'
        return ''
      }
    },
    {
      dataField: "FLOOR_LIFE",
      text: "Floor Life",
    },
  ]

  const selectRow: SelectRowProps<any> = {
    mode: 'radio',
    clickToSelect: isPreview ? false : true,
    style: { backgroundColor: '#c8e6c9' },
    onSelect: handleOnSelect,
  }
  const cellEdit = {
    mode: 'click',
    blurToSave: true
  }

  return (
    <BootstrapTable keyField="id" data={datas} columns={columns} selectRow={selectRow} cellEdit={cellEditFactory(cellEdit)} noDataIndication='Table is Empty' />
  )
})

export default TrayMslTable