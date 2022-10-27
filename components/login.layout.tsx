import { ReactNode } from "react"
import Head from "next/head"

interface IProps {
    children: ReactNode,
    title: ReactNode,
}

export default function LoginLayout({ children, title } : IProps) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            {children}
        </>
    )
}