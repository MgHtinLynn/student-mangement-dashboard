import { ReactElement } from 'react'
import { Header } from '@components/frontend/Header'
import { Hero } from '@components/frontend/Hero'
import { PrimaryFeatures } from '@components/frontend/PrimaryFeatures'
import { SecondaryFeatures } from '@components/frontend/SecondaryFeatures'
import { CallToAction } from '@components/frontend/CallToAction'
import { Testimonials } from '@components/frontend/Testimonials'
import { Pricing } from '@components/frontend/Pricing'
import { Faqs } from '@components/frontend/Faqs'
import { Footer } from '@components/frontend/Footer'
import Head from "next/head"
import FrontendLayout from "@components/frontend.layout"


const Home = () =>  {

    return (
        <>
            <Head>
                <title>TaxPal - Accounting made simple for small businesses</title>
                <meta
                    name="description"
                    content="Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited."
                />
            </Head>
            <Header />
            <main>
                <Hero />
                <PrimaryFeatures />
                <SecondaryFeatures />
                <CallToAction />
                <Testimonials />
                <Pricing />
                <Faqs />
            </main>
            <Footer />
        </>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <FrontendLayout title="Website">
            {page}
        </FrontendLayout>
    )
}

export default Home
