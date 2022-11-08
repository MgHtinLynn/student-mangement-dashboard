import React, { ReactElement } from "react"
import Layout from "@components/layout"
import { GetServerSideProps } from "next"
import { unstable_getServerSession } from "next-auth/next"
import { fetchWrapper } from "@utils/fetch-wrapper"
import { authOptions } from "../../api/auth/[...nextauth]"
import { IStudent } from "@models/examResult"
import TranscriptForm from "@components/view/transcript/transcript.form"
import { ILectures } from "@models/lecture"
import { ITranscript } from "@models/transcripts"

interface Props {
    transcript: ITranscript
    id: number,
    students: IStudent[],
    lectures: ILectures[],
}

const Update = ({students, lectures, transcript}: Props) => {
    return (
        <main className="flex-1 pb-8">
            <div className="px-4 sm:px-6 lg:px-8">
                <TranscriptForm students={students} lectures={lectures} transcript={transcript}/>
            </div>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const params = context.params
    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    const accessToken = session?.accessToken || null
    const api = `/transcripts/` + params?.id
    const apiStudents = `/students`
    const apiLectures = `/lectures`

    // Fetch data from external API
    const students = await fetchWrapper.fetchDataPagination({path: apiStudents, token: accessToken})
    const lectures = await fetchWrapper.fetchDataPagination({path: apiLectures, token: accessToken})

    const transcript = await fetchWrapper.findById({path: api, token: accessToken})
    //console.log('data.user', user.data)
    // Pass data to the page via props
    return {props: {students: students.data,lectures: lectures.data, transcript: transcript.data}}
}


Update.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title="Update Transcript">
            {page}
        </Layout>
    )
}


export default Update