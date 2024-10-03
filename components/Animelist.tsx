'use client'
import Animecard from './Animecard';
import { IAnimeResult, ITitle } from '@consumet/extensions';
import Link from 'next/link';
import Image from 'next/image';


const Animelist = ({animeList, headerText}: {animeList: IAnimeResult[], headerText?: string}) => {

  if(headerText === 'Popular Anime' || headerText === 'Anime You May Like')
    return (<section className='w-[90%] max-w-[1440px] mx-auto my-5'>
        <div className='anime-results-grid'>
          <h2 className='text-xl col-span-full font-bold mb-2 border-l-4 border-l-yellow pl-2'>{headerText}</h2>
          {animeList?.map((anime) => {
            return <Animecard key={anime.id} anime={anime}/>
          })
          }
        </div>
      </section>)

  else if(headerText === 'Recent Episodes')
    return (<section className='w-[90%] max-w-[1440px] mx-auto my-5'>
              <div className='anime-results-grid'>
                <h2 className='text-xl col-span-full font-bold mb-2 border-l-4 border-l-yellow pl-2'>{headerText}</h2>
                {animeList?.map((anime) => {
                  return <Link href={`/anime/${anime.id}/watch?ep=${anime.episodeId?.replace('/','')}`} key={anime.id} className="anime-card">
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
                     
                  </div>
                  <span 
                  className="truncate text-sm opacity-70 capitalize" 
                  >
                     {anime.episodeId ? anime.episodeId.substring(anime.episodeId.lastIndexOf('episode'),anime.episodeId.length).replace(/-/g,' ') : ''}
                  </span>
               </Link>
                })
                }
              </div>
            </section>)
  }

export default Animelist