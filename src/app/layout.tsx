import './globals.css'
import { Inter, Roboto_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import Menu from './Menu'
import Footer from './footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})


const sohogothicpro = localFont({
  variable: '--font-sohogothicpro',
  src: [
    {
      path: './fonts/SohoGothicPro-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/SohoGothicPro-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/SohoGothicPro-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/SohoGothicPro-MediumIt.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/SohoGothicPro-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/SohoGothicPro-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
})


export const metadata = {
  title: 'Feel the Porsche',
  description: 'Feel the Porsche',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sohogothicpro.variable}`}>
      <body>
        <nav>
          <Menu />
        </nav>
        {children}
        <div className='bg-[#0C1B26] pb-[50px]'>
          <Footer />
        </div>
      </body>
    </html>
  )
}
