export interface IAnimeResults {
  currentPage: number,
  hasNextPage: boolean,
  results: IAnimeCard[]
  }

export interface IAnimeCard {
    id: string,
    title: {romaji: string, english: string, native: string, userPreferred: string},
    description: string,
    image: string,
    type: string,
    rating: number,
    releaseDate: string,
    endDate: {year: number, month: number, day: number,  },
    status: string,
    color: string
}

export interface IAnimeInfo extends IAnimeCard{
    synonyms: string[],
    subOrDub: string,
    totalEpisodes: number,
    genres: string[],
    cover: string,
    startDate: {year: number, month: number, day: number},
    episodes: EpisodeProps[]
    relations: RelationsProps[]
}

/* Props interface */
export interface EpisodeProps {
  id: string,
  title: string,
  number: number,
  image: string,
  airDate: Date,
  description: string,
}

export interface RelationsProps {
  color: string,
  cover: string,
  id: string,
  image: string,
  rating: number,
  relationType: string,
  status: string,
  title: {romaji: string, english: string, native: string, userPreferred: string},
  type: string
  episodes: number
}


