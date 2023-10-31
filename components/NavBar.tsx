import Link from 'next/link';
import Image from "next/image"

export default function NavBar() {
  const orgID: string = 'test';
  return (
  <div className="navbar bg-base-100">
    <div className="flex-1">
    </div>
    <div className="flex-none gap-2">
      <div className="form-control">
        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
      </div>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <Image src="/photo-1534528741775-53994a69daeb.jpg" alt="avatar" width="64" height="64"/>
          </div>
        </label>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li><Link href={`/org/${orgID}/profile`}>Profile</Link></li>
          <li><Link href="/org">Dashboard</Link></li>
          <li><Link href="/org">Logout</Link></li>
        </ul>
      </div>
    </div>
  </div>
  )
}
