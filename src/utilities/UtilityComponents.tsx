import {useState, useEffect, useContext } from 'react';
import { AlertProps, AppContextInterface2, ButtonProps } from "../types";
import { fileLoader, fileValidator } from './DataLoader';
import { DataContext } from '../contexts/DataStore';
import { DataStatus, LoadingStatus } from '../types/enums';
import { basicDataAnalysis } from './DataAnalysis';
import { fetchGeoprocessData } from './DataFetcher';
import { AppContext2 } from '../contexts/AppStore2';
import spinnerGif from '../assets/1496.gif'

export const ShowImportSuccessModal = () => {
  // @ts-ignore
  const [appContext, appDispatch] = useContext<AppContextInterface2>(AppContext2)
  appContext.dataStatus === LoadingStatus.SUCCESS && document.getElementById('importSuccess')?.showModal()
  appContext.dataStatus === LoadingStatus.SUCCESS && setTimeout(() => document.getElementById('importSuccess')?.close(), 1000)
  return <AlertModal text="DATA IMPORTED SUCCESSFULLY" id="importSuccess" alertType="alert-info" /> 
}

export const UploadButton = ({ text, color, textColor, alertProps, active="btn-active", modal="" }) => {
  // @ts-ignore
  const [appContext, appDispatch] = useContext<AppContextInterface2>(AppContext2)
  // @ts-ignore
  const [dataContext, dataDispatch] = useContext(DataContext)
  console.log('UploadButton', appContext.currentDataState);
  console.log(active);
  const handleClick = () => fetchGeoprocessData(dataContext, dataDispatch, appContext, appDispatch, dataContext.dataForm);
  useEffect(() => {
    active = appContext.currentDataState === DataStatus.DATASUBMITTED 
               ? 'btn-active'
               : 'btn-disabled'
    console.log(active);
  }, [appContext.currentDataState])
  return (
  <>
    <button 
      className={`btn rounded btn-wide opacity-80 ${color} ${active}`}
      onClick={handleClick}
    >
      <p className={textColor}>{text}</p>
    </button>
  </>
  )
}

export const Button = ({ text, color, textColor, alertProps, active="btn-active", modal="", handleClick=(()=>alert('butt on'))}: ButtonProps) => {
  return ( 
  <>
    {modal === "import" 
      ? <ImportModal text={alertProps.text} id={alertProps.id} alertType={alertProps.alertType} /> 
      : modal === "upload" 
        ? <UploadModal text={alertProps.text} id={alertProps.id} alertType={alertProps.alertType} /> 
        : <AlertModal text={alertProps.text} id={alertProps.id} alertType={alertProps.alertType} /> }
    <button 
      className={`btn rounded btn-wide opacity-80 ${color} ${active}`}
      onClick={handleClick}
    >
      <p className={textColor}>{text}</p>
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

export const UploadModal = ({ id, text, alertType }: AlertProps) => {
  return (
    <dialog id={id} className="modal justify-center">
      <div className="modal-box p-0">
        <div className={`alert ${alertType} px-12 py-8`}>
          <span>{UploadDataPanel(id)}</span>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export const ImportDataPanel = (id: string) => {
  // @ts-ignore
  const [appContext, appDispatch] = useContext<AppContextInterface2>(AppContext2)
  // @ts-ignore
  const [dataContext, dataDispatch] = useContext(DataContext)
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState();

  useEffect(function afterUploadSuccessEffect() {
    appContext.dataStatus === LoadingStatus.SUCCESS && fileValidator(dataContext, dataDispatch);
    appContext.dataStatus === LoadingStatus.SUCCESS && basicDataAnalysis(dataContext, dataDispatch, 'AGL');
  }, [appContext.dataStatus])

  useEffect(function fileUploadReader() {
    const reader = new FileReader();
    reader.onload = (evt) => fileLoader(evt.target?.result, appContext, appDispatch, dataContext, dataDispatch);
    files.length ? reader.readAsText(files[0]) : '';
  }, [files])

  function onFormSubmit(event: any) {
    event.preventDefault();
    setForm(event.target);
    setFiles(event.target.file.files);
    dataDispatch({ type: 'dataForm', payload: event.target })
    document.getElementById(id)?.close()
  }

  return  (
    <>
      <DataLayerPicker />
      <br/>
      <br/>
      <form id="uploadForm" 
      name="sdform" 
      onSubmit={onFormSubmit}
      encType="multipart/form-data">
        <table id="parameterTable" className="formTable">
          <tbody><tr >
              <td><label ></label></td>
              <td>
              <input 
                type="file" 
                id="file" 
                name="file" 
                className="file-input file-input-bordered w-full max-w-xs text-deep-sky-200" 
              /></td>
            </tr>
            <tr style={{display: "none"}}>
              <td><label >Format:</label></td>
              <td><select  id="f" name="f">
                  <option value="pjson">JSON</option>
                </select></td>
            </tr>
            <tr>
        <td colSpan={2} align="left">
        <br/>
        <input 
          type="submit" 
          value="Import Data" 
          className="file-input file-input-bordered w-full max-w-xs text-deep-sky-200" 
          accept='.json,.geojson,.GeoJSON,.GEOJSON'
        /></td>
            </tr>
          </tbody></table>
      </form>
    </>
  )    
}

// export const UploadDataPanel = (id: string) => {
//   // may deprecate this
//   // @ts-ignore
//   const [appContext, appDispatch] = useContext<AppContextInterface2>(AppContext2)
//   // @ts-ignore
//   const [dataContext, dataDispatch] = useContext(DataContext)
//   useEffect(function () {
//     appContext.currentDataStatus === DataStatus.DATAIMPORTED && fetchGeoprocessData(dataContext, dataDispatch, appContext, appDispatch, dataContext.dataForm);
//   }, [appContext.currentDataStatus])
//   return <>HIIIIIIII</>
// }
//
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
     { appContext.currentDataState === DataStatus.DATAIMPORTED 
       && appContext.dataStatus === LoadingStatus.LOADING 
       && <img src={spinnerGif} className='' alt='Loading' /> }
    </>
  )
}

