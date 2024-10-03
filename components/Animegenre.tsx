import React from 'react'

interface PropsType {
   genres: string[],
   color: string
}

const Animegenre = ({genres, color}: PropsType) => {

   return (<div className='flex gap-1'>
   {genres?.map((genre, index) => {
      return(<div key={index} className={`${!color ? 'bg-sage' : ''} text-light p-2 text-xs rounded-sm`} style={{backgroundColor: `${color}80`}}>
         {genre}
      </div>)
   } )}
   </div>)
}

export default Animegenre