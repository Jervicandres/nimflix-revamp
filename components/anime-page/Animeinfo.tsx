'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image';
import Animegenre from '@components/Animegenre';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Episodes from './Episodes';
import Relations from './Relations';
import Recommendations from './Recommendations';
import { Skeleton } from '@components/ui/skeleton';
import { ANIME, FuzzyDate, IAnimeEpisode, IAnimeInfo, IAnimeResult, ITitle, META } from '@consumet/extensions';
import Cleantext from '@utils/Cleantext';

export const FormatStartDate = ({year,month,day}: FuzzyDate) => {
  const premierDate = new Date(year ?? 0, month ?? 0, day ?? 0);
  const formatter = new Intl.DateTimeFormat('en', {month: 'long', day: 'numeric', year: 'numeric'})
  return <>{formatter.format(premierDate)}</>;
}

const Animeinfo = ({anime,episodes}: {
  anime: IAnimeResult,
  episodes: IAnimeEpisode[]
}) => {
  const [readmore, setReadmore] = useState(false);
  const [showReadmore, setShowReadmore] = useState(false);
  const [selected, setSelected] = useState("Episodes")
  

  const handleClick = (e:  React.MouseEvent<HTMLButtonElement>) => {
    setSelected((e.target as HTMLElement).innerText);
  }


  if(anime){
  return (
    <section className='w-full min-h-dvh relative'>
        <div className='anime-banner' style={{backgroundImage: `url('${anime.cover}')`, backgroundPosition: '50% 45%'}}>
        </div>
        <div className="flex flex-col items-start lg:flex-row w-[90vw] lg:w-3/4 mx-auto my-5 gap-5">
          <div className="anime-poster" style={{boxShadow: `0px 0px 20px -5px ${anime.color}b3` }}>
              {
              <Image 
              src={anime.image ?? 'https://placehold.co/200x300?text=Loading...'} 
              alt={anime.id ?? ''} 
              fill 
              sizes='100%' 
              className='object-cover rounded-md'/> 
              }
          </div>
          <div className='flex flex-col gap-2 lg:w-4/5'>
              <h1 className='text-xl lg:text-2xl flex items-center gap-2 font-medium'>
                {(anime.title as ITitle).english ?? (anime.title as ITitle).userPreferred } <span className='text-yellow text-sm'><FontAwesomeIcon icon={faStar} /> {(anime.rating ? anime.rating / 10 : 0).toFixed(1)}</span> <span className='text-xs opacity-60'>({anime.status})</span>
              </h1>
              <Animegenre genres={anime.genres ?? []} color={anime.color ?? ''} />
              <div className='flex flex-col items-start gap-2'>
                <p className={`text-xs truncate text-wrap  ${readmore ?  '' : 'line-clamp-3' }`} ref={el => { el?.scrollHeight != el?.clientHeight && setShowReadmore(true)}}>
                  {Cleantext(anime.description)}
                </p>
                {showReadmore && 
                <button onClick={() => setReadmore(prevState => !prevState)} className={`text-xs duration-200 bg-light text-dark hover:bg-dark hover:text-white border hover:border py-1 px-2 rounded-sm`}>
                  {readmore ? 'Read Less' : 'Read More'}
                </button>}
              </div>
          </div>
        </div>
        
        <div className='flex flex-row flex-wrap lg:flex-nowrap items-start gap-5 w-[90vw] lg:w-[75vw] mx-auto mt-5'>
          <div className={`flex flex-col gap-1 w-full lg:w-[250px] rounded-lg text-xs lg:text-sm p-5 ${!anime.color ? 'bg-sage' : ''}`} style={{backgroundColor: `${anime.color}80`}}>
            {Object.keys(anime.title).map((language: string, index: number) => {
              if((anime.title as any)[language])
              return <p key={index}><span className='font-bold capitalize'>{language}</span>: {(anime.title as any)[language]}</p>
            })}
            {anime.synonyms && 
            <div className='whitespace-pre text-wrap'>
              <span className='font-bold capitalize'>Synonyms:</span>
              {anime.synonyms.map((synonym: string) => synonym).join(",\r\n")}
            </div>}
            <p><span className='font-bold'>Episodes: 
            </span> {anime.totalEpisodes}</p>
            <p><span className='font-bold'>Premiered: </span>{anime.startDate != null && <FormatStartDate year={anime.startDate?.year} month={anime.startDate?.month} day={anime.startDate?.day}/>}</p>
            {anime.endDate?.day && <p><span className='font-bold'>Ended: </span><FormatStartDate year={anime.endDate?.year} month={anime.endDate?.month} day={anime.endDate?.day} /></p>}
          </div>

          <div className='flex flex-col items-start w-full lg:w-[1150px] gap-3'>
          <div className='flex items-center justify-evenly w-full min-h-4'>
              <button onClick={(e) => handleClick(e)} className={`${selected === "Episodes" ? 'active' : 'border-b-transparent'} tabs`}>Episodes</button>
              <button onClick={(e) => handleClick(e)} className={`${selected === "Relations" ? 'active' : 'border-b-transparent'} tabs`}>Relations</button>
              <button onClick={(e) => handleClick(e)} className={`${selected === "Recommendations" ? 'active' : 'border-b-transparent'} tabs`}>Recommendations</button>
          </div>
          {(selected === "Episodes") ? <Episodes id={anime.id} episodes={episodes}/> :
          (selected === "Relations") ? <Relations relations={anime.relations} /> : <Recommendations recommendations={anime.recommendations}/>}
          </div>
        </div>
    </section>
  )}
  else{
    return(<section className='w-full min-h-dvh relative'>
      <Skeleton className='anime-banner'>
      </Skeleton>
      <div className="flex flex-col items-start lg:flex-row w-[90vw] lg:w-3/4 mx-auto my-5 gap-5">
        <Skeleton className="anime-poster">
        </Skeleton>
        <div className='flex flex-col gap-2 w-full lg:w-4/5'>
            <Skeleton className='w-full lg:w-1/4 text-xl lg:text-2xl flex items-center gap-2 font-medium'>
            </Skeleton>
            <div className='flex flex-col items-start gap-2'>
              <Skeleton className='w-2/4 h-5'></Skeleton>
              <Skeleton className='w-1/4 h-5'></Skeleton>
              <Skeleton className='w-full h-5'></Skeleton>
              <Skeleton className='w-full h-5'></Skeleton>
              <Skeleton className='w-3/4 h-5'></Skeleton>
            </div>
        </div>
      </div>
      <div className='flex flex-row flex-wrap lg:flex-nowrap items-start gap-5 w-[90vw] lg:w-[75vw] mx-auto mt-5'>
        <div className='flex flex-row items-start gap-5 w-[90vw] lg:w-[75vw] mx-auto mt-5'>
          <Skeleton className={`flex flex-col gap-1 w-full lg:w-1/5 h-48 rounded-lg lg:text-sm p-5 `}>
            <Skeleton className='w-full h-5' />
            <Skeleton className='w-full h-5' />
            <Skeleton className='w-full h-5' />
            <Skeleton className='w-3/4 h-5' />
            <Skeleton className='w-2/4 h-5' />
          </Skeleton>
        </div>
      </div>
  </section>)
  }
}

export default Animeinfo