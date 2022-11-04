import {
    XMarkIcon
} from "@heroicons/react/24/outline"
import { Dispatch, Fragment, SetStateAction } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { mainNavigation } from "./router/main.router"
import { secondaryNavigation } from "./router/secondary.router"
import Link from "next/link"
import { useRouter } from "next/router"
import Image from 'next/image'
import { permissionScope } from "@utils/helper";
import { useSession } from "next-auth/react";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface propSideBar {
    sidebarOpen: boolean,
    setSidebarOpen: Dispatch<SetStateAction<boolean>>
}

export default function Sidebar({sidebarOpen, setSidebarOpen } : propSideBar) {

    const router = useRouter();
    const currentRoute = router.pathname;
    const session = useSession();

    const userProfile = session.data?.user;

    return (
        <>
            <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0" id="side-bar">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto">
                    <div className="flex items-center flex-shrink-0 px-4">
                        <Image
                            className="h-8 w-auto"
                            width="50"
                            height="50"
                            src="/images/genius.svg"
                            alt="Genius logo"
                        />
                        <h1 className="text-2xl text-cyan-100 hover:text-white hover:bg-cyan-600 group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md">GENIUS</h1>
                    </div>
                    <nav className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto"
                         aria-label="Sidebar">
                        <div className="px-2 space-y-1">
                            {mainNavigation.filter((menu) => permissionScope(menu.permission, userProfile?.role!)).map((item) => (
                                <Link href={item.href} key={item.name} className={classNames(
                                    item.href === currentRoute ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                                    'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                                )} aria-current={item.current ? 'page' : undefined}>
                                    <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                                               aria-hidden="true"/>
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="mt-6 pt-6">
                            <div className="px-2 space-y-1">
                                {secondaryNavigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                                    >
                                        <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true"/>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75"/>
                    </Transition.Child>

                    <div className="fixed inset-0 flex z-40">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel
                                className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-cyan-700">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex-shrink-0 flex items-center px-4">
                                    <Image
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/easywire-logo-cyan-300-mark-white-text.svg"
                                        alt="Easywire logo"
                                    />
                                </div>
                                <nav
                                    className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto"
                                    aria-label="Sidebar"
                                >
                                    <div className="px-2 space-y-1">
                                        {mainNavigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-cyan-800 text-white'
                                                        : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                                                    'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                                                           aria-hidden="true"/>
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                    <div className="mt-6 pt-6">
                                        <div className="px-2 space-y-1">
                                            {secondaryNavigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                                                >
                                                    <item.icon className="mr-4 h-6 w-6 text-cyan-200"
                                                               aria-hidden="true"/>
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </nav>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>

    )
}