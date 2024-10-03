import SearchResult from '@components/search-result/Searchresult';
import { NextRequest } from 'next/server';

const SearchPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  return (<SearchResult query={searchParams?.query}/>)
}

export default SearchPage