import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from "react"
import { useDispatch } from 'react-redux';
import { sortData } from '../../../slices/dataSlice';

export const ColumnTitle = (props)=>{
  const [sortAscent,setSortAscend] = useState(true)
  const [columnName,setColumnName] = useState('')
  const [isHover,setIsHover] = useState(false)
  const dispath = useDispatch()
  const style = { display: isHover ? "inline-block" : "none" }
  const didMountRef = useRef(false)
  const sort = (columnName) => {
    setColumnName(columnName)
    setSortAscend(prev => !prev)
  }
  const handleMouseOver = (e) => {
      setIsHover(true)
   };
   const handleMouseOut = (e) => {
       setIsHover(false)
   };
   useEffect(
    ()=>{
      if( didMountRef.current){
        dispath(sortData(Object.assign(columnName,{ascending: sortAscent})))
        console.log(didMountRef.current)
      }else{
        didMountRef.current = true
        return
      }
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[sortAscent]
  )
    return(
        <>
        <span className="table-app__column-title">
                 <span  onMouseLeave={handleMouseOut } onMouseEnter={handleMouseOver}><a href="/#"className ="ar"style={style}><FontAwesomeIcon className ="zxc123" style={{marginRight: "8px",color:"#607D8B"}} icon={faGripVertical} /></a> {props.columnName}</span>
                </span>
                <svg className = "table-app__title-filter" onClick={()=> {sort({type: props.type,  columnName: props.dataIndex})}} width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg" >
                  <path d="M1.32285 0H6.31356C6.76231 0 6.98668 0.620174 6.67004 0.981742L4.17469 3.83119C3.97757 4.05627 3.65884 4.05627 3.46382 3.83119L0.96637 0.981742C0.649732 0.620174 0.874105 0 1.32285 0Z" fill="#D6D8DE"/>
                  </svg>
        </>
    )
}
