import { ReactElement, ReactNode } from 'react'
import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
    //fallback: any
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {

    const getLayout = Component.getLayout ?? ((page: ReactNode) => page)

    return (
        <SessionProvider session={pageProps.session}>
            {getLayout(<Component {...pageProps} />)}
        </SessionProvider>
    )
}
