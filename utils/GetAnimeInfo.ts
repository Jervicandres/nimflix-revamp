
export const getAnimeInfo = async (id: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
   try {
      const animeInfo = await fetch(`${API_URL}/anime/${id}`).then(res => res.json()).then(({data}: any) => data);
      return animeInfo;
   } catch (error) {
      console.error("Error fetching anime info:", error);
      return null;
   }
}