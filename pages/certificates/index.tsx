import React, { ReactElement } from "react"
import Layout from "@components/layout"
import { unstable_getServerSession } from "next-auth/next"
import { GetServerSideProps } from "next"
import Link from "next/link"
import { authOptions } from "../api/auth/[...nextauth]"
import { fetchWrapper } from "@utils/fetch-wrapper"
import CertificateTable from "@components/view/certificate/certificate.table"
import { ICertificateList } from "@models/certificate"
import { useSession } from "next-auth/react"

const limitIndex = 20
const pageIndex = 1


const Certificates = ({certificates, total}: ICertificateList) => {
    const session = useSession();

    const userProfile = session?.data?.user;

    return (
        <main className="flex-1 pb-8">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Certificate List</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the Certificate result including their lecture, student.
                        </p>
                    </div>
                    {
                        userProfile?.role === 'admin' && (
                            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                <Link href="/certificates/create" className="inline-flex items-center justify-center rounded-md border border-transparent bg-cyan-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:w-auto">
                                    Add Certificate
                                </Link>
                            </div>
                        )
                    }

                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <CertificateTable certificates={certificates} total={total}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    const accessToken = session?.accessToken || null
    const api = `/certificates?page=${pageIndex}&limit=${limitIndex}`

    //console.log('accessToken', accessToken)

    // Fetch data from external API
    const result = await fetchWrapper.fetchDataPagination({path: api, token: accessToken})

    // Pass data to the page via props
    return {props: {certificates: result.data, total: result.total}}
}

Certificates.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title="Certificates List">
            {page}
        </Layout>
    )
}

export default Certificates