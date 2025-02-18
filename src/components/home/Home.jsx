import React, { Suspense, lazy } from 'react'
import Fetching from '../fetching/Fetching'
const Section5 = lazy(() => import('./section5/Section5'));
const Section4 = lazy(() => import('./section4/Section4'));
const Section1 = lazy(() => import('./section1/Section1'));
const Section2 = lazy(() => import('./section2/Section2'));
const Section3 = lazy(() => import('./section3/Section3'));

const Home = () => {
  return (
    <div className='dark:text-white text-black min-h-[80vh] px-[5px] md:px-[50px] lg:px-[105px] ' >
       <Suspense fallback={<Fetching />} >
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
      </Suspense>
    </div>
  )
}

export default Home