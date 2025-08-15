import { RelationsProps } from '@components/props/AnimeProps'
import { IAnimeResult, ITitle } from '@consumet/extensions'
import { faClosedCaptioning, faMicrophone, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export interface IRelation {
   relations: IAnimeResult[] | undefined
}

const Relations = (props: any) => {
   return (
      <div className='grid md:grid-cols-2 lg:grid-cols-3 items-start gap-3 w-full'>
      { props.relations ?
      props?.relations?.map((relation:any) => {
         return (<Link key={relation.id} href={`/anime/${relation.id}`} className='flex items-start h-28 max-h-28 bg-zinc-900 rounded-md'>
            <div className='relative min-w-20 h-full'>
               <Image src={relation.poster ?? ''} alt={relation.id} fill sizes='100%' className='object-fill'/>
            </div>
            <div className='flex flex-col gap-1 text-xs p-2'>
               {/* <p className='capitalize text-yellow opacity-90'>{relation?.relationType.toLowerCase().replace(/_/g, '   ')}</p> */}
               <p className='font-bold text-wrap truncate line-clamp-1 hover:text-yellow'>{relation?.name || ""}</p>
               <p className='opacity-70 truncate text-wrap line-clamp-2'>{relation?.jname || ""}</p>
               
               <div className="truncate text-xs flex items-center" >
                  <p className='opacity-70 truncate mr-2'>{relation?.type}</p>
                  <span className="bg-teal-400 text-zinc-700 font-semibold border-r-[1px] rounded-l-md px-1">
                     <FontAwesomeIcon className="mr-1" icon={faClosedCaptioning} />
                     {(relation?.episodes?.sub || 0)} 
                  </span>
                  <span className="bg-cyan-400 text-zinc-700 font-semibold rounded-r-md px-1">
                     <FontAwesomeIcon className="mr-1" icon={faMicrophone} />
                     {(relation?.episodes?.dub || 0)}
                  </span>
               </div>
            </div>
         </Link>)
      }) :
      <div>No relations for this anime.</div>}
    </div>
  )
}

export default Relations