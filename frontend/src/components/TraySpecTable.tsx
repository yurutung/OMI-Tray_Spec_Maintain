import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { useHistory } from "react-router-dom"
import BootstrapTable, { SelectRowProps } from "react-bootstrap-table-next"
import { toastMixin } from '../functions'
import { getTraySpecs, deleteTraySpec } from '../api/tray_spec'

const TraySpecTable = forwardRef((props: { mode: string, id: string }, ref) => {
  // props
  const mode = props.mode
  const id = props.id
  // table data
  const [datas, setDatas] = useState<ITraySpec[]>([])
  useEffect(() => {
    fetchDatas()
  }, [])
  const fetchDatas = (): void => {
    getTraySpecs(id)
      .then(({ data: { traySpecs } }: ITraySpec[] | any) => {
        traySpecs.forEach((e: ITraySpec) => e.id = `${e.CUST_CD}_${e.PRODSPEC_ID}`)
        setDatas(traySpecs)
      })
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
          const {id, ...d} = e
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
      text: "Custumer Code"
    },
    {
      dataField: "PRODSPEC_ID",
      text: "TSMC Part"
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
      dataField: "CLIAM_USER",
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
    clickToSelect: true,
    style: { backgroundColor: '#c8e6c9' },
    onSelect: handleOnSelect,
  }

  return (
    <BootstrapTable keyField="id" data={datas} columns={columns} selectRow={selectRow} />
  )
})

export default TraySpecTable