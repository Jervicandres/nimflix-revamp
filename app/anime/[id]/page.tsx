
import Animeinfo from '@components/anime-page/Animeinfo'
import { ANIME, IAnimeEpisode, IAnimeResult, META } from '@consumet/extensions';
import '@styles/anime-page.css'
import { Suspense } from 'react';
import Loading from './loading';

interface IParams{
   params: {
      id:string
   }
}

const anilist = new META.Anilist();
export const generateMetadata = async ({params}: IParams) => {
   try {
      const animeTitle = await anilist.fetchAnilistInfoById(params?.id).then((data:any) => data?.title.english || data.title.romaji || data.title.userPreferred)
         
      return {title: animeTitle}
   } catch (error) {
      return {title: error}
   }
}

const AnimePage = async ({params}: IParams) => {
   const animeInfo = await anilist.fetchAnilistInfoById(params?.id);
   const animeEpisodes = await anilist.fetchEpisodesListById(params?.id,false,true);
   
   return (<Animeinfo anime={animeInfo} episodes={animeEpisodes}/>)
}

export default AnimePage