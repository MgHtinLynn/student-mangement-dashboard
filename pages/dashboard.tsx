import { ReactElement } from 'react'
import { ScaleIcon, UserGroupIcon, UsersIcon, XCircleIcon } from '@heroicons/react/24/outline'
import {
    CheckCircleIcon,
    BuildingOfficeIcon,
} from '@heroicons/react/20/solid'
import Layout from "@components/layout"
import { GetServerSideProps } from "next"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import Image from 'next/image'
import { fetchWrapper } from "@utils/fetch-wrapper"
import { IUser } from "@models/user"
import { IAttendances } from "@models/attendance"
import AttendanceTable from "@components/view/attendances/attendance.table"


const transactions = [
    {
        id: 1,
        name: 'Payment to Molly Sanders',
        href: '#',
        amount: '$20,000',
        currency: 'USD',
        status: 'success',
        date: 'July 11, 2020',
        datetime: '2020-07-11',
    },
    // More transactions...
]

interface propStatusStyle {
    [key: string]: string;
}

const statusStyles: propStatusStyle = {
    success: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-gray-100 text-gray-800',
}

interface propDashboard {
    total: number,
    activeCount: number,
    attendanceTotal: number,
    user: IUser,
    attendances: IAttendances[]
}

export default function Dashboard({total, activeCount, attendanceTotal, attendances, user}: propDashboard) {

    const cards = [
        {name: 'Active User', href: '/users', icon: UserGroupIcon, amount: activeCount},
        {name: 'Total User', href: '/users', icon: UsersIcon, amount: total},
        {name: 'Today Attendance', href: '/attendances', icon: ScaleIcon, amount: attendanceTotal},
        // More items...
    ]

    return (
        <>
            <main className="flex-1 pb-8">
                {/* Page header */}
                <div className="bg-white shadow">
                    <div className="px-4 sm:px-6 lg:mx-auto lg:px-8">
                        <div
                            className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                            <div className="flex-1 min-w-0">
                                {/* Profile */}
                                <div className="flex items-center">
                                    <div>
                                        <div className="flex items-center">
                                            <Image
                                                width="50"
                                                height="50"
                                                className="h-16 w-16 rounded-full sm:hidden"
                                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                                                alt=""
                                            />
                                            <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                                                Good morning, {user.name}
                                            </h1>
                                        </div>
                                        <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                                            <dt className="sr-only">Company</dt>
                                            <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                                                <BuildingOfficeIcon
                                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                                Duke street studio
                                            </dd>
                                            <dt className="sr-only">Account status</dt>
                                            {
                                                user.active ? (
                                                    <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                                                        <CheckCircleIcon
                                                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                                            aria-hidden="true"
                                                        />
                                                        Verified account
                                                    </dd>) : (
                                                    <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                                                        <XCircleIcon
                                                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-400"
                                                            aria-hidden="true"
                                                        />
                                                        Un-Verified account
                                                    </dd>)
                                            }

                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-lg leading-6 font-medium text-gray-900">Overview</h2>
                        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Card */}
                            {cards.map((card) => (
                                <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="p-5">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <card.icon className="h-6 w-6 text-gray-400"
                                                           aria-hidden="true"/>
                                            </div>
                                            <div className="ml-5 w-0 flex-1">
                                                <dl>
                                                    <dt className="text-sm font-medium text-gray-500 truncate">{card.name}</dt>
                                                    <dd>
                                                        <div
                                                            className="text-lg font-medium text-gray-900">{card.amount}</div>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-5 py-3">
                                        <div className="text-sm">
                                            <a href={card.href}
                                               className="font-medium text-cyan-700 hover:text-cyan-900">
                                                View all
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h2 className="mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
                        Recent attendances
                    </h2>

                    {/* Activity table (small breakpoint and up) */}
                    <div className="hidden sm:block">
                        <div className="mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col mt-2">
                                <AttendanceTable total={attendanceTotal} attendances={attendances}/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
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

    const authId = session?.authId ?? null

    const userApi = `/dashboard/${authId}`

    const apiAttendances = `/attendances`

    const data = await fetchWrapper.findById({path: userApi, token: accessToken}).then(resp => resp.data)

    if (data.code === 401) {

        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    const attendances = await fetchWrapper.findById({path: apiAttendances, token: accessToken})


    // Pass data to the page via props
    return {props: {total: data.total, activeCount: data.activeCount, user: data.user,attendances : attendances.data, attendanceTotal: attendances.total}}
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title="Dashboard">
            {page}
        </Layout>
    )
}
