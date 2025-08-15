"use client";
import React from 'react'

const page = () => {
    const anilist = "http://localhost:4000/api/v2/hianime/home";
    const getPopularAnime = async () => {
        const data = await fetch(anilist).then(res => res.json()).then((data: any) => data);
        console.log(data);
        return data;
    }
    getPopularAnime();
  return (
    <div>page</div>
  )
}

export default page