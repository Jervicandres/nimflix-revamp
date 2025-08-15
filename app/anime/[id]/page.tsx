
import Animeinfo from '@components/anime-page/Animeinfo'
import { ANIME, IAnimeEpisode, IAnimeInfo, IAnimeResult, META } from '@consumet/extensions';
import '@styles/anime-page.css'
import { getAnimeEpisodes } from '@utils/GetAnimeEpisodes';
import { getAnimeInfo } from '@utils/GetAnimeInfo';

interface IParams{
   params: {
      id:string
   }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const generateMetadata = async ({params}: IParams) => {
   try {
      const animeTitle = await fetch(`${API_URL}/anime/${params.id}`).then(res => res.json()).then(({data}: any) => data.anime.info.name);
         
      return {title: animeTitle}
   } catch (error) {
      return {title: error}
   }
}



const AnimePage = async ({params}: IParams) => {
   const animeInfo = await getAnimeInfo(params?.id);
   const animeEpisodes = await getAnimeEpisodes(params?.id);
   return (<Animeinfo animeInfo={animeInfo} episodes={animeEpisodes}/>)
}

export default AnimePage