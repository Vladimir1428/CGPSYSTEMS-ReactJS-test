import "./dropdownMenu.scss"
import { useDispatch } from "react-redux";
import { Menu } from 'antd';
import React from "react";
import { deleteData, changeStatus } from "../../../slices/dataSlice";
import { TrashIcon } from "../../../Icons/TrashIcon"
import { ArchiveIcon } from "../../../Icons/ArchiveIcon"
import { DropdownMenuProps } from "../../../Model/DropdownMenuProps"

export const DropdownMenu: React.FC<DropdownMenuProps> = ({record}) => {
  const dispatch = useDispatch()
  const deleteRow = ()=>{ 
    dispatch(deleteData({key: record.key}))
  }
  const changeRowStatus = ()=>{
    dispatch(changeStatus(record))
  }

  return(
    <Menu
      onClick={(row) => {row.key === '2' ? changeRowStatus() : deleteRow()}}
      items={
        [{
          key: '1',
          label: (<><TrashIcon/><span className="menu-item__label">Delete</span></>),
          },
          {
            key: '2',
            label: (<><ArchiveIcon/><span className="menu-item__label">Archive</span></>),
          },
        ]}
    />
  )
};