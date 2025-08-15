import React, { useEffect, useState } from 'react'
import { EpisodeProps } from '@components/props/AnimeProps'
import Image from 'next/image'
import Link from 'next/link'
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select"
import { IAnimeEpisode } from '@consumet/extensions'

interface EpisodesProps {
   id: string,
   poster: string | undefined,
   episodes: IAnimeEpisode[] | undefined,
}

const Episodes = ({id,poster, episodes}: EpisodesProps) => {
   const [currentPage, setCurrentPage] = useState(1)
   const perPage = 40;
   const lastIndex = currentPage * perPage;
   const firstIndex = lastIndex - perPage;
   const episodeList = episodes?.slice(firstIndex, lastIndex);
   const maxPage = episodes ? Math.ceil(episodes.length / perPage) : 0;
   const paginationList = new Array(maxPage).fill(null);

   return (
   <div className='episode-grid'>
      <div className='col-span-full items-center'>
         <div className='flex justify-start gap-3 items-center'>
            <label>{episodes?.length ? 'Episodes:' : 'No episodes found.'}</label>
            {maxPage >= 1 &&
               <Select defaultValue='1' onValueChange={(e) => setCurrentPage(Number(e))}>
                  <SelectTrigger className="w-[200px]">
                     <SelectValue  />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectGroup>
                        {paginationList.map((_,index) => {
                        const pageNumber = index+1;
                        const episodeEnd = pageNumber === maxPage ? episodes?.length : pageNumber * perPage;
                        const episodeStart = pageNumber === maxPage ? ((maxPage-1)*perPage) + 1 : ((episodeEnd ?? 1) - perPage)+1;
                        return <SelectItem key={index} value={pageNumber.toString()}>{episodeStart} - {episodeEnd}</SelectItem>
                     })}
                     </SelectGroup>
                  </SelectContent>
               </Select> 
            }
         </div>
      </div>
      {episodeList?.map(episode => {
         return (
            <Link href={`/anime/${id}/watch?ep=${episode.episodeId}`} key={String(episode.episodeId)}>
               <div className="w-full pt-[56.25%] mx-auto relative">
               <Image 
               src={poster ?? ''} 
               alt={episode.title ?? ''}
               fill
               sizes='100%'
               quality={70}
               className='object-cover'
               priority
               />
               {episode.number != null && <div className='text-sm truncate text-white bg-black bg-opacity-80 w-full p-1 z-10 absolute bottom-0 left-0'>Episode {episode.number}: {episode.title}</div>}
               </div>
            </Link>
         )
      })}
   </div>
   )
}

export default Episodes