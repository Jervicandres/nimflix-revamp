'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState, } from 'react'
import videojs from 'video.js'
import { Skeleton } from '@components/ui/skeleton'
import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';
import { Menu, MediaPlayer, MediaPlayerInstance, MediaProvider, useMediaStore, useVideoQualityOptions, QualitySlider, Spinner } from '@vidstack/react';
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';
import { ANIME, IAnimeEpisode, IVideo, META, } from '@consumet/extensions'

/* 
         let url = process.env.PROVIDER === 'zoro' ? 
         process.env.API_URL + `/anime/zoro/watch/${episodeId}&server=vidcloud` 
         : process.env.API_URL + `/meta/anilist/watch/${episodeId}`
         const response = await fetch(url);
         const data = await response.json(); 
         
         sources.filter((source: IAnimeEpisode) => source.quality == 'default')[0].url
         */

const Watchanime = ({episodeSource}: {episodeSource: string}) => {
   const [loading, setLoading] = useState(true)
   const gogoanime = new ANIME.Gogoanime('anitaku.bz');
   useEffect(() => {
      episodeSource && setLoading(false);
   }, [episodeSource])

   if(loading)
   return <Skeleton className='w-full mt-5 h-[80vh]'>
   </Skeleton>
   return(<section className='w-full mt-5'>
      <div className='relative' >
      {episodeSource && 
      <MediaPlayer title="Sprite Fight" src={"https://gogoanime-and-hianime-proxy.vercel.app/hls-proxy?url="+episodeSource}>
         <MediaProvider />
         <PlyrLayout icons={plyrLayoutIcons} />
      </MediaPlayer>}
      </div>
   </section>)

}

export default Watchanime