
export const getAnimeInfo = async (id: string) => {
    const animeInfo = await fetch(process.env.API_URL + `/meta/anilist/info/${id}`).then(res => res.json());
    return animeInfo;
 }