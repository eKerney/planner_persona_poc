import { MouseEventHandler } from "react";
import { AlertProps, ButtonProps } from "../types";

export const Button = ({ text, color, textColor, alertProps, handleClick=(()=>alert('butt on'))}: ButtonProps) => {
  return ( 
  <>
    <AlertModal text={alertProps.text} id={alertProps.id} alertType={alertProps.alertType} />
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
