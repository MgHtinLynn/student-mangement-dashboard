import React, { ReactElement } from "react"
import Layout from "@components/layout"
import { GetServerSideProps } from "next"
import { unstable_getServerSession } from "next-auth/next"
import { fetchWrapper } from "@utils/fetch-wrapper"
import { authOptions } from "../../api/auth/[...nextauth]"
import { ISubjects, ITeacher } from "@models/subjects"
import SubjectForm from "@components/view/subjects/subject.form"
import { ILectures } from "@models/lecture"

interface Props {
    subject: ISubjects
    id: number,
    teachers: ITeacher[]
    lectures: ILectures[]
}

const Update = ({teachers, lectures , subject}: Props) => {
    //console.log('subject', subject)
    return (
        <main className="flex-1 pb-8">
            <div className="px-4 sm:px-6 lg:px-8">
                <SubjectForm teachers={teachers} lectures={lectures} subject={subject}/>
            </div>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const params = context.params
    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    const accessToken = session?.accessToken || null
    const teacherApi = `/teachers`
    const lectureApi = `/lectures`
    const api = `/subjects/` + params?.id

    // Fetch data from external API
    const teachers = await fetchWrapper.fetchDataPagination({path: teacherApi, token: accessToken})
    const lectures = await fetchWrapper.fetchDataPagination({path: lectureApi, token: accessToken})
    const subject = await fetchWrapper.findById({path: api, token: accessToken})

    // console.log('subject api', subject.data)
    // Pass data to the page via props
    return {props: {teachers: teachers.data, subject: subject.data, lectures: lectures.data}}
}


Update.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title="Update User">
            {page}
        </Layout>
    )
}


export default Update