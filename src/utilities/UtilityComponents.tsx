import { useEffect, useContext, useState } from 'react';
import { AlertProps, AppContextInterface2, BaseComponentProps, ButtonProps, DataContextInterface } from "../types";
import { AppContext2 } from '../contexts/AppStore2';
import { useGeoprocessTool } from '../hooks/useGeoprocessTool';
import { DataStatus, DataType, LayerType, LoadingStatus } from '../types/enums';
import { DataContext } from '../contexts/DataStore';
import { ImportDataPanel } from './ImportDataPanel';

export const MessageBox = ({ textColor, color }: BaseComponentProps): JSX.Element  => {
  // @ts-ignore
  const [appContext, appDispatch] = useContext<AppContextInterface2>(AppContext2)
  const [statusMessage, setStatusMessage] = useState<string>('Data Status Message');

  useEffect(() => {
    setStatusMessage(appContext.geoprocessingMessages.message)
    }, [appContext.geoprocessingMessages])

  return (
   <>
      <p className={`${textColor} ${color} h-full rounded-lg p-4 text-center place-content-center`}>
        {statusMessage}
      </p>
      
   </>
  )
}

export const StatusBox = ({ text, textColor, color, dataStatus = 0 }: BaseComponentProps): JSX.Element => {
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
  const [dataContext, dataDispatch] = useContext<DataContextInterface>(DataContext) 
  // @ts-ignore
  const [appContext, appDispatch] = useContext<AppContextInterface2>(AppContext2)
  const [fieldMap, setFieldMap] = useState({Latitude:'', Longitude:'', AGL:'', WKID:'', Notes:''});

  const onClick = ( { target: { value, parentNode: { name } } }: {target: any}) => {
    name 
      ? setFieldMap({...fieldMap, [name]: value}) 
      : ''
    dataDispatch({ type: 'fieldMap', payload: fieldMap })
  }
  // useEffect to sync up dataContext with current fieldMap State
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

export const MultiButton = ({ text, color, textColor, dataStatus, alertProps, onClickFunction}: ButtonProps): JSX.Element => {
  // @ts-ignore
  const [appContext, appDispatch] = useContext<AppContextInterface2>(AppContext2)
  const callGeoprocessor = useGeoprocessTool();
  const handleClick = onClickFunction
    ? onClickFunction
    : () => callGeoprocessor();

  // const handleClick = () => callGeoprocessor();
  
  return (
  <>
    {text === "IMPORT DATA" 
      ? <ImportModal text={alertProps.text} id={alertProps.id} alertType={alertProps.alertType} /> 
      : <></> }
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

export const ShowImportSuccessModal = () => {
  // @ts-ignore
  const [appContext, appDispatch] = useContext<AppContextInterface2>(AppContext2)

  appContext.dataStatus === LoadingStatus.SUCCESS && document.getElementById('importSuccess')?.showModal()
  appContext.dataStatus === LoadingStatus.SUCCESS && setTimeout(() => document.getElementById('importSuccess')?.close(), 1000)
  return <AlertModal text="DATA IMPORTED SUCCESSFULLY" id="importSuccess" alertType="alert-info" /> 
}

export const DataLayerPicker = () => {
  // @ts-ignore
  const [dataContext, dataDispatch] = useContext<DataContextInterface>(DataContext) 
  const [layer, setLayer] = useState<LayerType>(LayerType.OBSTACLES);

  const onClick = ({ target: { value }}: {target: any}) => setLayer(value)
  useEffect(() => dataDispatch({ type: 'dataLayerAttributes', payload: {...dataContext.dataLayerAttributes, layerType: layer} }),[layer]);

  return (
  <select name="dataLayerPicker" className="select select-info w-full max-w-xs text-deep-sky-200" onClick={onClick}>
    <option disabled>SELECT DATA LAYER</option>
    <option>{LayerType.OBSTACLES}</option>
    <option>{LayerType.PARCELS}</option>
  </select>
  )
}

export const DataTypePicker = () => {
  // @ts-ignore
  const [dataContext, dataDispatch] = useContext<DataContextInterface>(DataContext) 
  const [dataType, setDataType] = useState<DataType>(DataType.GEOJSON);

  const onClick = ({ target: { value }}: {target: any}) => setDataType(value)
  useEffect(() => dataDispatch({ type: 'dataLayerAttributes', payload: {...dataContext.dataLayerAttributes, dataType: dataType} }),[dataType]);

  return (
  <select name="dataLayerPicker" className="select select-info w-full max-w-xs text-deep-sky-200" onClick={onClick}>
    <option disabled>SELECT DATA LAYER</option>
    <option>{DataType.GEOJSON}</option>
    <option>{DataType.KMZ}</option>
    <option>{DataType.KML}</option>
  </select>
  )
}

export const DataTable = () => {
  // @ts-ignore
  const [dataContext, dataDispatch] = useContext<DataContextInterface>(DataContext) 
  const [dataRows, setDataRows] = useState<Object[]>([]);

  useEffect(() => {
    const dataFrame = Object.entries(dataContext.gpIngestReturn.Return_df_Json).map(([key,value]) => ([key,Object.entries(value)])).map(([key,value]) => value.map(val => ({[key]:val[1]}))).reduce((acc,val) => val.map((v,i) => (acc[i] || acc.push([])) && acc[i].concat(v)), []).map(a => a.reduce((acc,val) => Object.assign(acc,val),{}));
    setDataRows(dataFrame);
    console.log(dataFrame);
  }, [dataContext.gpIngestReturn])

  return (
    <>
    { dataContext.gpIngestReturn.Return_Req_Fields.length > 0 &&
      <div className="overflow-x-auto">
        <table className="table table-xs overflow-x-auto">
          <thead>
            <tr>
              <th></th>
              { Object.keys(dataContext.gpIngestReturn.Return_df_Json).map((d: string) => <th key={d}>{d}</th>) }
            </tr>
          </thead>
          <tbody>
          { dataRows.map((d: Object, i: number) => {
              return (
                <tr>
                <th>{i}</th>
                  { Object.values(d).map((z: string) => <th>{z}</th>) }
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    }
    </>
  )
}
