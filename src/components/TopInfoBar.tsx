import { DataStatus } from "../types/enums"
import { StatusBox } from "../utilities/UtilityComponents"


export const TopInfoBar = () => {
  return (
    <div id='topNav' className='border border-deep-sky-500 border-2 rounded-lg shadow-xl row-span-1 grid grid-cols-5  '>
      <div className='border border-long-haul border-2 rounded-lg my-0.5 '>
        <StatusBox
          text="DATA IMPORTED" 
          textColor="text-deep-sky-200"
          color="bg-info"
          dataStatus={DataStatus.DATAIMPORTED}
        />
      </div>
      <div className='border border-long-haul border-2 rounded-lg my-0.5 '>
        <StatusBox
          text="DATA UPLOADED" 
          textColor="text-deep-sky-200"
          color="bg-primary"
          dataStatus={DataStatus.DATASUBMITTED}
        />
      </div>
      <div className='border border-long-haul border-2 rounded-lg my-0.5 '>
        <StatusBox
          text="DATA FIELDS MATCHED" 
          textColor="text-deep-sky-200"
          color="bg-secondary"
          dataStatus={DataStatus.FIELDSRETURNED}
        />
      </div>
      <div className='border border-long-haul border-2 rounded-lg my-0.5 '>
        <StatusBox
          text="DATA PUBLISHED" 
          textColor="text-deep-sky-200"
          color="bg-success"
          dataStatus={DataStatus.FIELDSMATCHED}
        />
      </div>
      <div className='border border-long-haul border-2 rounded-lg my-0.5 '>
        <StatusBox
          text="PUBLISHING COMPLETED" 
          textColor="text-deep-sky-200"
          color="bg-accent"
          dataStatus={DataStatus.DATAAPPROVED}
        />
      </div>
    </div>
  )
}

export default TopInfoBar
