import { NextPage, NextPageContext } from 'next';
import Link from "next/link";
import Image from 'next/image'


interface Props {
    statusCode?: number
}

const Error: NextPage<Props> = ({ statusCode }) => {
    return (
        <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
            <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex-shrink-0 flex justify-center">
                    <Link href="/" className="inline-flex">
                        <span className="sr-only">Workflow</span>
                        <Image
                            className="h-12 w-auto"
                            src="/images/genius.svg"
                            alt="logo"
                            width="80"
                            height="80"
                        />
                    </Link>
                </div>
                <div className="py-16">
                    <div className="text-center">
                        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">{ statusCode } error</p>
                        <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Page not found.</h1>
                        <p className="mt-2 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
                        <div className="mt-6">
                            <Link href="/" className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                                Go back home<span aria-hidden="true"> &rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error