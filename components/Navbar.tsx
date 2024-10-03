import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '@public/assets/icons/favicon32.png'
import Search from '@components/Search'

const Navbar = () => {
  return (
    <section className='navbar'>
      <div className='flex items-center gap-4'>
        <Link href="/" className='flex items-center gap-1'>
          <Image 
          src={Logo}
          width={30}
          height={30}
          alt='NimFlix logo'
          />
          <h1 className='text-xl font-bold'>NimFlix</h1>
        </Link>
        <div className="nav-links">
          <Link href="/catalog">Anime Catalog</Link>
        </div>
      </div>
      <Search/>
    </section>
  )
}

export default Navbar