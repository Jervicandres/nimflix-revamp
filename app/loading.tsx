import { Skeleton } from '@components/ui/skeleton'
import React from 'react'

const Loading = () => {
   const array = new Array(12).fill(null);
  return (<>
   <Skeleton className='section-width h-96 border rounded-sm'>
      
   </Skeleton>
   <section className='section-width'>

      <div className='anime-results-grid'>
      <Skeleton className='skeleton-header'></Skeleton>
      {array.map((el,i) => {
         return <Skeleton key={i} className="animate-pulse w-full min-h-24 anime-card p-2 ">
                  <Skeleton className="w-full h-64 animate-pulse object-cover rounded-sm"/>
                  <Skeleton className="animate-pulse rounded-full text-xs opacity-70 text-wrap line-clamp-3 w-full h-3"/>
            </Skeleton>
      })
      }
      </div>
   </section>
   </>)
}

export default Loading