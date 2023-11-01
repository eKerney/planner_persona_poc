import Link from 'next/link';
import Image from "next/image"

const LeftDrawer = () => {
  const tTip: string = "tooltip tooltip-bottom";
  const iconData = [
    {link:"", clasName:tTip, toolText:"add data AGOL", image:"/add-circle.svg", },
    {link:"", clasName:tTip, toolText:"add data URL", image:"/add-square.svg", },
    {link:"", clasName:tTip, toolText:"add data file", image:"/add-square.svg", },
    {link:"", clasName:tTip, toolText:"edit layers", image:"/add-square.svg", },
    {link:"", clasName:tTip, toolText:"layer visibility", image:"/photo-1534528741775-53994a69daeb.jpg", },
    {link:"", clasName:tTip, toolText:"geoprocess tools", image:"/photo-1534528741775-53994a69daeb.jpg", },
    {link:"", clasName:tTip, toolText:"export config", image:"/photo-1534528741775-53994a69daeb.jpg", },
  ];

  return (
    <div className="drawer lg:drawer-open flex justify-center pt-5">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        <ul className="menu w-full min-h-full text-base-content rounded-lg ">
          {iconData.map(d => 
            <li key={d.toolText}><Link href={d.link} className={d.clasName} data-tip={d.toolText}>
                <Image src={d.image} alt={d.toolText} width="32" height="32" className='mx-auto' />
                <div className='text-xs'>{d.toolText}</div>
            </Link></li>)}
        </ul>
      
      </div>
    </div>
    )
}

export default LeftDrawer
