import "./header.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Input, Button } from "antd"
import React, { useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { PlusCircle } from "../../../Icons/PlusCircle";
import store from "../../../store/store";
import { ClientModal } from "../ClientModal/ClientModal";

interface HeaderProps {
  setText: (text: string) => string;
}

const Header: React.FC<HeaderProps> = ({setText})=>{
  const [searchText, setSearchText] = useState('');
  const [open, setOpen] = useState(false);
  const [recordsCount,setRecordsCount] = useState(store.getState().data.length)
  store.subscribe(()=>{
    setRecordsCount(store.getState().data.length)
  })
  const openModal = ()=>{
    setOpen(false)
  }
  const getText = (text: string)=>{
    setSearchText(text)
    setText(text)
  }
  return(
    <div className="header">
      <div className="header-container">
        <Input.Group  compact>
          <div className="header-container__search-icon">
            <FontAwesomeIcon style={{marginTop: 10}} icon={faMagnifyingGlass} />
          </div>
          <Input 
            className="header-container__search-input"
            placeholder="Search"
            value={searchText}
            onChange={(e) =>{ getText(e.target.value)}}
          />
        </Input.Group>
          <Button className="header-container__add-btn"type="primary" icon={<PlusCircle/>} onClick={() => setOpen(true)}>
            New Client
          </Button>
      </div>
        <span className="header-container__records-count">Total Clients: {recordsCount}</span>
        <ClientModal open={open} openModal={openModal}/>
    </div>
  )
}

export default Header