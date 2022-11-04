import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'
export const dataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    addData: (state, action) => {
      return [...state,action.payload]
    },
   changeExtandable: (state,action) => {
     return state.filter((index) => index !== action.payload).push(action.payload)
    },
    deleteData: (state,action) => {
     return state.filter((item) => item.key !== action.payload.key)
       },
       changeStatus: (state,action) => {
        return state.map(
          (item) => {
            if(item.key === action.payload.key){
              if(item.status === "Active"){
                return {
                  ...item,
                  status: "Archived"
                }
              }else{
                return {
                  ...item,
                  status: "Active"
                }
              }
            }else{
              return item
            }
            }
        )
       },
       initialDataSet: (state,action)=>{
         return state.map((item,index)=> {
          return (
            {
              ...item,
              key: action.payload[index].key
            }
          )
         })
       },
       sortData: ( state, action )=>{
        if(action.payload.type === "number" && action.payload.columnName === "since"){
          
          if( action.payload.ascending === false ) { return state.sort((a,b) => new Date(a[action.payload.columnName]) - new Date(b[action.payload.columnName]))}else{

          }return state.sort((a,b) => new Date(b[action.payload.columnName]) - new Date(a[action.payload.columnName]))
        }

        if(action.payload.type === "string"){
          if( action.payload.ascending === false ){return state.sort((a,b) => a[action.payload.columnName] < b[action.payload.columnName] ? -1 : 1)}
          else{return state.sort((a,b) => a[action.payload.columnName] > b[action.payload.columnName] ? -1 : 1)}
        }else{
          if( action.payload.ascending === false ){ return state.sort((a,b) => a[action.payload.columnName] - b[action.payload.columnName])}
          else{
            return state.sort((a,b) => b[action.payload.columnName] - a[action.payload.columnName])
          }
        }
     }
      
  },
})

export const { addData,changeExtandable,deleteData ,changeStatus, initialDataSet, sortData} = dataSlice.actions
export default dataSlice.reducer
