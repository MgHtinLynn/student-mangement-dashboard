import Head from 'next/head'
import { ReactNode, useState } from 'react'
import Sidebar from "./sidebar"
import Header from "./header"

interface IProps {
    children: ReactNode,
    title: ReactNode,
}

export default function Layout({ children, title } : IProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="min-h-full">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}></Sidebar>
                <div className="lg:pl-64 flex flex-col flex-1">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}></Header>
                    {children}
                </div>
            </div>


        </>
    )
}