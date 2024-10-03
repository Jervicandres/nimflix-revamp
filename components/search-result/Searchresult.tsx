'use client'
import Animecard from '@components/Animecard';
import { IAnimeCard } from '@components/props/AnimeProps';
import { Skeleton } from '@components/ui/skeleton';
import { IAnimeResult, ISearch, META } from '@consumet/extensions';
import React, { useEffect, useState } from 'react'
import {useInView} from 'react-intersection-observer'

interface PropsType {
  query?: string | string[];
}


const SearchResult = ({query}: PropsType) => {
  const anilist = new META.Anilist();
  const [searchResults, setSearchResults] = useState<IAnimeResult[]>()
  const [hasNextPage, setHasNextPage] = useState<boolean>();
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true);
  const array = new Array(12).fill(null);
  const nextArray = new Array(6).fill(null);
  const {ref, inView} = useInView();

  useEffect(() => {
    const loadInitialResults = async () => {
      try{
        const data = await anilist.search(query as string,1,12);
        setSearchResults(data.results);
        setPage(1);
        setHasNextPage(data.hasNextPage || false);
      }
      catch(error){
        console.log(error);
      }
      finally{
        setLoading(false);
      }
    }
    setLoading(true);
    loadInitialResults();
  },[query])

  useEffect(() => {
    const loadNextResults = async () => {
      try{
        let pageNumber: number = page + 1;
        const data = await anilist.search(query as string,pageNumber,12);
        setPage(pageNumber);
        setHasNextPage(data.hasNextPage);
        setSearchResults(prevResults => {
          if(prevResults)
          return [...prevResults,...data.results]
        })
      }
      catch(error){
        console.log(error);
      }
    }
    
    if(inView && hasNextPage)
    loadNextResults();
  },[inView])

  if(loading){
    return (
      <section className='w-[90%] max-w-[1440px] mx-auto my-5'>
        <section className='anime-results-grid'>
          <Skeleton className='text-xl animate-pulse min-w-full h-8 col-span-full font-bold mb-2 border-l-4  pl-2'></Skeleton>
          {array.map((el,i) => {
            return <Skeleton key={i} className="animate-pulse w-full min-h-24 anime-card p-2 ">
                    <Skeleton className="w-full pt-[140%] animate-pulse object-cover rounded-sm"/>
                    <Skeleton className="animate-pulse rounded-full text-xs opacity-70 text-wrap line-clamp-3 w-full h-3"/>
                </Skeleton>
          })
          }
        </section>
      </section>
    )
  }
  else if(searchResults && !loading){
    return (
      <section className='w-[90%] max-w-[1440px] mx-auto my-5'>
        <div className='anime-results-grid'>
          <h2 className='text-xl col-span-full font-bold mb-2 border-l-4 border-l-yellow pl-2'>Results for &apos;{query}&apos;</h2>
          {searchResults?.map((result) => {
              return <Animecard key={result.id} anime={result}/>
            })}
          {(hasNextPage) ? nextArray.map((el,i) => {
            return <Skeleton key={i} className="animate-pulse w-full min-h-24 anime-card p-2 ">
                      <Skeleton className="w-full pt-[140%] animate-pulse object-cover rounded-sm"/>
                      <Skeleton className="animate-pulse rounded-full text-xs opacity-70 text-wrap line-clamp-3 w-full h-3"/>
                  </Skeleton>
          }) : <div className='col-span-full'></div>}
          <div ref={ref} className=''>
          </div>
        </div>
        
      </section>
    )
  }
  else{
    return (
      <div className='anime-results-grid'>
        <h2 className='text-xl col-span-full font-bold mb-2 border-l-4 border-l-yellow pl-2'>No results found for &apos;{query}&apos;</h2>
      </div>
    )
  }
}

export default SearchResult