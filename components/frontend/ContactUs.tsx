import { useForm } from "react-hook-form"
import Notification from "@components/ui/notification";
import React, { useState } from "react";
import ContactInformation from "@components/view/users/contact.Information";

interface IData {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    message: string
}

export function ContactUs() {

    const [showNotification, setShowNotification] = useState<boolean>(false)

    const {handleSubmit, reset, register} = useForm()

    const onSubmit = async (data: any) => {
        const response = await fetch('/api/sendEmail', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        if (response.ok) {
            reset()
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
                                Get in touch
                            </h1>
                            <p className="mt-6 max-w-3xl text-xl text-warm-gray-500">
                                Save time and money with easy-to-use software for demographics, attendance, scheduling, web gradebook, report cards and transcripts, billing, accounting, parent and student web portals, mobile apps, admissions with online applications and forms, Charter enrollment, and much more.
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

                                {/* Contact form */}
                                <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                                    <h3 className="text-lg font-medium text-warm-gray-900">Send us a message</h3>
                                    <form onSubmit={handleSubmit(onSubmit)}
                                          className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                        <div>
                                            <label htmlFor="first-name"
                                                   className="block text-sm font-medium text-warm-gray-900">
                                                First name
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    {...register('first_name', {required: true})}
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="last-name"
                                                   className="block text-sm font-medium text-warm-gray-900">
                                                Last name
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    {...register('last_name', {required: true})}
                                                    id="last-name"
                                                    autoComplete="family-name"
                                                    className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-warm-gray-900">
                                                Email
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    id="email"
                                                    {...register('email', {required: true})}
                                                    type="email"
                                                    autoComplete="email"
                                                    className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between">
                                                <label htmlFor="phone"
                                                       className="block text-sm font-medium text-warm-gray-900">
                                                    Phone
                                                </label>
                                                <span id="phone-optional" className="text-sm text-warm-gray-500">
                                              Optional
                                            </span>
                                            </div>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    {...register('phone', {required: true})}
                                                    id="phone"
                                                    autoComplete="tel"
                                                    className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                                    aria-describedby="phone-optional"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="subject"
                                                   className="block text-sm font-medium text-warm-gray-900">
                                                Subject
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    {...register('subject', {required: true})}
                                                    id="subject"
                                                    className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <div className="flex justify-between">
                                                <label htmlFor="message"
                                                       className="block text-sm font-medium text-warm-gray-900">
                                                    Message
                                                </label>
                                                <span id="message-max" className="text-sm text-warm-gray-500">
                                              Max. 500 characters
                                            </span>
                                            </div>
                                            <div className="mt-1">
                                            <textarea
                                                id="message"
                                                {...register('message', {required: false})}
                                                rows={4}
                                                className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                                aria-describedby="message-max"
                                                defaultValue={''}
                                            />
                                            </div>
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