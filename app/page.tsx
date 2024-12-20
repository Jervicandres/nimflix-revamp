import Animelist from '@components/Animelist'
import Trending from '@components/Trending';
import { ANIME, IAnimeResult, META } from '@consumet/extensions';
import { Suspense } from 'react';
import Loading from './loading';
import { IRecentWatch } from '@components/props/AnimeProps';
import Animecard from '@components/Animecard';
import Recentwatchlist from '@components/Recentwatchlist';

const anilist = new META.Anilist(); 
const gogoanime = new ANIME.Gogoanime();

const getPopularAnime = async () => {
  const data = await anilist.fetchPopularAnime(1,12);
  return data.results;
}

const getTrendingAnime = async () => {
  const data = await anilist.fetchTrendingAnime(1,10);
  return data.results;
}

const getRecentEpisodes = async () => {
  const data = await anilist.fetchRecentEpisodes(undefined,1,12);
  return data.results;
}

const getRandomAnimes = async () => {
  let data: IAnimeResult[] = [];
  for(let i = 0; i < 6; i++){
    const anime = await anilist.fetchRandomAnime();
    data.push(anime);
  }
  return data;
}

const Homepage = async () => {
  const popularAnime = await getPopularAnime();
  const trendingAnime = await getTrendingAnime();
  const recentEpisodes = await getRecentEpisodes();
  
  return (
  <Suspense fallback={<Loading />}>
    <Trending trendingAnime={trendingAnime} />
    <Recentwatchlist />
    <Animelist animeList={recentEpisodes} headerText={'New Episodes'}/>
    <Animelist animeList={popularAnime} headerText={'Popular Anime'}/>
  </Suspense>)
}

export default Homepage