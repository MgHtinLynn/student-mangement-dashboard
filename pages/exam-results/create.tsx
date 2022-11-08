import React, { ReactElement } from "react"
import Layout from "@components/layout"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"
import { fetchWrapper } from "@utils/fetch-wrapper"
import { GetServerSideProps } from "next"
import ExamResultForm from "@components/view/exam-results/examResult.form";
import { IStudent } from "@models/examResult"
import { ISubject } from "@models/subjects"

type Props = {
    students: IStudent[],
    subjects: ISubject[],
}

const Create = ({students, subjects}: Props) => {
    return (
        <main className="flex-1 pb-8">
            <div className="px-4 sm:px-6 lg:px-8">
                <ExamResultForm students={students} subjects={subjects}/>
            </div>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    const accessToken = session?.accessToken || null
    const api = `/students`
    const apiSubjects = `/subjects`

    // Fetch data from external API
    const students = await fetchWrapper.fetchDataPagination({path: api, token: accessToken})
    const subjects = await fetchWrapper.fetchDataPagination({path: apiSubjects, token: accessToken})
    //const roles = {data : []}
    // Pass data to the page via props
    return {props: {students: students.data, subjects: subjects.data}}
}


Create.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title="Create Exam Result">
            {page}
        </Layout>
    )
}


export default Create