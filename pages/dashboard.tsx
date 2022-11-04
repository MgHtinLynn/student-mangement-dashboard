import { ReactElement } from 'react'
import { ScaleIcon, UserGroupIcon, UsersIcon, XCircleIcon } from '@heroicons/react/24/outline'
import {
    BanknotesIcon,
    CheckCircleIcon,
    ChevronRightIcon,
    BuildingOfficeIcon,
} from '@heroicons/react/20/solid'
import Layout from "../components/layout"
import { classNames } from "@utils/helper"
import { GetServerSideProps } from "next"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import Image from 'next/image'
import { fetchWrapper } from "@utils/fetch-wrapper"
import { IUser } from "@models/user"


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
    user: IUser
}

export default function Dashboard({total, activeCount, user}: propDashboard) {

    const cards = [
        {name: 'Active User', href: '/users', icon: UserGroupIcon, amount: activeCount},
        {name: 'Total User', href: '/users', icon: UsersIcon, amount: total},
        {name: 'Today Attendance', href: '#', icon: ScaleIcon, amount: '$30,659.45'},
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
                            <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                >
                                    Add money
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                >
                                    Send money
                                </button>
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
                        Recent activity
                    </h2>

                    {/* Activity list (the smallest breakpoint only) */}
                    <div className="shadow sm:hidden">
                        <ul role="list"
                            className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
                            {transactions.map((transaction) => (
                                <li key={transaction.id}>
                                    <a href={transaction.href}
                                       className="block px-4 py-4 bg-white hover:bg-gray-50">
                        <span className="flex items-center space-x-4">
                          <span className="flex-1 flex space-x-2 truncate">
                            <BanknotesIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true"/>
                            <span className="flex flex-col text-gray-500 text-sm truncate">
                              <span className="truncate">{transaction.name}</span>
                              <span>
                                <span className="text-gray-900 font-medium">{transaction.amount}</span>{' '}
                                  {transaction.currency}
                              </span>
                              <time dateTime={transaction.datetime}>{transaction.date}</time>
                            </span>
                          </span>
                          <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true"/>
                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <nav
                            className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
                            aria-label="Pagination"
                        >
                            <div className="flex-1 flex justify-between">
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                                >
                                    Previous
                                </a>
                                <a
                                    href="#"
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                                >
                                    Next
                                </a>
                            </div>
                        </nav>
                    </div>

                    {/* Activity table (small breakpoint and up) */}
                    <div className="hidden sm:block">
                        <div className="mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col mt-2">
                                <div
                                    className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                        <tr>
                                            <th
                                                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                scope="col"
                                            >
                                                Transaction
                                            </th>
                                            <th
                                                className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                scope="col"
                                            >
                                                Amount
                                            </th>
                                            <th
                                                className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block"
                                                scope="col"
                                            >
                                                Status
                                            </th>
                                            <th
                                                className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                scope="col"
                                            >
                                                Date
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {transactions.map((transaction) => (
                                            <tr key={transaction.id} className="bg-white">
                                                <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <div className="flex">
                                                        <a href={transaction.href}
                                                           className="group inline-flex space-x-2 truncate text-sm">
                                                            <BanknotesIcon
                                                                className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                            <p className="text-gray-500 truncate group-hover:text-gray-900">
                                                                {transaction.name}
                                                            </p>
                                                        </a>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                                            <span
                                                                className="text-gray-900 font-medium">{transaction.amount} </span>
                                                    {transaction.currency}
                                                </td>
                                                <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                                <span
                                    className={classNames(
                                        statusStyles[transaction.status],
                                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                                    )}
                                >
                                  {transaction.status}
                                </span>
                                                </td>
                                                <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                                    <time
                                                        dateTime={transaction.datetime}>{transaction.date}</time>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                    {/* Pagination */}
                                    <nav
                                        className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                                        aria-label="Pagination"
                                    >
                                        <div className="hidden sm:block">
                                            <p className="text-sm text-gray-700">
                                                Showing <span className="font-medium">1</span> to <span
                                                className="font-medium">10</span> of{' '}
                                                <span className="font-medium">20</span> results
                                            </p>
                                        </div>
                                        <div className="flex-1 flex justify-between sm:justify-end">
                                            <a
                                                href="#"
                                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                Previous
                                            </a>
                                            <a
                                                href="#"
                                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                Next
                                            </a>
                                        </div>
                                    </nav>
                                </div>
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

    const accessToken = session?.accessToken || null

    const authId = session?.authId ?? null

    const userApi = `/dashboard/${authId}`

    const data = await fetchWrapper.findById({path: userApi, token: accessToken}).then(resp => resp.data)

    //console.log('data', data)
    // Pass data to the page via props
    return {props: {total: data.total, activeCount: data.activeCount, user: data.user}}
    //return {props: { total: 0, activeCount: 0, user: {}}}
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title="Dashboard">
            {page}
        </Layout>
    )
}
