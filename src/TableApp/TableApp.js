import "./tableApp.scss"
import React, { useEffect, useState } from 'react';
import { Space, Table,  Dropdown } from 'antd';
import { DownOutlined, MoreOutlined } from '@ant-design/icons';
import store from "../store/store";
import ReactDragListView from "react-drag-listview"
import  Header  from "./components/Header/Header"
import { DropdownMenu } from "./components/DropdownMenu/DropdownMenu"
import { ExpandedRow } from "./components/ExpandedRow/ExpandedRow"
import { v4 as uuid } from 'uuid';
import { useDispatch } from "react-redux";
import { initialDataSet } from "../slices/dataSlice";
import { ColumnTitle } from "./components/ColumnTitle/ColumnTitle";

const TableApp = () => {
  const [changed, setChanged] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [dataSource,setDataSource] = useState([])
  const [record,setRecord] = useState('')
  const [keys,setKeys] = useState([])
  const [columns,setColumn] = useState()
  const dispath = useDispatch()
  const setText = (text) => {
    setSearchText(text)
  }
  useEffect(()=>{
    setColumn([
      {
        title: <ColumnTitle type={"string"} dataIndex={"client"} columnName={"Client"}/>,
        dataIndex: 'client',
        width: "20%",
        filteredValue: [searchText],
        onFilter: (value,record) => {
          return (String(record.client).toLocaleLowerCase().includes(value.toLocaleLowerCase()))
        },
      },
      {
        title: <ColumnTitle type={"number"} dataIndex={"since"} columnName={"Since"}/>,
        dataIndex: 'since',
        width: "20%"
      },
      {
        title:  <ColumnTitle type={"number"} dataIndex={"totalEarnings"} columnName={"Total Earnings"}/>,
        dataIndex: 'totalEarnings',
        width: "20%",
        render: (record) => (<><span>$</span>{record}</>)
      }, 
      {title: <ColumnTitle type={"number"} dataIndex={"credit"} columnName={"Credit"}/>,
        dataIndex: 'credit',
        width: "20%",
        render: (record) => (<span>${record}</span>)
      },
      {
        title: <ColumnTitle type={"string"} dataIndex={"status"} columnName={"Status"}/>,
        dataIndex: 'status',
        width: "20%",
        render: (record) => {
          console.log(record)
          return(<span className={record === "Archived" ? "table-app__status table-app__status_archived" : "table-app__status table-app__status_active"}>{record} </span>)}
      },
      Table.EXPAND_COLUMN,
      {
        width: "100px%",
        dataIndex: "extension",
        onCell: (record, rowIndex) => {
        },
        render: (text, record, index) => (
          <span className="table-app__menu-cell">
            <Dropdown trigger="click"  overlay={<DropdownMenu  record={record}/>} placement="bottomRight">
            <a href="#/">
              <Space>
                <MoreOutlined className="table-app__menu-icon" />
              </Space>
            </a>
            </Dropdown>
          </span>
        )
      },
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchText])
  useEffect(()=>{
    const data = store.getState().data.map((item) => {
    let status = {}
    if(item.status === "Active") {
      status.status = item.status
    }else {
      status.status = item.status
    }
    return({
      key: uuid(),
      client: item.client,
      since: item.since,
      totalEarnings: typeof item.totalEarnings.split('.')[1] == "undefined" ? item.totalEarnings.split('.')[0] + '.00' : item.totalEarnings.split('.')[0] + "." + item.totalEarnings.split('.')[1],
      firstName: item.firstName,
      lastName: item.lastName,
      notes: item.notes,
      credit: typeof item.credit.split('.')[1] == "undefined" ?item.credit + '.00' : item.credit,
      expandable: item.expandable,
      ...status,
    })})
    setDataSource(data)
    dispath(initialDataSet(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  store.subscribe(()=>{
    const data = store.getState().data.map((item)=>{
    let status = {}
    if(item.status === "Active"){
      status.status =item.status
    }else{
      status.status = item.status
    }
    let dataObj={
      client: item.client,
      since: item.since,
      totalEarnings: typeof item.totalEarnings.toString().split('.')[1] == "undefined" ?item.totalEarnings.toString().split('.')[0] + '.00' : item.totalEarnings.toString().split('.')[0] + "." + item.totalEarnings.toString().split('.')[1],
      credit: typeof item.credit.toString().split('.')[1] == "undefined" ?item.credit.toString() + '.00' : item.credit.toString(),
      expandable: item.expandable,
      ...status,
    }
    item.key ? dataObj.key = item.key :  dataObj.key = uuid()
    return(dataObj)
    })
    setDataSource(data)
  })
  const dragProps = {
    onDragEnd(fromIndex, toIndex){
      const newcolumns = columns;
      const item = newcolumns.splice(fromIndex, 1)[0];
      newcolumns.splice(toIndex, 0, item);
      setColumn(Object.create(newcolumns))
    },
    nodeSelector: 'th',
    handleSelector: 'a',
    lineClassName: "dragLine"
  };

  return (
    <div className="TableAppWrapper">
      <Space align="center">
        <div className="table-app">
          <Header setText={setText}/>
          <ReactDragListView {...dragProps}>
            <Table
              pagination={false}
              expandable={{
              expandIcon: ({onExpand,record})=> <DownOutlined  className="table-app__expand-cell" onClick={()=>{onExpand(record)}}/>,
              expandedRowRender: (record) => (<ExpandedRow record={record} />),
              expandedRowKeys: keys,
              onExpandedRowsChange: (expandedRows) => {if(expandedRows.length === 0) setKeys([])},
              onExpand: (expanded,record)=>{
                setKeys([record.key])  
                if(record.expandable === true){return true}
                setRecord({
                  key: record.key,
                  client: record.client,
                  since: record.since,
                  totalEarnings: record.totalEarnings,
                  credit: record.credit,
                  status: record.status,
                  expandable: true
                })
              },
              rowExpandable: ()=>{if(record.expandable === true) return true}
              }}
              columns={columns}
              dataSource={ dataSource }
            />
          </ReactDragListView>
        </div>
      </Space>
    </div>
  );
};

export default TableApp