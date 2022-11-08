import React, { ReactElement } from "react"
import Layout from "@components/layout"
import { GetServerSideProps } from "next"
import { unstable_getServerSession } from "next-auth/next"
import { fetchWrapper } from "@utils/fetch-wrapper"
import { authOptions } from "../../api/auth/[...nextauth]"
import { IExamResult, IStudent } from "@models/examResult"
import { ISubject } from "@models/subjects";
import ExamResultForm from "@components/view/exam-results/examResult.form";

interface Props {
    examResult: IExamResult
    id: number,
    students: IStudent[],
    subjects: ISubject[],
}

const Update = ({students, subjects, examResult}: Props) => {
    return (
        <main className="flex-1 pb-8">
            <div className="px-4 sm:px-6 lg:px-8">
                <ExamResultForm students={students} subjects={subjects} examResult={examResult}/>
            </div>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const params = context.params
    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    const accessToken = session?.accessToken || null
    const api = `/exam-results/` + params?.id
    const apiStudents = `/students`
    const apiSubjects = `/subjects`

    // Fetch data from external API
    const students = await fetchWrapper.fetchDataPagination({path: apiStudents, token: accessToken})
    const subjects = await fetchWrapper.fetchDataPagination({path: apiSubjects, token: accessToken})

    const examResult = await fetchWrapper.findById({path: api, token: accessToken})
    //console.log('data.user', user.data)
    // Pass data to the page via props
    return {props: {students: students.data,subjects: subjects.data, examResult: examResult.data}}
}


Update.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title="Update Exam Results">
            {page}
        </Layout>
    )
}


export default Update