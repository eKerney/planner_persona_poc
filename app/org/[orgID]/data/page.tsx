'use client'
import dynamic from "next/dynamic";

const EsriMapWithNoSSR = dynamic(() => import('@/components/EsriMap'), { 
  ssr: false
});

 
export default function HomePage() {
  return (
    <div>
      <EsriMapWithNoSSR />
    </div>
  );
}


