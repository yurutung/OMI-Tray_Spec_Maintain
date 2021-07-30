import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { useHistory } from "react-router-dom"
import BootstrapTable, { SelectRowProps } from "react-bootstrap-table-next"
import { toastMixin } from '../functions'
import { getTrayMsls, deleteTrayMsl } from '../api/tray_msl'

const TrayMslTable = forwardRef((props: { mode: string, id: string }, ref) => {
  // props
  const mode = props.mode
  const id = props.id
  // table data
  const [datas, setDatas] = useState<ITrayMsl[]>([])
  useEffect(() => {
    fetchDatas()
  }, [])
  const fetchDatas = (): void => {
    getTrayMsls(id)
      .then(({ data: { trayMsls } }: ITrayMsl[] | any) => setDatas(trayMsls))
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
      }
    }),
  )

  const columns = [
    {
      dataField: "MSL",
      text: "MSL ID",
      sort: true,
    },
    {
      dataField: "FLOOR_LIFE",
      text: "Floor Life",
      sort: true,
    },
  ]

  const selectRow: SelectRowProps<any> = {
    mode: 'radio',
    clickToSelect: true,
    style: { backgroundColor: '#c8e6c9' },
    onSelect: handleOnSelect,
  }

  return (
    <BootstrapTable keyField="MSL" data={datas} columns={columns} selectRow={selectRow} />
  )
})

export default TrayMslTable