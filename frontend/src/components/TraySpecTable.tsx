import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { useHistory } from "react-router-dom"
import BootstrapTable, { SelectRowProps } from "react-bootstrap-table-next"
// @ts-ignore
import cellEditFactory from "react-bootstrap-table2-editor"
import { toastMixin, errAlert } from '../functions'
import { getTraySpecs, deleteTraySpec, uploadTraySpec } from '../api/tray_spec'
import { deleteTrayLsrMrk } from '../api/tray_lsr_mrk'

const getDatasAddId = (d: ITraySpec[]) => {
  d.forEach((e: ITraySpec, i) => e.id = `${i}_${e.CUST_CD}_${e.PRODSPEC_ID}`)
  return d
}

const TraySpecTable = forwardRef((props: { isPreview?: boolean, id?: string, uploadData?: ITraySpec[] }, ref) => {
  // props
  const isPreview = props.isPreview || false
  const id = props.id || '*'
  const initData = props.uploadData || []
  // table data
  const [datas, setDatas] = useState<ITraySpec[]>(getDatasAddId(initData))
  useEffect(() => {
    fetchDatas()
  }, [])
  const fetchDatas = (): void => {
    if (!isPreview)
      getTraySpecs(id)
        .then(({ data: { traySpecs } }: ITraySpec[] | any) => setDatas(getDatasAddId(traySpecs)))
        .catch((err: Error) => console.error(err))
  }

  // select row
  const [selected, setSelected] = useState<ITraySpec>()
  const handleOnSelect = (row: ITraySpec, isSelect: boolean) => {
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
        const reData: ITraySpec[] = []
        datas.forEach(e => {
          const { id, ...d } = e
          reData.push(d)
        })
        return reData
      },
      updateSelected() {
        if (selected) {
          history.push(
            `/add/tray_spec/${id}`,
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
          deleteTraySpec(selected)
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
          deleteTrayLsrMrk(selected)
            .then(e => console.log(e))
            .catch(err => console.log(err))
        } else {
          toastMixin.fire({
            title: 'Please select delete item!',
            icon: 'info'
          })
        }
      },
      uploadDatas(backUrl: string) {
        if (document.getElementsByClassName('table-alert').length === 0) {
          uploadTraySpec(datas)
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
          setDatas(datas.filter(d => !(d.CUST_CD === selected.CUST_CD && d.PRODSPEC_ID === selected.PRODSPEC_ID && d.id === selected.id)))
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
      dataField: "CUST_CD",
      text: "Custumer Code",
      classes: (cell: string, row: {}) => {
        if (!cell) return 'table-alert'
        return ''
      }
    },
    {
      dataField: "PRODSPEC_ID",
      text: "TSMC Part",
      classes: (cell: string, row: {}) => {
        if (!cell) return 'table-alert'
        return ''
      }
    },
    {
      dataField: "CUST_PART_ID",
      text: "Custumer Part"
    },
    {
      dataField: "DESCRIPTION",
      text: "Description"
    },
    {
      dataField: "PIN_A1_LOC",
      text: "Pin 1 Location"
    },
    {
      dataField: "PACKING_TYPE",
      text: "Package Material"
    },
    {
      dataField: "MSL",
      text: "MSL"
    },
    {
      dataField: "TRAY_SIZE",
      text: "Tray Size"
    },
    {
      dataField: "CHIP_SIZE",
      text: "Chip Size"
    },
    {
      dataField: "BIN_GRADE",
      text: "Bin Grade"
    },
    {
      dataField: "TERM_COMPOST",
      text: "Terminal Composition"
    },
    {
      dataField: "PB_FREE",
      text: "Pb-Free(ECO Status)"
    },
    {
      dataField: "TEMP",
      text: "Temperature"
    },
    {
      dataField: "UPD_FLAG",
      text: "updFlag"
    },
    {
      dataField: "CLAIM_USER",
      text: "cliamUser"
    },
    {
      dataField: "CLAIM_TIME",
      text: "claimTime"
    },
    {
      dataField: "DATECODE_LIMIT",
      text: "Date Code Limit"
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

export default TraySpecTable