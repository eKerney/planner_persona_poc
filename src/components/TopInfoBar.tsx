import { DataStatus } from "../types/enums"
import { MessageBox, StatusBox } from "../utilities/UtilityComponents"

export const TopInfoBar = () => {
  return (
    <div id='topNav' className='border border-deep-sky-500 border-2 rounded-lg shadow-xl row-span-1 grid grid-cols-6 '>
      <div className='border border-long-haul border-2 rounded-lg my-0.5 col-span-2'>
        <MessageBox     
          textColor="text-deep-sky-500"
          color="bg-long-haul/10"
        />
      </div>
      <div className='border border-long-haul border-2 rounded-lg my-0.5 '>
        <StatusBox
          text="DATA IMPORTED" 
          textColor="text-deep-sky-200"
          color="bg-long-haul/20"
          dataStatus={DataStatus.DATASUBMITTED}
        />
      </div>
      <div className='border border-long-haul border-2 rounded-lg my-0.5 '>
        <StatusBox
          text="DATA UPLOADED" 
          textColor="text-deep-sky-200"
          color="bg-long-haul/40"
          dataStatus={DataStatus.FIELDSRETURNED}
        />
      </div>
      <div className='border border-long-haul border-2 rounded-lg my-0.5 '>
        <StatusBox
          text="DATA FIELDS MATCHED" 
          textColor="text-deep-sky-200"
          color="bg-long-haul/60"
          dataStatus={DataStatus.FIELDSMATCHED}
        />
      </div>
      <div className='border border-long-haul border-2 rounded-lg my-0.5 '>
        <StatusBox
          text="DATA PUBLISHED" 
          textColor="text-deep-sky-200"
          color="bg-long-haul/80"
          dataStatus={DataStatus.DATAAPPROVED}
        />
      </div>
    </div>
  )
}

export default TopInfoBar
