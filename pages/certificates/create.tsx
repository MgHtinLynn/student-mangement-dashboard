import React, { ReactElement } from "react"
import Layout from "@components/layout"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"
import { fetchWrapper } from "@utils/fetch-wrapper"
import { GetServerSideProps } from "next"
import { IStudent } from "@models/examResult"
import { ILectures } from "@models/lecture";
import CertificateForm from "@components/view/certificate/certificate.form";

type Props = {
    students: IStudent[],
    lectures: ILectures[],
}

const Create = ({students, lectures}: Props) => {
    return (
        <main className="flex-1 pb-8">
            <div className="px-4 sm:px-6 lg:px-8">
                <CertificateForm students={students} lectures={lectures}/>
            </div>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    const accessToken = session?.accessToken || null
    const api = `/students`
    const apiLectures = `/lectures`

    // Fetch data from external API
    const students = await fetchWrapper.fetchDataPagination({path: api, token: accessToken})
    const lectures = await fetchWrapper.fetchDataPagination({path: apiLectures, token: accessToken})
    //const roles = {data : []}
    // Pass data to the page via props
    return {props: {students: students.data, lectures: lectures.data}}
}


Create.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title="Create Exam Result">
            {page}
        </Layout>
    )
}


export default Create