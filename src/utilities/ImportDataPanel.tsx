
import {useState, useEffect, useContext } from 'react';
import { fileLoader, fileValidator } from './DataLoader';
import { DataContext } from '../contexts/DataStore';
import { basicDataAnalysis } from './DataAnalysis';
import { AppContext2 } from '../contexts/AppStore2';
import { LoadingStatus } from '../types/enums';
import { DataLayerPicker } from './UtilityComponents';

export const ImportDataPanel = (id: string) => {
  // @ts-ignore
  const [appContext, appDispatch] = useContext(AppContext2)
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

