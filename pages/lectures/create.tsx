import React, { ReactElement } from "react"
import Layout from "@components/layout"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"
import { fetchWrapper } from "@utils/fetch-wrapper"
import { GetServerSideProps } from "next"
import LectureForm from "@components/view/lectures/lecture.form";
import { ITeacher } from "@models/lecture";

type Props = {
    teachers: ITeacher[]
}

interface IStatus {
    resultStatus: boolean
}

const Create = ({teachers}: Props) => {
    return (
        <main className="flex-1 pb-8">
            <div className="px-4 sm:px-6 lg:px-8">
                <LectureForm teachers={teachers}/>
            </div>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    const accessToken = session?.accessToken || null
    const api = `/teachers`

    // Fetch data from external API
    const teachers = await fetchWrapper.fetchDataPagination({path: api, token: accessToken})
    //const roles = {data : []}
    // Pass data to the page via props
    return {props: {teachers: teachers.data}}
}


Create.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title="Create Lecture">
            {page}
        </Layout>
    )
}


export default Create