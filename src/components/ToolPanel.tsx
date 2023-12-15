import { DataStatus } from "../types/enums";
import { Button, PreprocessButton, SelectFields, ShowImportSuccessModal, UploadButton } from "../utilities/UtilityComponents";


export const ToolPanel = () => {
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
          dataStatus={DataStatus.DATASUBMITTED}
        />
        <br/><br/>

        <PreprocessButton
          text="RETURN FIELDS" 
          textColor="text-deep-sky-200"
          color="bg-deep-sky-500"
          dataStatus={DataStatus.FIELDSRETURNED}
        />
        <br/><br/>

        <SelectFields />
        <br/>

        <PreprocessButton
          text="PUBLISH DATA" 
          textColor="text-deep-sky-200"
          color="bg-deep-sky-500"
          dataStatus={DataStatus.FIELDSMATCHED}
        />


      </div>
    </div>
    )
}

export default ToolPanel

