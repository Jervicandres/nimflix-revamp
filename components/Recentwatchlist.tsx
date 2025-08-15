'use client'

import React, { useEffect, useState } from 'react'
import { IRecentWatch } from './props/AnimeProps'
import Animecard from './Animecard'
import Link from 'next/link'
import Image from 'next/image'
import { ITitle } from '@consumet/extensions'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Recentwatchlist = () => {
    const [recentWatch, setRecentWatch] = useState<any[]>([]);
    useEffect(() => {
        const recentWatch: any[] = JSON.parse(window.localStorage.getItem("RECENT_WATCH") || "[]");
        if (recentWatch) {
            setRecentWatch(recentWatch);
        }
    },[]);

    if (recentWatch.length > 0) {
    return (
        <section className='w-[90%] max-w-[1440px] mx-auto my-5'>
            <div className='anime-results-grid'>
            <h2 className='text-xl col-span-full font-bold mb-2 border-l-4 border-l-yellow pl-2'>Recently Watched</h2>
            {recentWatch?.map((anime) => {
                return <Link href={`/anime/${anime.id}/watch?ep=${anime.episodeId}`} key={anime.id} className="anime-card">
                <div className="relative">
                <div className="anime-overview">
        
                </div>
                <div className="w-full pt-[140%] relative">
                    <Image 
                        src={anime.thumbnail ?? ''} 
                        alt={anime.name ?? ''}
                        fill
                        priority
                        sizes="100%"
                        className="object-cover"
                    />
                </div>
                </div>
                <div className="anime-title">
                <span 
                className="truncate overflow-x-scroll no-scrollbar" 
                >
                    {anime.title} 
                </span>
                </div>
                <span 
                className="truncate text-sm opacity-70" 
                >
                Episode {anime.episodeNumber}
                </span>
            </Link>
            })
            }
            </div>
        </section>)
    }
    
}

export default Recentwatchlist