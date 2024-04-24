const coreParams = {
  version:'downloader:v0.17',
  popupList:[],
  BASE_URL: `//${window.location.host}` ,
  certain_folder:'',

  wait: ( waktu , params ) => new Promise((resolve) =>{
    setTimeout( _=> resolve(params) , waktu )
  }),

  parseInt:( data ) =>{
    data = parseInt( `${data}`.replace(/[^0-9]/g,'') )
    return isNaN(data) ? 0 : data
  },

  getFormParams:function( event ){
    let data = {}
    $( event.currentTarget ).serializeArray().forEach( val =>{
      if( data[val.name] ){
        if(data[val.name]?.forEach){
          data[val.name].push(val.value)
        }else{
          data[val.name] = [ data[val.name] , val.value ]
        }
      }else{
        data[val.name] = val.value
      }
    })

    return data
  },

  defaultTableOption:function(){
    return Object.assign({},{
      columns:[],

      autoWidth:false,
      serverSide:true,
      searchDelay:1500,
      saveState: false,
      processing:true ,

      ajax:{
        url: '',
        // contentType: 'application/json',
        type: 'GET',
        dataSrc: 'data', // ex ap response : { message:'Ok' , data:[] }
        // data: function(){} ,
        error:function( xhr , error ){
          alert(`Attention : ${ xhr?.responseJSON?.message || 'We are sorry , something is wrong' }`)
        }
      },
      data:{
        source: {
            read: { },
        },
      },
      lengthMenu:[10,50,100]
    })
  },
  MyTable: ( selector , dataTableOptions ) => $( selector ).DataTable( dataTableOptions ) ,
  MyTable_deprecated: ( selector , dataTableOptions ) => {
    $.fn.dataTable.ext.errMode = 'none'

    return $( selector ).DataTable( dataTableOptions ).on('error.dt' , function ( e, settings, techNote, message ) {
        console.log( 'An error has been reported by DataTables: ', message );
    })
  } ,

  Storage:{
    isLocalLoaded:false,
    currentValue:{},
    get:function( index='' ){
      this.currentValue = Object.assign( this.currentValue , JSON.parse( localStorage.getItem( index ) ) )
      return this.currentValue
    },
    set:function( index , value ){
      if( !this.isLocalLoaded ){
        this.isLocalLoaded = true
        this.currentValue = this.get(index)
      }
      
      let temp = JSON.stringify( Object.assign({}, this.currentValue , value ) )
      localStorage.setItem( index , temp )
    },
    clear:function(){
      localStorage.clear()
    },
    remove:function( index ){
      localStorage.removeItem( index )
    }
  },

  getErrorMessage: ( data ) => data?.responseJSON?.message || data?.statusText || data?.message || 'Something is wrong , unhandle error message' ,
  Notif:() => window.toastr ,

  Loading:{
    currentModal:null ,
    show:function(){
      return Swal.fire({
        title: "Please wait!",
        allowOutsideClick:false,
        didOpen: function() {
          Swal.showLoading()
        }
      })
      // this.currentModal = new Modal()
      // this.currentModal.show({
      //   no_header:true,
      //   closeable:false,
      //   footer:false,
      //   content:'<div class="d-flex justify-content-center"><h1>Loading ....</h1></div>',
      //   dialog:{ className:'content-loader' }
      // })
    },
    close:function(){
      Swal.close()
    }
  },
}

window.Api = {
  _progress:function( options={} ){
    let pathUrl = options.url.match(/^http:|^https/) ? options.url : coreParams.BASE_URL + options.url
    return $.ajax({
      url: pathUrl ,
      type: options.method,
      data: options.contentType === 'application/json' ? JSON.stringify(options.data) : options.data ,
      contentType: options?.contentType ,
      processData: options?.processData ,
      xhrFields: options?.xhrFields ,
      headers: options.headers ,
    })
  },
  get:function( url='', params , options={} ){
    return this._progress(Object.assign({},options,{
      method:'GET',
      data:params,
      url,
    }))
  },
  post:function( url='', params  , options={} ){
    return this._progress(Object.assign({},options,{
      method:'POST',
      data:params,
      url,
    }))
  },
  put:function( url='', params , options={}){
    return this._progress(Object.assign({},options,{
      method:'PUT',
      data:params,
      url,
    }))
  },
  delete:function( url='', params , options={} ){
    return this._progress(Object.assign({},options,{
      method:'DELETE',
      data:params,
      url,
    }))
  },
}

window.handleError = function( data , options = undefined ){
  let msg = typeof data === 'string' ? data : ( data?.responseJSON?.message || data?.response?.data?.message || data?.statusText || data?.toString() || 'Unknown Message, message cant be translated' )
  coreParams.Notif().error( msg , 'WARNING' , options )
}

window.handleSuccess = function( data , options = undefined ){
  let msg = typeof data === 'string' ? data : ( data?.responseJSON?.message || data?.statusText || 'Unknown Message, message cant be translated' )
  coreParams.Notif().success( msg , 'Success' , options )
}