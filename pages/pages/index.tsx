import React, { ReactElement } from 'react'
import Layout from "../../components/layout";

const Page = () => {

    return (
        <>
            <main>
                Page
            </main>
        </>
    )
}

Page.getLayout = function getLayout(page : ReactElement) {
    return (
        <Layout title="Login">
            {page}
        </Layout>
    )
}

export default Page