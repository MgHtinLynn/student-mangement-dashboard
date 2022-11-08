import React, { ReactElement } from "react"
import Layout from "@components/layout"
import { GetServerSideProps } from "next"
import { unstable_getServerSession } from "next-auth/next"
import { fetchWrapper } from "@utils/fetch-wrapper"
import { authOptions } from "../../api/auth/[...nextauth]"
import { IStudent } from "@models/examResult"
import CertificateForm from "@components/view/certificate/certificate.form";
import { ILectures } from "@models/lecture";
import { ICertificate } from "@models/certificate";

interface Props {
    certificate: ICertificate
    id: number,
    students: IStudent[],
    lectures: ILectures[],
}

const Update = ({students, lectures, certificate}: Props) => {
    return (
        <main className="flex-1 pb-8">
            <div className="px-4 sm:px-6 lg:px-8">
                <CertificateForm students={students} lectures={lectures} certificate={certificate}/>
            </div>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const params = context.params
    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    const accessToken = session?.accessToken || null
    const api = `/certificates/` + params?.id
    const apiStudents = `/students`
    const apiLectures = `/lectures`

    // Fetch data from external API
    const students = await fetchWrapper.fetchDataPagination({path: apiStudents, token: accessToken})
    const lectures = await fetchWrapper.fetchDataPagination({path: apiLectures, token: accessToken})

    const certificate = await fetchWrapper.findById({path: api, token: accessToken})
    //console.log('data.user', user.data)
    // Pass data to the page via props
    return {props: {students: students.data,lectures: lectures.data, certificate: certificate.data}}
}


Update.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title="Update Certificate">
            {page}
        </Layout>
    )
}


export default Update