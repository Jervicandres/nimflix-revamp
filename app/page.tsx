import Animelist from '@components/Animelist'
import Trending from '@components/Trending';
import { Suspense } from 'react';
import Loading from './loading';
import Recentwatchlist from '@components/Recentwatchlist';

const anilist = process.env.API_URL || "http://localhost:4000/api/v2/hianime"; 

const getHomepageData = async () => {
  const data = await fetch(anilist+"/home").then(res => res.json()).then(({data}: any) => data);
  return data;
}

const getPopularAnime = async () => {
  const data = await fetch(anilist+"/category/recently-updated?page=1").then(res => res.json()).then(({data}: any) => data);
  
  return data;
}

const getSpotlightAnime = async () => {
  const animes = await fetch(anilist+"/home").then(res => res.json()).then(({data}: any) => data.spotlightAnimes);
  return animes;
}


const Homepage = async () => {
  const popularAnime = await getHomepageData().then(data => data.topAiringAnimes);
  const trendingAnime = await getHomepageData().then(data => data.spotlightAnimes);
  const recentEpisodes = await getHomepageData().then(data => data.latestEpisodeAnimes);
  
  return (
  <Suspense fallback={<Loading />}>
    <Trending trendingAnime={trendingAnime} />
    <Recentwatchlist />
    <Animelist animeList={recentEpisodes} headerText={'New Episodes'}/>
    <Animelist animeList={popularAnime.slice(0,12)} headerText={'Top Airing'}/>
  </Suspense>)
}

export default Homepage