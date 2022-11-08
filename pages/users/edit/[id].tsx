import React, { ReactElement } from "react"
import Layout from "@components/layout"
import { GetServerSideProps } from "next"
import { unstable_getServerSession } from "next-auth/next"
import { fetchWrapper } from "@utils/fetch-wrapper"
import UserForm from "@components/view/users/user.form"
import { authOptions } from "../../api/auth/[...nextauth]"
import { IUser } from "@models/user"
import { PropsRole } from "@models/role"

interface Props {
    roles: PropsRole[]
    id: number,
    user: IUser
}

const Update = ({roles, user}: Props) => {
    return (
        <main className="flex-1 pb-8">
            <div className="px-4 sm:px-6 lg:px-8">
                <UserForm roles={roles} user={user}/>
            </div>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const params = context.params
    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    const accessToken = session?.accessToken || null
    const api = `/roles`
    const userApi = `/users/` + params?.id

    // Fetch data from external API
    const roles = await fetchWrapper.fetchDataPagination({path: api, token: accessToken})
    const user = await fetchWrapper.findById({path: userApi, token: accessToken})
    //console.log('data.user', user.data)
    // Pass data to the page via props
    return {props: {roles: roles.data, user: user.data}}
}


Update.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title="Update User">
            {page}
        </Layout>
    )
}


export default Update