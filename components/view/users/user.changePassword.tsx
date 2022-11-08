import React, { useState } from "react"
import Notification from "@components/ui/notification"
import { useForm } from "react-hook-form"
import ContactInformation from "@components/view/users/contact.Information"
import { passwordSchema } from "@components/validation/password.validate"
import { yupResolver } from "@hookform/resolvers/yup"
import { fetchWrapper } from "@utils/fetch-wrapper"
import { IUser } from "@models/user"
import { useRouter } from "next/router"

interface IChangePassword {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}

interface inputChangePassword {
    password: string
}

interface IUserChangePassword {
    user: IUser
}

export default function UserChangePassword ({user}: IUserChangePassword) {

    const router = useRouter();
    const [showNotification, setShowNotification] = useState<boolean>(false)
    const [resultStatus, setResultStatus] = useState<boolean>(false)
    const {handleSubmit, formState: { errors }, register} = useForm<IChangePassword>({resolver: yupResolver(passwordSchema)})

    console.log('errors', errors)
    const onSubmit = async (data: any) => {
        const formData = {password : data.newPassword}
        try {
            //Pa$$w0rd!
            await fetchWrapper.patch({path: '/changePassword/' + user.id, body: formData})
            setResultStatus(true)
            setShowNotification(true)
            await router.push('/login')
        } catch (err) {
            setResultStatus(false)
            setShowNotification(true)
        }
    }

    return (
        <>

            {
                showNotification &&
              <Notification show={showNotification} setShow={setShowNotification} status={true} title="Success" message="successfully form submit"/>
            }

            <div className="border-t border-slate-400/10" id="contact-us">
                <div className="bg-stone-50">
                    <div className="py-6 lg:py-12">
                        <div className="relative z-10 mx-auto max-w-7xl pl-4 pr-8 sm:px-6 lg:px-8">
                            <h1 className="text-4xl font-bold tracking-tight text-warm-gray-900 sm:text-5xl lg:text-6xl">
                                Change Password
                            </h1>
                            <p className="mt-6 max-w-3xl text-xl text-warm-gray-500">
                                Get More Secure and login again
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact section */}
                <section className="relative bg-white" aria-labelledby="contact-heading">
                    <div className="absolute h-1/2 w-full bg-stone-50" aria-hidden="true"/>
                    {/* Decorative dot pattern */}
                    <div className="hidden lg:block relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <svg
                            className="absolute top-0 right-0 z-0 -translate-y-16 translate-x-1/2 transform sm:translate-x-1/4 md:-translate-y-24 lg:-translate-y-72"
                            width={404}
                            height={384}
                            fill="none"
                            viewBox="0 0 404 384"
                            aria-hidden="true"
                        >
                            <defs>
                                <pattern
                                    id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                                    x={0}
                                    y={0}
                                    width={20}
                                    height={20}
                                    patternUnits="userSpaceOnUse"
                                >
                                    <rect x={0} y={0} width={4} height={4} className="text-warm-gray-200"
                                          fill="currentColor"/>
                                </pattern>
                            </defs>
                            <rect width={404} height={384} fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"/>
                        </svg>
                    </div>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="relative bg-white shadow-xl">
                            <h2 id="contact-heading" className="sr-only">
                                Contact us
                            </h2>

                            <div className="grid grid-cols-1 lg:grid-cols-3">
                                {/* Contact information */}
                                <ContactInformation/>

                                {/* Password Change form */}
                                <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                                    <h3 className="text-lg font-medium text-warm-gray-900">Change Your Password</h3>
                                    <form onSubmit={handleSubmit(onSubmit)}
                                          className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">

                                        <div className="sm:col-span-2">
                                            <label htmlFor="current-password"
                                                   className="block text-sm font-medium text-warm-gray-900">
                                                Current Password
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="password"
                                                    {...register('currentPassword', {required: true})}
                                                    id="current-password"
                                                    autoComplete="password"
                                                    className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                                />
                                            </div>
                                            {errors.currentPassword && <p className="mt-1 text-sm text-red-500">{errors.currentPassword.message}</p>}
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="new-password"
                                                   className="block text-sm font-medium text-warm-gray-900">
                                                New Password
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="password"
                                                    {...register('newPassword', {required: true})}
                                                    id="new-password"
                                                    autoComplete="new-password"
                                                    className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                                />
                                            </div>
                                            {errors.newPassword && <p className="mt-1 text-sm text-red-500">{errors.newPassword.message}</p>}
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="confirm-password"
                                                   className="block text-sm font-medium text-warm-gray-900">
                                                Confirm Password
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="password"
                                                    {...register('confirmPassword', {required: true})}
                                                    id="confirm-password"
                                                    autoComplete="confirm-password"
                                                    className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                                />
                                            </div>
                                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
                                        </div>


                                        <div className="sm:col-span-2 sm:flex sm:justify-end">
                                            <button
                                                type="submit"
                                                className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:w-auto"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>


        </>
    )
}