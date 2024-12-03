import Animedetails from '@components/watch-anime/Animedetails';
import Watchanime from '@components/watch-anime/Watchanime';
import { IAnimeEpisode, IVideo, META } from '@consumet/extensions';
import { getAnimeInfo } from '@utils/GetAnimeInfo';

interface IParams {
   params: {id: string}
}

const anilist = new META.Anilist();

export const generateMetadata = async ({params}: IParams) => {
   const id = params?.id;
   try {
      const animeTitle = await anilist.fetchAnilistInfoById(id).then((data:any) => data?.title.english || data.title.romaji || data.title.userPreferred)
         
      return {title: 'Now Watching: ' + animeTitle}
   } catch (error) {
      return {title: error}
   }
}

const getEpisodeSource = async (episodeId: string | string[] | undefined) => {
   try {
      let url = process.env.PROVIDER === 'zoro' ? 
      process.env.API_URL + `/anime/zoro/watch/${episodeId}&server=vidcloud` 
      : process.env.API_URL + `/meta/anilist/watch/${episodeId}`
      /* const response = await fetch(url,{
         headers: {
            'Access-Control-Allow-Headers': '*'
         }
      }); */
      const response = await fetch(url);
      const data = await response.json();
      
      return data.sources.filter((source: IVideo) => source.quality === 'default')[0].url
   } catch (error) {
      return error
   }
}


const WatchAnimePage = async ({
   params, 
   searchParams}: {
      params: {id: string},
      searchParams: {[key: string]: string | string[] | undefined}}) => {
   const id: string = params?.id;
   const episodeSource = await getEpisodeSource(searchParams.ep);
   const animeInfo = await getAnimeInfo(id);
   const episodeList =  animeInfo.episodes;
   const currentEpisode = episodeList?.filter((episode: IAnimeEpisode) => episode.id === searchParams.ep)[0];
   
   return (
      <section className='w-full lg:w-3/4 lg:mx-auto' suppressHydrationWarning>
            <Watchanime episodeSource={episodeSource}/>
            <section className='anime-section mt-5'>
               <Animedetails id={id} animeInfo={animeInfo} episodeList={episodeList} currentEpisode={currentEpisode}/>
            </section>
      </section>
      )
   }
   
   export default WatchAnimePage