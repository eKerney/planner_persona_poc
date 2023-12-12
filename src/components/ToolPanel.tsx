import { useContext } from "react";
import { AppContext2 } from "../contexts/AppStore2";
import { DataContext } from "../contexts/DataStore";
import { DataStatus } from "../types/enums";
import { Button, PreprocessButton, SelectFields, ShowImportSuccessModal, UploadButton } from "../utilities/UtilityComponents";


export const ToolPanel = () => {
  // @ts-ignore
  const [appContext, appDispatch] = useContext<AppContextInterface2>(AppContext2)
  // @ts-ignore
  const [dataContext, dataDispatch] = useContext(DataContext)

  return (
    <div className="drawer lg:drawer-open flex justify-center pt-5">
    <ShowImportSuccessModal />
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        <Button 
          text="IMPORT DATA" 
          textColor="text-deep-sky-200"
          color="bg-deep-sky-500"
          modal="import"
          dataStatus={DataStatus.DATAIMPORTED}
          alertProps={{text: "IMPORT SUCCESS", id:"importDialog", alertType: "alert"}}
          handleClick={()=>document.getElementById('importDialog').showModal()} 
        />
        <br/><br/>
        <UploadButton 
          text="UPLOAD DATA" 
          textColor="text-deep-sky-200"
          color="bg-deep-sky-500"
          modal="upload"
          active="btn-active"
        />
        <br/><br/>
         { <PreprocessButton
          text="RETURN FIELDS" 
          textColor="text-deep-sky-200"
          color="bg-deep-sky-500"
          alertProps={{text: "SUCCESSFULLY SUBMITTED FIELDS", id:"submitSuccess", alertType: "alert-info"}}
          active="btn-active"
        /> }
        <br/><br/>
        <SelectFields />
        <Button 
          text="SUBMIT FIELDS" 
          textColor="text-deep-sky-200"
          color="bg-deep-sky-500"
          alertProps={{text: "SUCCESSFULLY SUBMITTED FIELDS", id:"submitSuccess", alertType: "alert-info"}}
          handleClick={()=>document.getElementById('submitSuccess').showModal()} 
        />
        <br/><br/>
        <Button 
          text="APPROVE DATA" 
          textColor="text-deep-sky-200"
          color="bg-galactic-500"
          alertProps={{text: "SUCCESSFULLY APPROVED DATA", id:"approveSuccess", alertType: "alert-success"}}
          handleClick={()=>document.getElementById('approveSuccess').showModal()} 
        />
        <br/><br/>
        <Button 
          text="DENY DATA" 
          textColor="text-deep-sky-200"
          color="bg-mars-red"
          active="btn-disabled"
          alertProps={{text: "DATA NOT APPROVED", id:"dataDeny", alertType: "alert-error"}}
          handleClick={()=>document.getElementById('dataDeny').showModal()} 
        />
      </div>
    </div>
    )
}

export default ToolPanel

