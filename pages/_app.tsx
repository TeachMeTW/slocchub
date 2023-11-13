import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app'

import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/globals.css';

export default function App({ 
  Component, 
  pageProps: {
    session,
    ...pageProps
  }
}: AppProps) {
  return (
    <SessionProvider session={session}>
        <Component {...pageProps} />
    </SessionProvider>
  )
}
