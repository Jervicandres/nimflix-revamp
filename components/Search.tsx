'use client'

import searchIcon from '@public/assets/icons/search.svg'
import Image from 'next/image';
import { useEffect, useRef, useState } from "react";
import { Input } from './ui/input';
import { IAnimeInfo } from './props/AnimeProps';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { META } from '@consumet/extensions';

const Search = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<any>();
  const [searchResult, setSearchResult] = useState<any>([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const searchBox = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const searchAnime = async (query: string) => {
    const data = await fetch(`${API_URL}/search?q=${query}`).then(res => res.json()).then(({data}) => data?.animes);
    setSearchResult(data);
  }

  const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
      if(e.key === 'Enter'){
        router.push(`/search?query=${searchText}`)
      }
  }

  const handleSearchDropdown = (e:any) => {
    if(searchBox.current?.contains(e.target)){
      setOpenDropdown(true);
    }
    else{
      setOpenDropdown(false);
    }
  }

  useEffect(() => {
    const queryParams = searchParams.get('query') ?? "";
    setSearchText(queryParams)
    document.body.addEventListener('click', handleSearchDropdown)
    return () => document.body.removeEventListener('click', handleSearchDropdown)
  },[])

  const handleChanged = (e: any) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(setTimeout(() => {
      searchAnime(e.target.value);
    }, 500))
  }

  return (
    <div ref={searchBox} className="flex items-stretch rounded-sm relative">
      <Input 
        type="text" 
        maxLength={128} 
        onKeyDown={e => handleKeyPress(e)} 
        onClick={e => searchText && handleChanged(e)} 
        onChange={e => handleChanged(e)} 
        value={searchText} 
        className={`${openDropdown ? 'w-80' : 'w-48'} duration-300 rounded-full h-[40px] border-r-0 rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0`} placeholder="Search"/>
      <div className="flex rounded-r-full border-l-0 duration-150 border  border-opacity-50 items-center px-3 text-xs cursor-pointer" onClick={() => searchText && router.push(`/search?query=${searchText}`)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>
      {openDropdown &&
      <div className={`w-full flex flex-col items-start bg-zinc-900 duration-1000 min-h-10 z-20 absolute top-[40px] ${!searchText ? 'hidden' : ''}`}>
        {searchResult?.length > 0 ?
        <>
        {searchResult.slice(0,5).map((result:any) => {
            return <Link href={`/anime/${result.id}`} key={result.id} className='flex items-start gap-2 bg-zinc-950 h-24 w-full hover:bg-zinc-800 p-1'>
              <div className="relative min-w-16 h-full">
                <Image alt={result.title?.userPreferred} src={result.poster} fill sizes='100%' className='object-cover' />
              </div>
              <div className='flex flex-col py-1 text-sm'>
                <p className='font-semibold text-wrap truncate line-clamp-1'>{result.name} </p>
                <p className='text-xs opacity-70'>{result.jname}</p>
                <p className='text-xs'>{[result.type,result?.duration]?.join(' - ')}</p>
              </div>
            </Link>
        })} <Link href={`/search?query=${searchText}`} className='bg-zinc-950 border-t-2 w-full text-center hover:bg-zinc-800 p-1'>View all results.</Link>
        </> : <div className='bg-zinc-950 p-3 w-full'>No results found.</div>}
      </div>}
    </div>
  )
}

export default Search
