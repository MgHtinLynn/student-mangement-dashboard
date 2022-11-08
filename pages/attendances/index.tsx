import React, { ReactElement } from "react"
import Layout from "../../components/layout"
import { unstable_getServerSession } from "next-auth/next"
import { GetServerSideProps } from "next"
import Link from "next/link"
import UserTable from "@components/view/users/user.table"
import { authOptions } from "../api/auth/[...nextauth]"
import { fetchWrapper } from "@utils/fetch-wrapper"
import { useSession } from "next-auth/react";
import { IAttendanceList } from "@models/attendance";
import AttendanceTable from "@components/view/attendances/attendance.table";

const limitIndex = 20
const pageIndex = 1


const Attendances = ({attendances, total}: IAttendanceList) => {
    const session = useSession();

    const userProfile = session?.data?.user;
    return (
        <main className="flex-1 pb-8">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Attendance List</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the attendance in your account including their name, title, email and subject.
                        </p>
                    </div>

                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <AttendanceTable attendances={attendances} total={total}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    const accessToken = session?.accessToken || null
    const api = `/attendances?page=${pageIndex}&limit=${limitIndex}`

    //console.log('accessToken', accessToken)

    // Fetch data from external API
    const attendances = await fetchWrapper.fetchDataPagination({path: api, token: accessToken})

    // Pass data to the page via props
    return {props: {attendances: attendances.data, total: attendances.total}}
}

Attendances.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title="Attendances List">
            {page}
        </Layout>
    )
}

export default Attendances