import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { useHistory } from "react-router-dom"
import BootstrapTable, { SelectRowProps } from "react-bootstrap-table-next"
// @ts-ignore
import cellEditFactory from "react-bootstrap-table2-editor"
import { toastMixin, warnAlert, errAlert, setObjectFormat } from '../functions'
import { getTraySpecs, deleteTraySpec, uploadTraySpec } from '../api/tray_spec'
import { deleteTrayLsrMrk } from '../api/tray_lsr_mrk'

// set table id
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
  const history = useHistory()
  // set function can call by other component
  useImperativeHandle(
    ref,
    () => ({
      /**
       * return tray spec table data
       * @returns tray spec array
       */
      getDatas() {
        const reData: ITraySpec[] = []
        datas.forEach(e => {
          const { id, ...d } = e
          reData.push(d)
        })
        return reData
      },
      /**
       * get selected data
       * send to update page
       */
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
      /**
       * get selected data
       * if click delete, then delete data
       */
      delSelected() {
        if (selected) {
          warnAlert.fire().then((result) => {
            if (result.isConfirmed) {
              deleteTraySpec(selected)
                .then(e => {
                  toastMixin.fire({
                    title: 'Delete data Successfully!'
                  })
                  setSelected(undefined)
                  fetchDatas()
                })
                .catch(err => {
                  console.error(err.response)
                  toastMixin.fire({
                    title: err,
                    icon: 'error'
                  })
                })
              deleteTrayLsrMrk({ CUST_CD: selected.CUST_CD, PRODSPEC_ID: selected.PRODSPEC_ID } as ITrayLsrMrk)
                .then(e => console.log(e))
                .catch(err => console.log(err))
            }
          })
        } else {
          toastMixin.fire({
            title: 'Please select delete item!',
            icon: 'info'
          })
        }
      },
      /**
       * if all datas have id
       * then upload all data to db
       * @param backUrl 
       */
      uploadDatas(backUrl: string) {
        if (document.getElementsByClassName('table-alert').length === 0) {
          // set format
          datas.forEach(d => {
            d = setObjectFormat(d) as ITraySpec
          })
          uploadTraySpec(datas)
            .then(e => {
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
      /**
       * if is preview page and click delete
       * then delete selected data in array
       */
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
      text: "Customer Code",
      classes: (cell: string, row: {}) => {
        if (!cell && isPreview) return 'table-alert'
        return ''
      }
    },
    {
      dataField: "PRODSPEC_ID",
      text: "TSMC Part",
      classes: (cell: string, row: {}) => {
        if (!cell && isPreview) return 'table-alert'
        return ''
      }
    },
    {
      dataField: "CUST_PART_ID",
      text: "Customer Part"
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
      text: "UPD_FLAG"
    },
    {
      dataField: "CLAIM_USER",
      text: "CLAIM_USER"
    },
    {
      dataField: "CLAIM_TIME",
      text: "CLAIM_TIME"
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