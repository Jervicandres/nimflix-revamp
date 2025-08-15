export const getAnimeEpisodes = async (id: any) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const episodes = await fetch(API_URL + `/anime/${id}/episodes`).then(res => res.json()).then(({data}: any) => data.episodes);
   return episodes;
}