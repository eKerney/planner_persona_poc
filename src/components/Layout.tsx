import { LayoutProps } from "../types";
import { DataTable } from "../utilities/UtilityComponents";

export const RootLayout = ({ ArcMap, ToolPanel, TopInfoBar}: LayoutProps) => {
  return (
          <div id='root' className='bg-asl-black grid grid-cols-12 grid-rows-4 h-screen grid-flow-row-dense p-2 gap-4' >
          <div className="row-span-4 col-span-3 grid grid-rows-4 gap-2" >
            <div id='leftDrawer' className='border border-deep-sky-500 border-2 bg-dark-grey-200 rounded-lg shadow-xl row-span-3 col-span-2 '> 
              {ToolPanel}
            </div>
            <div className=" row-span-1 col-span-2 border border-deep-sky-500 border-2 bg-dark-grey-200 rounded-lg shadow-xl gap-2">
            <DataTable />
            </div>
          </div>
          
          <div className='rounded-lg shadow-xl h-screen col-span-9 grid grid-rows-6 gap-4 '>
              {TopInfoBar}
              <div className='rounded-lg shadow-xl row-span-5 grid grid-cols-6 grid-rows-4 gap-2'> 
                <div className='border border-deep-sky-400 border-4 rounded-lg shadow-xl col-span-6 row-span-4 z-50'>
                  {ArcMap}
                </div>
              </div>
            </div>
          </div>
  );
}

export default RootLayout
