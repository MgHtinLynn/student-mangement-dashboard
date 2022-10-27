import React, { ReactElement } from "react"
import Layout from "../../components/layout"
import { unstable_getServerSession } from "next-auth/next"
import { GetServerSideProps } from "next"
import RoleTable from "@components/view/roles/role.table"
import { authOptions } from "../api/auth/[...nextauth]"
import { fetchWrapper } from "@utils/fetch-wrapper"

type Props = {
    total: number,
    roles: {
        id: number
        name?: string
        created_at?: string
        updated_at?: string
        deleted_at?: string
    }[]
}


const Users = ({roles, total}: Props) => {
    
    return (
        <main className="flex-1 pb-8">
            <div className="px-4 sm:px-6 lg:px-8">

                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <RoleTable roles={roles} total={total}/>
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
    const accessToken = session?.accessToken || null
    const api = `/roles`

    // Fetch data from external API
    //const roles = await FetchRequest(api, accessToken).then(res => res)
    const roles = await fetchWrapper.fetchDataPagination({path: api, token: accessToken})

    // Pass data to the page via props
    return {props: { roles : roles.data, total: roles.total}}
}

Users.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title="Role List">
            {page}
        </Layout>
    )
}

export default Users