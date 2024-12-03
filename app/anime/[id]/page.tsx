
import Animeinfo from '@components/anime-page/Animeinfo'
import { ANIME, IAnimeEpisode, IAnimeInfo, IAnimeResult, META } from '@consumet/extensions';
import '@styles/anime-page.css'
import { Suspense } from 'react';
import Loading from './loading';

interface IParams{
   params: {
      id:string
   }
}

const anilist = new META.Anilist(undefined,undefined,undefined,"anitaku.bz");
const gogo = new ANIME.Gogoanime();
export const generateMetadata = async ({params}: IParams) => {
   try {
      const animeTitle = await anilist.fetchAnilistInfoById(params?.id).then((data:any) => data?.title.english || data.title.romaji || data.title.userPreferred)
         
      return {title: animeTitle}
   } catch (error) {
      return {title: error}
   }
}

const getAnimeInfo = async (id: string) => {
   const animeInfo = await fetch(process.env.API_URL + `/meta/anilist/info/${id}`).then(res => res.json());
   return animeInfo;
}

const AnimePage = async ({params}: IParams) => {
   const animeInfo = await getAnimeInfo(params?.id);
   const animeEpisodes = animeInfo.episodes;
   return (<Animeinfo anime={animeInfo} episodes={animeEpisodes}/>)
}

export default AnimePage