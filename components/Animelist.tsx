'use client'
import Animecard from './Animecard';
import { IAnimeResult, ITitle } from '@consumet/extensions';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@node_modules/@fortawesome/react-fontawesome';
import { faClosedCaptioning, faMicrophone } from '@node_modules/@fortawesome/free-solid-svg-icons';


const Animelist = ({animeList, headerText}: {animeList: IAnimeResult[], headerText?: string}) => {
  /* if(headerText === 'Most Popular' || headerText === 'Anime You May Like') */
  if(true)
    return (<section className='w-[90%] max-w-[1440px] mx-auto my-5'>
        <div className='anime-results-grid'>
          <h2 className='text-xl col-span-full font-bold mb-2 border-l-4 border-l-yellow pl-2'>{headerText}</h2>
          {animeList?.map((anime) => {
            return <Animecard key={anime.id} anime={anime}/>
          })
          }
        </div>
      </section>)

  else if(headerText === 'New Episodes')
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
                           src={anime.poster ?? ''} 
                           alt={anime?.name ?? ''}
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
                        {anime.name || anime.jname || anime.id || 'Unknown Title'} 
                     </span>
                     
                  </div>
                  <div 
                    className="truncate text-sm absolute top-2 right-3" 
                    >
                      {/* {anime.releaseDate ?? 'N/A'} &bull; {anime.genres ? anime.genres?.slice(0,2).join(', ') : 'N/A'} */}
                      <span className="bg-teal-300 text-zinc-800 text-sm font-semibold border-r-2 rounded-l-sm px-1">
                          <FontAwesomeIcon className="mr-1" icon={faClosedCaptioning} />
                          {(anime?.episodes?.sub || 0)} 
                      </span>
                      <span className="bg-cyan-300 text-zinc-800 text-sm font-semibold rounded-r-sm px-1">
                          <FontAwesomeIcon className="mr-1" icon={faMicrophone} />
                          {(anime?.episodes?.dub || 0)}
                      </span>
                  </div>
               </Link>
                })
                }
              </div>
            </section>)
  }

export default Animelist