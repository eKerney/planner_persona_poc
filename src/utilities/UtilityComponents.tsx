import { useEffect, useContext, useState } from 'react';
import { AlertProps, AppContextInterface2, ButtonProps } from "../types";
import { DataContext } from '../contexts/DataStore';
import { DataStatus, LoadingStatus } from '../types/enums';
import { fetchGeoprocessData } from './DataFetcher';
import { AppContext2 } from '../contexts/AppStore2';
import spinnerGif from '../assets/1496.gif'
import { ImportDataPanel } from './ImportDataPanel';

export const MessageBox = ({ textColor, color }) => {
  // @ts-ignore
  const [appContext, appDispatch] = useContext<AppContextInterface2>(AppContext2)
  const [statusMessage, setStatusMessage] = useState<string>('Server Status Message');
  useEffect(() => setStatusMessage(appContext.geoprocessingMessages.message), [appContext.geoprocessingMessages] );

  return (
   <>
      <p className={`${textColor} ${color} h-full rounded-lg p-4 text-center place-content-center`}>
        {statusMessage}
      </p>
      
   </>
  )
}

export const StatusBox = ({ text, textColor, color, dataStatus }) => {
  // @ts-ignore
  const [appContext, appDispatch] = useContext<AppContextInterface2>(AppContext2)
  return (
   <>
      { appContext.currentDataState >= dataStatus 
        && <p className={`${textColor} ${color} h-full rounded-lg p-4 text-center place-content-center`}>{text}</p>
      }
   </>
  )
}

export const SelectFields = () => {
  // @ts-ignore
  const [dataContext, dataDispatch] = useContext(DataContext) 
  // @ts-ignore
  const [appContext, appDispatch] = useContext<AppContextInterface2>(AppContext2)
  const [fieldMap, setFieldMap] = useState({Latitude:'', Longitude:'', AGL:'', WKID:'', Notes:''});

  const onClick = ( { target: { value, parentNode: { name } } }: {target: any}) => {
    name 
      ? setFieldMap({...fieldMap, [name]: value}) 
      : ''
    dataDispatch({ type: 'fieldMap', payload: fieldMap })
  }
  // useEffect(() => console.log('fieldMatch', dataContext),[dataContext]);
  // useEffect(() => console.log('fieldMatch', appContext),[appContext]);
  useEffect(() => dataDispatch({ type: 'fieldMap', payload: fieldMap }),[fieldMap]);

  return (
    <>
      { dataContext.gpIngestReturn.Return_Req_Fields.length > 0 
        && appContext.currentDataState === DataStatus.FIELDSRETURNED
        && dataContext.gpIngestReturn.Return_Req_Fields.map((label:string) => {
        return (
        <label key={`${label}-Required`} className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Required Field: {label}</span>
          </div>
          <select name={label} className="select select-info select-sm" onClick={onClick}>
            <option disabled selected>Pick one</option>
            { dataContext.gpIngestReturn.Return_Fields.length > 0 &&
              dataContext.gpIngestReturn.Return_Fields.map((d:string) => <option key={d}>{d}</option>) }
          </select>
        </label>
        )
      })}
    </>
  )
}

export const ShowImportSuccessModal = () => {
  // @ts-ignore
  const [appContext, appDispatch] = useContext<AppContextInterface2>(AppContext2)
  // useEffect(() => console.log(appContext.requestType),[appContext.requestType]);
  appContext.dataStatus === LoadingStatus.SUCCESS && document.getElementById('importSuccess')?.showModal()
  appContext.dataStatus === LoadingStatus.SUCCESS && setTimeout(() => document.getElementById('importSuccess')?.close(), 1000)
  return <AlertModal text="DATA IMPORTED SUCCESSFULLY" id="importSuccess" alertType="alert-info" /> 
}

export const UploadButton = ({ text, color, textColor, dataStatus }) => {
  // @ts-ignore
  const [appContext, appDispatch] = useContext<AppContextInterface2>(AppContext2)
  // @ts-ignore
  const [dataContext, dataDispatch] = useContext(DataContext)
  const handleClick = () => fetchGeoprocessData(dataContext, dataDispatch, appContext, appDispatch, dataContext.dataForm);
  return (
  <>
    <button 
      className={`btn rounded btn-wide opacity-80 ${color} 
        ${appContext.currentDataState === dataStatus ? 'btn-active' : 'btn-disabled'} 
      `}
      onClick={handleClick}
    >
      <p className={textColor}>{text}</p>
      {  appContext.dataStatus === LoadingStatus.LOADING 
         && appContext.currentDataState === dataStatus 
         && <span className="loading loading-spinner text-primary"></span>
      }
    </button>
  </>
  )
}

export const PreprocessButton = ({ text, color, textColor, dataStatus}) => {
  // @ts-ignore
  const [appContext, appDispatch] = useContext<AppContextInterface2>(AppContext2)
  // @ts-ignore
  const [dataContext, dataDispatch] = useContext(DataContext)
  const handleClick = () => {
    fetchGeoprocessData(dataContext, dataDispatch, appContext, appDispatch);
  }
  return (
  <>
    <button 
      className={`btn rounded btn-wide opacity-80 ${color} 
        ${appContext.currentDataState === dataStatus ? 'btn-active' : 'btn-disabled'} 
      `}
      onClick={handleClick}
    >
      <p className={textColor}>{text}</p>
      {  appContext.dataStatus === LoadingStatus.LOADING 
         && appContext.currentDataState === dataStatus 
         && <span className="loading loading-spinner text-primary"></span>
      }
    </button>
  </>
  )
}

export const Button = ({ text, color, textColor, alertProps, dataStatus, modal="", handleClick=(()=>alert('butt on'))}: ButtonProps) => {
  // @ts-ignore
  const [appContext, appDispatch] = useContext<AppContextInterface2>(AppContext2)
  return ( 
  <>
    {modal === "import" 
      ? <ImportModal text={alertProps.text} id={alertProps.id} alertType={alertProps.alertType} /> 
        : <AlertModal text={alertProps.text} id={alertProps.id} alertType={alertProps.alertType} /> }
    <button 
      className={`btn rounded btn-wide opacity-80 ${color} 
        ${appContext.currentDataState === dataStatus ? 'btn-active' : 'btn-disabled'}
      `}
      onClick={handleClick}
    >
      <p className={textColor}>{text}&nbsp;&nbsp;</p>
      {  appContext.dataStatus === LoadingStatus.LOADING 
         && appContext.currentDataState === dataStatus 
         && <span className="loading loading-spinner text-primary"></span>
      }
    </button>
  </>
  )
}

export const AlertModal = ({ id, text, alertType }: AlertProps) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box p-0">
        <div className={`alert ${alertType}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{text}</span>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export const ImportModal = ({ id, text, alertType }: AlertProps) => {
  return (
      <>
    <dialog id={id} className="modal justify-center">
      <div className="modal-box p-0">
        <div className={`alert ${alertType} px-12 py-8`}>
          <span>{ImportDataPanel(id)}</span>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    </>
  )
}

export const DataLayerPicker = () => {
  return (
  <select className="select select-info w-full max-w-xs text-deep-sky-200">
    <option disabled>SELECT DATA TYPE</option>
    <option>Obstacles</option>
    <option>Parcels</option>
  </select>
  )
}

export const Spinner = () => {
  // @ts-ignore
  const [appContext, appDispatch] = useContext<AppContextInterface2>(AppContext2)
  return (
    <>
     {  appContext.dataStatus === LoadingStatus.LOADING 
       && <img src={spinnerGif} className='' alt='Loading' /> }
    </>
  )
}
