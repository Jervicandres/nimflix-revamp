import { IAnimeResult, ITitle } from '@consumet/extensions'
import { faClosedCaptioning, faMicrophone, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'


const Recommendations = ({recommendations}: {recommendations: IAnimeResult}) => {
  
  return (
     <div className='grid md:grid-cols-2 lg:grid-cols-3 items-start gap-3 w-full'>
     {recommendations.length ?
     recommendations?.map((recommendation:IAnimeResult) => {
      if(recommendation.id)
        return (<Link key={recommendation.id} href={`/anime/${recommendation.id}`} className='flex items-start h-28 max-h-28 bg-zinc-900 rounded-md'>
           <div className='relative min-w-20 h-full'>
              <Image src={recommendation.poster ?? ''} alt={recommendation.id} fill sizes='100%' className='object-fill'/>
           </div>
            <div className='flex flex-col gap-1 text-xs p-2'>
                          <p className='font-bold text-wrap truncate line-clamp-1 hover:text-yellow'>{recommendation?.name || ""}</p>
                          <p className='opacity-70 truncate text-wrap line-clamp-2'>{recommendation?.jname || ""}</p>
                          
                          <div className="truncate text-xs flex items-center" >
                             <p className='opacity-70 truncate mr-2'>{recommendation?.type}</p>
                             <span className="bg-teal-400 text-zinc-700 font-semibold border-r-[1px] rounded-l-md px-1">
                                <FontAwesomeIcon className="mr-1" icon={faClosedCaptioning} />
                                {(recommendation?.episodes?.sub || 0)} 
                             </span>
                             <span className="bg-cyan-400 text-zinc-700 font-semibold rounded-r-md px-1">
                                <FontAwesomeIcon className="mr-1" icon={faMicrophone} />
                                {(recommendation?.episodes?.dub || 0)}
                             </span>
                          </div>
                       </div>
        </Link>)
     }): <div>No recommendations.</div>}
   </div>
 )
}

export default Recommendations