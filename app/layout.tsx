import type { Metadata } from 'next'
// import Link from 'next/link';
import './globals.css';
import NavBar from '@/components/NavBar';
import LeftDrawer from '@/components/LeftDrawer';

export const metadata: Metadata = {
  title: 'AirHub Planner Persona',
  description: 'Planner Persona Interface POC',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <main>
          <div className='bg-hadopelagic grid grid-cols-12 grid-rows-4 h-screen grid-flow-row-dense p-2 gap-1' >
            <div className='border border-deep-sky bg-hadopelagic rounded-lg shadow-xl h-screen row-span-5 col-span-1 ' />
            <div className=' rounded-lg shadow-xl h-screen col-span-11 grid grid-rows-6 gap-1 '>
              <div className='border border-deep-sky rounded-lg shadow-xl row-span-1 ' />
              <div className='rounded-lg shadow-xl row-span-5  grid grid-cols-6 grid-rows-4 gap-1'> 
                <div className='border border-deep-sky rounded-lg shadow-xl col-span-2 row-span-4 ' />
                <div className='border border-deep-sky rounded-lg shadow-xl col-span-4 row-span-4' />
              </div>
            </div>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}


