'use client'

import Animegenre from "@components/Animegenre";
import { EpisodeProps, IAnimeInfo } from "@components/props/AnimeProps";
import { Skeleton } from "@components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"
import { ANIME, IAnimeEpisode, IAnimeResult, ITitle, META } from '@consumet/extensions'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import '../../styles/watch-anime.css'
import CleanText from "@utils/Cleantext";

interface PropsType{
   id: string;
   animeInfo: IAnimeResult;
   episodeList: IAnimeEpisode[];
   currentEpisode: IAnimeEpisode;
}

const Animedetails = ({id,animeInfo,episodeList, currentEpisode}: PropsType) => {
   const searchParams = useSearchParams();
   const episodeId = searchParams.get("ep");

   const [currentPage, setCurrentPage] = useState(1);
   const perPage = 40;
   const lastIndex = currentPage * perPage;
   const firstIndex = lastIndex - perPage;
   const maxPage = episodeList ? Math.ceil(episodeList.length / perPage) : 0;
   
   const paginationList = new Array(maxPage).fill(null);

   return (
   <section className="grid grid-cols-3 gap-5 items-start">
      <div className="details-container">
         <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">{(animeInfo.title as ITitle).english} - Episode {currentEpisode.number}</h2>
            <Link href={`/anime/${id}`} className={`flex items-center gap-2 text-sm max-w-fit text-yellow opacity-70`}>
               <span>
                  {(animeInfo.title as ITitle).romaji} 
               </span>
               •
               <span>
                  {(animeInfo.title as ITitle).native}
               </span>
            </Link>
            <hr className="mt-2"/>
            <div className="flex flex-col items-start gap-2 mb-2">
               <p className="text-md font-semibold">
                  Description:
               </p>
               <p className="text-sm">
                  {currentEpisode.description ? CleanText(currentEpisode.description) : 'No description.'}
               </p>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-md font-semibold">Genre: </span><Animegenre genres={animeInfo.genres} color={animeInfo.color} />
            </div>
         </div>
      </div>
      <div className="episodes-container">
         
         <div className='flex justify-start gap-3 items-center'>
            <label className="text-md font-semibold">Episode List</label>
            {maxPage >= 1 &&
               <Select defaultValue='1' onValueChange={(e) => setCurrentPage(Number(e))}>
                  <SelectTrigger className="w-[200px] outline-none">
                     <SelectValue  />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectGroup>
                        {paginationList?.map((_,index) => {
                        const pageNumber = index+1;
                        const episodeEnd = pageNumber === maxPage ? episodeList?.length : pageNumber * perPage;
                        const episodeStart = pageNumber === maxPage ? ((maxPage-1)*perPage) + 1 : ((episodeEnd ?? 1) - perPage)+1;
                        return <SelectItem key={index} value={pageNumber.toString()}>{episodeStart} - {episodeEnd}</SelectItem>
                     })}
                     </SelectGroup>
                  </SelectContent>
               </Select> 
            }
         </div>
         <hr/>
         <div className="episode-list">
            {episodeList?.slice(firstIndex,lastIndex).map((episode, index) => {
               return <Link key={episode.id} href={`/anime/${id}/watch?ep=${episode.id}`} className={`episode-card ${episode.id === episodeId && 'pointer-events-none'}`}> 
                        <div className="relative min-w-28 h-16">
                           <Image src={episode.image ?? ''} alt={episode.title ?? ''} fill sizes="100%" className="object-cover"/>
                        </div>
                        <div className="flex flex-col gap-1 items-start">
                           {episode.title ? 
                              <span className="episode-title">{episode.number}: {episode.title}</span> :
                              <span className="episode-title">Episode: {episode.number}</span>
                           }
                           {episode.id === episodeId && <span className="text-xs p-1 rounded-sm bg-yellow text-black">Currently Watching</span>}
                        </div>
                     </Link>
            })
         }
         </div>
      </div>
   </section>
   )

}

export default Animedetails