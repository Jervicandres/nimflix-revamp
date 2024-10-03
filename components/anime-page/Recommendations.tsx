import { IAnimeResult, ITitle } from '@consumet/extensions'
import { faStar } from '@fortawesome/free-solid-svg-icons'
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
              <Image src={recommendation.image ?? ''} alt={recommendation.id} fill sizes='100%' className='object-fill'/>
           </div>
           <div className='flex flex-col gap-1 text-xs p-2'>
              <p className='capitalize text-yellow opacity-90'>{}</p>
              <p className='font-bold text-wrap truncate line-clamp-1'>{(recommendation?.title as ITitle).english || (recommendation.title as ITitle).userPreferred || (recommendation?.title as ITitle).romaji || (recommendation?.title as ITitle).native}</p>
              <p className='flex items-center gap-1'>Rating: <span className='flex items-center gap-1 text-yellow font-semibold'><FontAwesomeIcon icon={faStar} />{((recommendation.rating ?? 0) / 10).toFixed(1)}</span></p>
              <p className='opacity-70 truncate'>{recommendation?.type} - {recommendation?.status}</p>
           </div>
        </Link>)
     }): <div>No recommendations.</div>}
   </div>
 )
}

export default Recommendations