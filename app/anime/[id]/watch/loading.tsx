import { Skeleton } from '@components/ui/skeleton';
import React from 'react'

const Loading = () => {
  
  const array = new Array(3).fill(null);
  return (<>
  
    <section className='w-full lg:w-3/4 lg:mx-auto'>
    <Skeleton className='w-full mt-5 h-[80vh]'>
   </Skeleton>
   <section className='anime-section mt-5'>
      <section className="grid grid-cols-3 gap-5 items-start">
        <div className="details-container">
          <div className="flex flex-col gap-2">
              <Skeleton className="text-xl font-semibold w-full h-6"></Skeleton>
              <Skeleton className="text-xl font-semibold w-2/4 h-6">
              </Skeleton>
              <hr className="mt-2"/>
              <div className="flex flex-col items-start gap-2">
                <Skeleton className="text-xl font-semibold w-full h-6"></Skeleton>
                <Skeleton className="text-xl font-semibold w-full h-6"></Skeleton>
                <Skeleton className="text-xl font-semibold w-3/4 h-6"></Skeleton>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="text-md font-semibold"></Skeleton>
              </div>
          </div>
        </div>
        <div className="episodes-container">
          <span className="text-md font-semibold">Episode List</span>
          <hr/>
          <div className="episode-list">
          {array.map((episode, index) => {
              const episodeElement = <Skeleton key={index} className="flex items-start gap-2 p-2"> 
                <Skeleton className="relative min-w-28 h-16"></Skeleton>
                <div className="flex flex-col w-full gap-2">
                <Skeleton className="relative w-full h-4"></Skeleton>
                <Skeleton className="relative w-2/4 h-4"></Skeleton>
                </div>
              </Skeleton>
                return episodeElement;
          })}
          </div>
        </div>
    </section>
    </section>
   </section>
   </>)
}

export default Loading