import { ReactElement } from 'react'
import { Header } from '@components/frontend/Header'
import { Hero } from '@components/frontend/Hero'
import { PrimaryFeatures } from '@components/frontend/PrimaryFeatures'
import { CallToAction } from '@components/frontend/CallToAction'
import { Testimonials } from '@components/frontend/Testimonials'
import { Pricing } from '@components/frontend/Pricing'
import { Footer } from '@components/frontend/Footer'
import Head from "next/head"
import FrontendLayout from "@components/frontend.layout"
import { ContactUs } from "@components/frontend/ContactUs"


const Home = () =>  {

    return (
        <>
            <Head>
                <title>Genius - Student Management System made simple for small businesses</title>
                <meta
                    name="description"
                    content="Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited."
                />
            </Head>
            <Header />
            <main>
                <Hero />
                <PrimaryFeatures />
                <CallToAction />
                <Testimonials />
                <Pricing />
                <ContactUs/>
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
