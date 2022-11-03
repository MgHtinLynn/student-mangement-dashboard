import React, { ReactElement } from "react"
import Layout from "../../../components/layout"
import { GetServerSideProps } from "next"
import { unstable_getServerSession } from "next-auth/next"
import { fetchWrapper } from "@utils/fetch-wrapper"
import UserForm from "@components/view/users/user.form"
import { authOptions } from "../../api/auth/[...nextauth]"
import { IUser } from "@models/user"
import { PropsRole } from "@models/role"
import LectureForm from "@components/view/lectures/lecture.form";
import { ILecture, ITeacher } from "@models/lecture";

interface Props {
    lecture: ILecture
    id: number,
    teachers: ITeacher[]
}

const Update = ({teachers, lecture}: Props) => {
    return (
        <main className="flex-1 pb-8">
            <div className="px-4 sm:px-6 lg:px-8">
                <LectureForm teachers={teachers} lecture={lecture}/>
            </div>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const params = context.params
    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    const accessToken = session?.accessToken || null
    const api = `/teachers`
    const userApi = `/lectures/` + params?.id

    // Fetch data from external API
    const teachers = await fetchWrapper.fetchDataPagination({path: api, token: accessToken})
    const lecture = await fetchWrapper.findById({path: userApi, token: accessToken})
    //console.log('data.user', user.data)
    // Pass data to the page via props
    return {props: {teachers: teachers.data, lecture: lecture.data}}
}


Update.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title="Update User">
            {page}
        </Layout>
    )
}


export default Update