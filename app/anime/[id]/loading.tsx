import { Skeleton } from '@components/ui/skeleton'
import React from 'react'

const Loading = () => {
   return(
   <section className='w-full min-h-dvh relative'>
      <Skeleton className='anime-banner'>
      </Skeleton>
      <div className="flex flex-col items-start lg:flex-row w-[90vw] lg:w-3/4 mx-auto my-5 gap-5">
         <Skeleton className="anime-poster">
         </Skeleton>
         <div className='flex flex-col gap-2 w-full lg:w-4/5'>
            <Skeleton className='w-full lg:w-1/4 text-xl lg:text-2xl flex items-center gap-2 font-medium'>
            </Skeleton>
            <div className='flex flex-col items-start gap-2'>
               <Skeleton className='w-2/4 h-5'></Skeleton>
               <Skeleton className='w-1/4 h-5'></Skeleton>
               <Skeleton className='w-full h-5'></Skeleton>
               <Skeleton className='w-full h-5'></Skeleton>
               <Skeleton className='w-3/4 h-5'></Skeleton>
            </div>
         </div>
      </div>
      <div className='flex flex-row flex-wrap lg:flex-nowrap items-start gap-5 w-[90vw] lg:w-[75vw] mx-auto mt-5'>
         <div className='flex flex-row items-start gap-5 w-[90vw] lg:w-[75vw] mx-auto mt-5'>
            <Skeleton className={`flex flex-col gap-1 w-full lg:w-1/5 h-48 rounded-lg lg:text-sm p-5 `}>
            <Skeleton className='w-full h-5' />
            <Skeleton className='w-full h-5' />
            <Skeleton className='w-full h-5' />
            <Skeleton className='w-3/4 h-5' />
            <Skeleton className='w-2/4 h-5' />
            </Skeleton>
         </div>
      </div>
   </section>)
}

export default Loading