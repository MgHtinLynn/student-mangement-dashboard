import React, { ReactElement } from "react"
import Layout from "@components/layout"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"
import { fetchWrapper } from "@utils/fetch-wrapper"
import { GetServerSideProps } from "next"
import SubjectForm from "@components/view/subjects/subject.form";
import { ITeacher } from "@models/subjects";
import { ILectureList, ILectures } from "@models/lecture";

type Props = {
    teachers: ITeacher[],
    lectures: ILectures[]
}

interface IStatus {
    resultStatus: boolean
}

const Create = ({teachers, lectures}: Props) => {
    return (
        <main className="flex-1 pb-8">
            <div className="px-4 sm:px-6 lg:px-8">
                <SubjectForm teachers={teachers} lectures={lectures}/>
            </div>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    const accessToken = session?.accessToken || null
    const api = `/teachers`
    const LectureApi = `/lectures`

    // Fetch data from external API
    const teachers = await fetchWrapper.fetchDataPagination({path: api, token: accessToken})

    const lectures = await fetchWrapper.fetchDataPagination({path: LectureApi, token: accessToken})
    //const roles = {data : []}
    // Pass data to the page via props
    return {props: {teachers: teachers.data, lectures: lectures.data}}
}


Create.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title="Create Subject">
            {page}
        </Layout>
    )
}


export default Create