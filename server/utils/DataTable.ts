import { DB } from "./DB"
import { ApiResponse } from "./helpers"

export /**
* Ini untuk Datatable >= 1.12 
*/
class DataTable{

  query!:any
  request!:any

  limitsPerPage = [
    10 , 20 , 50 , 100 
  ]

  whiteListColumnsOrder: string[] = []

  mappingColumnsToTableFields: My.Object = {}
 
 constructor( query:any , request:any = {} ){
   this.query = query
   this.request = request
 }

 async get( callBack:any = undefined ){
   let temp:any ={}
   temp.defaultOptions = {
     page: 1,
     perpage: 10,
     total: 0,
     searchField: '',
     searchValue: '',
     isSkipGet:false ,
     orderBYcolumn: '',
     orderByMode: 'asc',
   }

   if( this.request?.start ){
     temp.start = parseInt( this.request.start )
     temp.defaultOptions.page = temp.start + 1
   }

   if( this.request?.length ){
     temp.length = parseInt( this.request.length )

     if( this.limitsPerPage.includes(temp.length) || temp.length < 1000 )
       temp.defaultOptions.perpage = temp.length
   }

   if( this.request?.columns &&  ( temp.checkOrderColumn =  this.request?.columns[ this.request?.order?.[0]?.column || '0' ]?.data ) ){
     if( this.whiteListColumnsOrder.includes( temp.checkOrderColumn ) ){
       temp.defaultOptions.orderBYcolumn = temp.checkOrderColumn
       temp.defaultOptions.orderByMode = this.request?.order?.[0]?.dir == 'desc' ? 'desc' : 'asc'
     }
   }

   if( temp.defaultOptions.page > 1001 )throw new Error('Reach Limit')

   temp.queryCount = this.query.clone()
   temp.queryCount.clear('select').clear('limit').clear('order').select( DB.raw(' COUNT (1) as total ') ).first()

   if( typeof callBack === 'function' ){
     callBack( this.query )
   }

   this.query.limit( temp.defaultOptions.perpage ).offset( temp.defaultOptions.page - 1 )

   if( temp.defaultOptions.orderBYcolumn && ( temp.checkOrderColumn = this.mappingColumnsToTableFields?.[temp.defaultOptions.orderBYcolumn] ) ){
     this.query.clear('order').orderBy( temp.checkOrderColumn , temp.defaultOptions.orderByMode )
   }

   temp.results = await Promise.all([
     this.query.then( (data:any) => data ) ,
     temp.queryCount.then( (data:any) => data ) ,
   ])

   const response = ApiResponse({ data:[] , code:200 })

   response.recordsTotal = temp.results?.[1]?.total || 0 
   response.recordsFiltered = response.recordsTotal  || 0 
   // response.recordsFiltered = temp.results?.[0]?.length || 0 
   response.data = temp.results?.[0] || []

   response.ntah = temp.defaultOptions
   
   return response
 }

 get searchParam(){
   return `${ this.request?.search?.value || '' }`.trim()
 }

}