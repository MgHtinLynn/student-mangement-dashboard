import React, { ReactElement } from "react"
import Layout from "@components/layout"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"
import { fetchWrapper } from "@utils/fetch-wrapper"
import UserForm from "@components/view/users/user.form"
import { GetServerSideProps } from "next"

type Props = {
    roles: {
        id: number
        name?: string
        created_at?: string
        updated_at?: string
        deleted_at?: string
    }[]
}

interface IStatus {
    resultStatus: boolean
}

const Create = ({roles}: Props) => {
    return (
        <main className="flex-1 pb-8">
            <div className="px-4 sm:px-6 lg:px-8">
                <UserForm roles={roles}/>
            </div>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    const accessToken = session?.accessToken || null
    const api = `/roles`

    // Fetch data from external API
    //const roles = await FetchRequest(api, accessToken).then(res => res)
    const roles = await fetchWrapper.fetchDataPagination({path: api, token: accessToken})
    //const roles = {data : []}
    // Pass data to the page via props
    return {props: {roles: roles.data}}
}


Create.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title="Create User">
            {page}
        </Layout>
    )
}


export default Create