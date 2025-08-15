import { ReactNode, Suspense } from 'react'
import '@styles/globals.css'
import Navbar from '@components/Navbar';
import { Metadata } from 'next';
import Footer from '@components/Footer';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

interface IChildren {
  children: ReactNode;
}
export const metadata: Metadata = {
  title:{
    default: "NimFlix",
    template: "%s | NimFlix"
  },
  description: 'Watch Anime'
}

export const revalidate = 60

const RootLayout = ({children}: Readonly<IChildren>) => {
  return (
    <html lang='en'>
      <body>
          <Navbar/>
        <main className='app-container min-h-screen'>
            {children}
        </main>
          <Footer/>
      </body>
    </html>
  )
}

export default RootLayout
