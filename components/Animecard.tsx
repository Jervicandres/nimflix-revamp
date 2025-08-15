'use client'
import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClosedCaptioning, faMicrophone, faStar } from "@fortawesome/free-solid-svg-icons"

const Animecard = ({anime}: any) => {

   return (<Link href={`/anime/${anime.id}`} key={anime.id} className="anime-card relative">
      <div className="relative">
         <div className="anime-overview">

         </div>
         <div className="w-full pt-[140%] relative">
            <Image 
               src={anime.poster ?? ''} 
               alt={anime.name ?? ''}
               fill
               priority
               sizes="100%"
               className="object-cover"
            />
         </div>
      </div>
      <div className="anime-title">
         <span 
         className="overflow-x-scroll text-wrap line-clamp-2 no-scrollbar" 
         >
            {anime?.name || anime?.jname} 
         </span>
         {/* <span className="text-yellow text-nowrap"><FontAwesomeIcon icon={faStar} /> {((anime.rating ?? 0) / 10).toFixed(1)}</span> */}
      </div>
      <div 
      className="truncate text-sm absolute top-3 right-3" 
      >
         {/* {anime.releaseDate ?? 'N/A'} &bull; {anime.genres ? anime.genres?.slice(0,2).join(', ') : 'N/A'} */}
         <span className="bg-teal-400 text-zinc-700 text-sm font-semibold border-r-[1px] rounded-l-md p-1">
            <FontAwesomeIcon className="mr-1" icon={faClosedCaptioning} />
            {(anime?.episodes?.sub || 0)} 
         </span>
         <span className="bg-cyan-400 text-zinc-700 text-sm font-semibold rounded-r-md p-1">
            <FontAwesomeIcon className="mr-1" icon={faMicrophone} />
            {(anime?.episodes?.dub || 0)}
         </span>
      </div>
   </Link>)
}

export default Animecard