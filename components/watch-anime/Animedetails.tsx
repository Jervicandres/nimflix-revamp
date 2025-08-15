'use client'

import Animegenre from "@components/Animegenre";
import { EpisodeProps, IAnimeInfo, ICurrentAnime, IRecentWatch } from "@components/props/AnimeProps";
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
   currentEpisode: any;
}

const Animedetails = ({id,animeInfo,episodeList, currentEpisode}: PropsType) => {
   const searchParams = useSearchParams();
   const episodeId = searchParams.get("ep");
   const {info, moreInfo} = animeInfo.anime;
   const [currentPage, setCurrentPage] = useState(1);
   const perPage = 40;
   const lastIndex = currentPage * perPage;
   const firstIndex = lastIndex - perPage;
   const maxPage = episodeList ? Math.ceil(episodeList.length / perPage) : 0;
   
   const paginationList = new Array(maxPage).fill(null);

   useEffect(() => {
      const recentWatchList: IRecentWatch[] = JSON.parse(localStorage.getItem("RECENT_WATCH") || "[]");
      
         const currentAnime: ICurrentAnime = { 
            id: id, 
            episodeId: currentEpisode.episodeId, 
            episodeNumber: currentEpisode.number.toString(), 
            title: info.name, 
            thumbnail: info.poster || ""
         };
         if (recentWatchList.length < 6 && recentWatchList.length > 0 && recentWatchList.some((currentAnime,index) => currentAnime.id === recentWatchList[index].id && currentAnime.episodeId === recentWatchList[index].episodeId)) {
            recentWatchList.unshift(currentAnime);
            localStorage.setItem("RECENT_WATCH",JSON.stringify(recentWatchList));
         }
         else if (recentWatchList.length < 6 && currentAnime.id) {
            localStorage.setItem("RECENT_WATCH",JSON.stringify([currentAnime]));
         }
         else {
            recentWatchList.pop();
            recentWatchList.unshift(currentAnime);
            localStorage.setItem("RECENT_WATCH",JSON.stringify(recentWatchList));
         }
      
   }, []);
   return (
   <section className="grid grid-cols-3 gap-5 items-start">
      <div className="details-container">
         <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">{info?.name} - Episode {currentEpisode?.number}</h2>
            <Link href={`/anime/${id}`} className={`flex items-center gap-2 text-sm max-w-fit text-yellow opacity-70`}>
               <span>
                  {moreInfo?.japanese} 
               </span>
            </Link>
            <hr className="mt-2"/>
            <div className="flex flex-col items-start gap-2 mb-2">
               <p className="text-md font-semibold">
                  Description:
               </p>
               <p className="text-sm whitespace-pre-line">
                  {currentEpisode?.description ? CleanText(currentEpisode?.description) : info.description ? CleanText(info.description) : "No description available."}
               </p>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-md font-semibold">Genre: </span><Animegenre genres={moreInfo.genres} color={animeInfo.color} />
            </div>
         </div>
      </div>
      <div className="episodes-container">
         
         <div className='flex justify-start gap-3 items-center'>
            <label className="text-md font-semibold">Episode List</label>
            {maxPage >= 1 &&
               <Select defaultValue={'1'} onValueChange={(e) => setCurrentPage(Number(e))}>
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
               return <a key={episode.number} href={`/anime/${id}/watch?ep=${episode.episodeId}`} className={`episode-card ${episode.episodeId === episodeId && 'pointer-events-none'}`}> 
                        <div className="relative min-w-28 h-16">
                           <Image src={info.poster ?? ''} alt={episode.title ?? ''} fill sizes="100%" className="object-cover"/>
                        </div>
                        <div className="flex flex-col gap-1 items-start">
                           {episode.title ? 
                              <span className="episode-title">{episode.number}: {episode.title}</span> :
                              <span className="episode-title">Episode: {episode.number}</span>
                           }
                           {episode.episodeId === episodeId && <span className="text-xs p-1 rounded-sm bg-yellow text-black">Currently Watching</span>}
                        </div>
                     </a>
            })
         }
         </div>
      </div>
   </section>
   )

}

export default Animedetails