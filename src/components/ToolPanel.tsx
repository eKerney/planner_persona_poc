import { Button, UploadAOIpanel } from "../utilities/UtilityComponents";

export const ToolPanel = () => {
  return (
    <div className="drawer lg:drawer-open flex justify-center pt-5">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        <Button 
          text="UPLOAD DATA" 
          textColor="text-dark-grey-200"
          color="bg-deep-sky-500"
          modal="upload"
          alertProps={{text: "UPLOAD SUCCESS", id:"uploadDialog", alertType: "alert"}}
          handleClick={()=>document.getElementById('uploadDialog').showModal()} 
        />
        <br/><br/>
        <Button 
          text="SEND DATA" 
          textColor="text-dark-grey-200"
          color="bg-deep-sky-500"
          alertProps={{text: "SUCCESSFULLY SUBMITTED FIELDS", id:"submitSuccess", alertType: "alert-info"}}
          handleClick={()=>document.getElementById('submitSuccess').showModal()} 
        />
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <Button 
          text="SUBMIT FIELDS" 
          textColor="text-dark-grey-200"
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
          alertProps={{text: "DATA NOT APPROVED", id:"dataDeny", alertType: "alert-error"}}
          handleClick={()=>document.getElementById('dataDeny').showModal()} 
        />
      </div>
    </div>
    )
}

export default ToolPanel

