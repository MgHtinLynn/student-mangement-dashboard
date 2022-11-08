import React, { ReactElement, useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { getCsrfToken, signIn } from "next-auth/react"
import LoginLayout from "../components/login.layout"
import Notification from "@components/ui/notification"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import Image from 'next/image'

interface propLogin {
    csrfToken: string
}
const Login = ({csrfToken}: propLogin) => {

    const router = useRouter();
    const err = router.query["error"] ?? false;


    const {reset, handleSubmit, register, formState: {isSubmitSuccessful}} = useForm({
        defaultValues: {
            email: "admin@genius.com",
            password: "password"
        }
    });

    const [isLoading, setIsLoading] = useState(false);

    const [showNotification, setShowNotification] = useState(false)
    const [resultStatus, setResultStatus] = useState(false)


    useEffect(() => {
        if (err) {
            setResultStatus(false)
            setShowNotification(true)
        }
    }, [err]);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmit = handleSubmit(async values => {
        await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: true,
            callbackUrl: `${window.location.origin}/dashboard`,
        })
    });


    return (
        <>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Image
                        className="mx-auto h-12 w-auto"
                        src="/images/genius.svg"
                        alt="Workflow"
                        width="80"
                        height="80"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in</h2>
                </div>
                {
                    showNotification && <Notification show={showNotification} setShow={setShowNotification} status={resultStatus}/>
                }
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={onSubmit} method="POST">
                            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        {...register("email")}
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        {...register("password")}
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                {/*<div className="text-sm">*/}
                                {/*    <a href="#" className="font-medium text-cyan-600 hover:text-cyan-500">*/}
                                {/*        Forgot your password?*/}
                                {/*    </a>*/}
                                {/*</div>*/}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                >
                                    {isLoading &&
                                      <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>}
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}

Login.getLayout = function getLayout(page : ReactElement) {
    return (
        <LoginLayout title="Login">
            {page}
        </LoginLayout>
    )
}

export default Login