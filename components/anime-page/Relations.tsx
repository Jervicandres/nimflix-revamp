import { RelationsProps } from '@components/props/AnimeProps'
import { IAnimeResult, ITitle } from '@consumet/extensions'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export interface IRelation {
   relations: IAnimeResult[] | undefined
}

const Relations = (props: IRelation) => {
   return (
      <div className='grid md:grid-cols-2 lg:grid-cols-3 items-start gap-3 w-full'>
      { props.relations ?
      props?.relations?.map((relation:IAnimeResult) => {
         return (<Link key={relation.id} href={`/anime/${relation.id}`} className='flex items-start h-28 max-h-28 bg-zinc-900 rounded-md'>
            <div className='relative min-w-20 h-full'>
               <Image src={relation.image ?? ''} alt={relation.id} fill sizes='100%' className='object-fill'/>
            </div>
            <div className='flex flex-col gap-1 text-xs p-2'>
               <p className='capitalize text-yellow opacity-90'>{relation?.relationType.toLowerCase().replace(/_/g, '   ')}</p>
               <p className='font-bold text-wrap truncate line-clamp-1'>{(relation?.title as ITitle).english || (relation.title as ITitle).userPreferred || (relation?.title as ITitle).romaji || (relation?.title as ITitle).native}</p>
               <p className='flex items-center gap-1'>Rating: <span className='flex items-center gap-1 text-yellow font-semibold'><FontAwesomeIcon icon={faStar} />{(relation.rating ?? 0) / 10}</span></p>
               <p className='opacity-70 truncate'>{relation?.type} - {relation?.status}</p>
            </div>
         </Link>)
      }) :
      <div>No relations for this anime.</div>}
    </div>
  )
}

export default Relations