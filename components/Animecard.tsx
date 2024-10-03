'use client'
import Image from "next/image"
import { IAnimeCard } from "./props/AnimeProps"
import { ComponentType, useRef } from "react"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { IAnimeInfo, ITitle } from "@consumet/extensions"

const Animecard = ({anime}: {anime: IAnimeInfo}) => {

   return (<Link href={`/anime/${anime.id}`} key={anime.id} className="anime-card">
      <div className="relative">
         <div className="anime-overview">

         </div>
         <div className="w-full pt-[140%] relative">
            <Image 
               src={anime.image ?? ''} 
               alt={(anime?.title as ITitle).english ?? ''}
               fill
               priority
               sizes="100%"
               className="object-cover"
            />
         </div>
      </div>
      <div className="anime-title">
         <span 
         className="truncate overflow-x-scroll no-scrollbar" 
         >
            {(anime?.title as ITitle).english || (anime?.title as ITitle).userPreferred || (anime?.title as ITitle).romaji} 
         </span>
         <span className="text-yellow text-nowrap"><FontAwesomeIcon icon={faStar} /> {((anime.rating ?? 0) / 10).toFixed(1)}</span>
      </div>
      <span 
      className="truncate text-sm opacity-70" 
      >
         {anime.releaseDate ?? 'N/A'} &bull; {anime.genres ? anime.genres?.slice(0,2).join(', ') : 'N/A'}
      </span>
   </Link>)
}

export default Animecard