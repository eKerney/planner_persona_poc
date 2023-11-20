import {useState, useEffect, useContext } from 'react';
import { AlertProps, ButtonProps } from "../types";
import { fileLoader, fileValidator } from './DataLoader';
import { AppContext } from '../contexts/AppStore';
import { DataContext } from '../contexts/DataStore';
import { LoadingStatus } from '../types/enums';
import { basicDataAnalysis } from './DataAnalysis';
import { fetchGeoprocessData } from './DataFetcher';

export const Button = ({ text, color, textColor, alertProps, modal="", handleClick=(()=>alert('butt on'))}: ButtonProps) => {
  return ( 
  <>
    {modal === "upload" 
      ? <UploadModal text={alertProps.text} id={alertProps.id} alertType={alertProps.alertType} /> 
      : <AlertModal text={alertProps.text} id={alertProps.id} alertType={alertProps.alertType} /> }
    <button 
      className={`btn rounded btn-wide opacity-80 ${color}`}
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

export const UploadModal = ({ id, text, alertType }: AlertProps) => {
  return (
    <dialog id={id} className="modal justify-center">
      <div className="modal-box p-0">
        <div className={`alert ${alertType} px-12 py-8`}>
          <span>{UploadAOIpanel(id)}</span>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export const UploadAOIpanel = (id: string) => {
  // @ts-ignore
  const [appContext, appDispatch] = useContext(AppContext)
  // @ts-ignore
  const [dataContext, dataDispatch] = useContext(DataContext)
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState();

  useEffect(function afterUploadSuccessEffect() {
    appContext.uploadStatus === LoadingStatus.SUCCESS && document.getElementById(id)?.close() 
    appContext.uploadStatus === LoadingStatus.SUCCESS && fileValidator(dataContext, dataDispatch);
    appContext.uploadStatus === LoadingStatus.SUCCESS && basicDataAnalysis(dataContext, dataDispatch, 'AGL');
    appContext.uploadStatus === LoadingStatus.SUCCESS && fetchGeoprocessData(dataContext, form);
  }, [appContext.uploadStatus])

  useEffect(function fileUploadReader() {
    const reader = new FileReader();
    reader.onload = (evt) => fileLoader(evt.target?.result, appContext, appDispatch, dataContext, dataDispatch);
    files.length ? reader.readAsText(files[0]) : '';
  }, [files])

  function onFormSubmit(event: any) {
    event.preventDefault();
    console.log('event.target.file.files');
    console.log(event.target.file.files);
    setForm(event.target);
    setFiles(event.target.file.files);
    document.getElementById('uploadDialog')?.close()
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
          value="Upload Item" 
          className="file-input file-input-bordered w-full max-w-xs text-deep-sky-200" 
        /></td>
            </tr>
          </tbody></table>
      </form>
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

// action="https://gis-dev.airspacelink.com/server/rest/services/ETLUpload/GPServer/uploads/upload" 
// method="post"
export const UploadPanelForm = (onFormSubmit: any) => {
  return  (
    <>
      <form id="uploadForm" 
      name="sdform" 
      onSubmit={(() => onFormSubmit)}
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
          value="Upload Item" 
          className="file-input file-input-bordered w-full max-w-xs text-deep-sky-200" 
        /></td>
            </tr>
          </tbody></table>
      </form>
    </>
  )    
}
    // <div className="control-panel " >
    //   <DataLayerPicker />
    //     <br/><br/>
    //   <input 
    //     type="file" 
    //     className="file-input file-input-bordered w-full max-w-xs text-deep-sky-200" 
    //     accept='.json,.geojson,.GeoJSON,.GEOJSON'
    //     onChange={handleFileUpload}
    //   />
    // </div>

