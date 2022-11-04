import "./expandedRow.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faDollarSign } from '@fortawesome/free-solid-svg-icons';
import store from "../../../store/store";

export const ExpandedRow = ({ record })=>{
  const totalEarnings = record.totalEarnings.split('.')
  const totalDollar =totalEarnings[0]
  let totalCent = totalEarnings[1]
  const data = store.getState().data.filter(item => item.key === record.key)[0]
  if(typeof totalCent == "undefined") totalCent = '.00'
  else totalCent =  "." + totalCent

  return(
    <div className="expand">
      <div className="expand-left-side">
        <div className="expand__client-discription">
          <div> 
            <span>Client</span>
            <span>{data.client}</span>
          </div>
          <div> 
            <span>Main Contact</span>
            <span>{data.firstName}{data.lastName}</span>
          </div>
        </div>
        <div className="expand__notes-block">
          <span>Notes</span>
          <span>{data.notes}</span>
        </div>
      </div>
      <div className="expand-right-side">
        <div className="expand-right-side__totalEarnings">
          <span>Total Earnings</span>
          <span className="expand-right-side__amount"><FontAwesomeIcon style= {{fontSize: "36px", color:"#1D2C48"}}icon={faDollarSign}/>{totalDollar}
          </span><span className="cent">{totalCent}</span>
        </div>
        <div className={record.status === "Archived" ? "archived-status-expand" : "active-status-expand"}>
          {record.status}
        </div>
      </div>
    </div>
  )
}