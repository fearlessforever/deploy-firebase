
export const ApiResponse = <T=any>( response: ApiResponseParams<T>  ) => <ApiResponseParams<T>> Object.assign({
  data: [] ,
  message: 'OK',
  code: 200 ,
  status:'success',
  date: (new Date).toISOString()
} , response || {} )

type ApiResponseParams<T> = My.ResponseApi<T> & My.Object


export class MyException extends Error{
  
  constructor(
    public readonly  message = "Error Message" , 
    public readonly  statusCode: My.ResponseApiCode = 500 ,
  ){super()}
}

export * as Yup from 'yup'

export const delay = ( time:number ) => new Promise((resolve) =>{
  setTimeout( resolve , time )
})