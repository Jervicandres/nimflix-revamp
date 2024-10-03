'use client'
import { IAnimeResult, ITitle } from '@consumet/extensions'
import { Swiper, SwiperSlide } from 'swiper/react'
import {EffectFade, Autoplay, Pagination} from 'swiper/modules'
import "swiper/css/pagination";
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'
import Image from 'next/image'
import CleanText from '@utils/Cleantext'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faStar } from '@fortawesome/free-solid-svg-icons';

const Trending = ({trendingAnime}: {trendingAnime: IAnimeResult[]}) => {
  return (
    <section className='section-width h-64 lg:h-96 rounded-sm overflow-hidden'>
    <Swiper
      loop={true}
      autoplay={{
        delay: 7000,
        disableOnInteraction: false
      }}
      pagination={{
        type:'progressbar',
      }}
      spaceBetween={50}
      effect='fade'
      slidesPerView={1}
      className='mySwiper w-full h-full'
      modules={[EffectFade, Autoplay, Pagination]}
    >
      {trendingAnime.map((anime, index) => {
        const animeTitle = (anime.title as ITitle).english || (anime.title as ITitle).userPreferred || (anime.title as ITitle).romaji || (anime.title as ITitle).native || '';
        return (<SwiperSlide key={anime.id} className='relative'>
          <div className={`image-overlay w-full h-full relative`}>
            <Image src={anime.cover ?? ''} alt={anime.id} fill sizes='100vw' className='object-cover w-full blur-md' style={{objectPosition: '50% 20%'}} />
          </div>
          <section className='slider-content flex flex-col gap-2 items-start absolute w-[200px] md:w-[300px] lg:w-[400px] top-[20%] md:top-[10%] lg:top-[20%] left-[10%]'>
            <p className='uppercase text-xs lg:text-lg font-semibold text-yellow'>Trending #{index+1}</p>
            <Link href={`/anime/${anime.id}`} className='text-sm lg:text-xl w-full  text-wrap truncate line-clamp-2 font-bold hover:text-yellow duration-300'>
              {animeTitle}
            </Link>
            <div className='flex flex-wrap gap-1 text-xs md:text-sm lg:text-sm font-semibold'>
              <p className='text-yellow'><FontAwesomeIcon icon={faStar} /> {anime.rating ? `${(anime.rating / 10).toFixed(1)}` : 'No ratings'}</p>•
              <p>{anime.totalEpisodes ? `Episodes: ${anime.totalEpisodes} •` : ''}</p>
              <p>{anime.status ? `${anime.status}` : ''}</p>
              
            </div>
            <div className='flex flex-wrap gap-1 w-[200px] lg:w-full'>{anime.genres.slice(0,2).map((genre:string) => (
              <div key={genre} className='p-[5px] rounded-sm text-xs' style={{backgroundColor: `${anime.color ?? '#495E57'}80`}}>
                {genre}
              </div>
            ))}</div>
            <div className='w-full   md:text-xs lg:text-sm hidden md:block lg:block '>
              <p className='text-wrap line-clamp-2'>
                {(CleanText(anime.description.slice(0,180)))}
              </p>
            </div>
            <div>
              <Link href={`/anime/${anime.id}`} className='flex items-center gap-1 border border-white text-sm p-2 rounded-sm hover:bg-white hover:text-dark'><FontAwesomeIcon icon={faCircleInfo} size='xs' /> View Details</Link>
            </div>
          </section>
          <div className='absolute top-[-10%] right-[-30px] md:right-0 lg:right-[10%]'>
            <div className='relative rotate-12 scale-125 w-[200px] h-[300px] lg:w-[300px] lg:h-[500px] border-white border-[10px]'>
              <Image src={anime.image ?? ''} alt={animeTitle} fill sizes='100%' className='object-cover '/>
            </div>
          </div>
          
        </SwiperSlide>
      )})}
    </Swiper>
    </section>
  )
}

export default Trending