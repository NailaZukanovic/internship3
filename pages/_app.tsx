import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import CityConxetProvider from './context/cityContext'

export default function App({ Component, pageProps }: AppProps) {
  return 
    <CityConxetProvider>
      <Component {...pageProps} />
    </CityConxetProvider>
}
