import Link from 'next/link';
import Image from "next/image"

const LeftDrawer = () => {
  const iconData = [
    {link:"", clasName:"tooltip tooltip-bottom", toolText:"add data AGOL", image:"/photo-1534528741775-53994a69daeb.jpg", },
    {link:"", clasName:"tooltip tooltip-bottom", toolText:"add data URL", image:"/photo-1534528741775-53994a69daeb.jpg", },
    {link:"", clasName:"tooltip tooltip-bottom", toolText:"add data file", image:"/photo-1534528741775-53994a69daeb.jpg", },
    {link:"", clasName:"tooltip tooltip-bottom", toolText:"edit layers", image:"/photo-1534528741775-53994a69daeb.jpg", },
    {link:"", clasName:"tooltip tooltip-bottom", toolText:"layer visibility", image:"/photo-1534528741775-53994a69daeb.jpg", },
    {link:"", clasName:"tooltip tooltip-bottom", toolText:"geoprocess tools", image:"/photo-1534528741775-53994a69daeb.jpg", },
    {link:"", clasName:"tooltip tooltip-bottom", toolText:"export config", image:"/photo-1534528741775-53994a69daeb.jpg", },
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
                <Image src={d.image} alt={d.toolText} width="48" height="48" className='mx-auto' />
                <div className='text-xs'>{d.toolText}</div>
            </Link></li>)}
        </ul>
      
      </div>
    </div>
    )
}

export default LeftDrawer
