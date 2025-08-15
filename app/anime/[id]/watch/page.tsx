import Animedetails from '@components/watch-anime/Animedetails';
import Watchanime from '@components/watch-anime/Watchanime';
import { IAnimeEpisode, IVideo, META } from '@consumet/extensions';
import { getAnimeEpisodes } from '@utils/GetAnimeEpisodes';
import { getAnimeInfo } from '@utils/GetAnimeInfo';

interface IParams {
   params: {id: string}
}

const anilist = new META.Anilist();

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const generateMetadata = async ({params}: IParams) => {
   try {
      const animeTitle = await fetch(`${API_URL}/anime/${params.id}`).then(res => res.json()).then(({data}: any) => data.anime.info.name);
         
      return {title: animeTitle}
   } catch (error) {
      return {title: error}
   }
}

const getEpisodeSource = async (episodeId: any) => {
   const episodeSource = await fetch(`${API_URL}/episode/sources?animeEpisodeId=${episodeId}&server=hd-2&category=dub`).then(res => res.json()).then(({data}: any) => data);
   return episodeSource;
}

const WatchAnimePage = async ({
   params, 
   searchParams}: {
      params: {id: string},
      searchParams: {[key: string]: string | string[] | undefined}}) => {
   const id: string = params?.id;
   const episodeSource = await getEpisodeSource(searchParams.ep);
   const animeInfo = await getAnimeInfo(id);
   const episodeList =  await getAnimeEpisodes(id);
   const currentEpisode = episodeList?.filter((episode: any) => episode.episodeId === searchParams.ep)[0];
   
   return (
      <section className='w-full lg:w-3/4 lg:mx-auto' suppressHydrationWarning>
            <Watchanime episodeSource={episodeSource}/>
            <section className='anime-section mt-5'>
               {<Animedetails id={id} animeInfo={animeInfo} episodeList={episodeList} currentEpisode={currentEpisode}/>}
            </section>
      </section>
      )
   }
   
   export default WatchAnimePage