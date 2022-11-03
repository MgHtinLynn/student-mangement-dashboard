import React, { useRef, useState } from "react"
import { useRouter } from "next/router"
import { IUser, UpdateUser } from "@models/user"
import { fetchWrapper } from "@utils/fetch-wrapper"
import { FormProvider, useForm } from "react-hook-form"
import Notification from "@components/ui/notification"
import Toggle from "@components/ui/toogle"
import Image from 'next/image'
import { PropsRole } from "@models/role"

interface IProps {
    user?: IUser,
    roles: PropsRole[]
}

interface IPropUpdate {
    id: number,
    data: UpdateUser,
}

interface propBody {
    url: string
}

export default function UserForm({user, roles}: IProps) {
    const router = useRouter();

    const [showNotification, setShowNotification] = useState<boolean>(false)
    const [resultStatus, setResultStatus] = useState<boolean>(false)

    const methods = useForm<IUser>({
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            role: user?.role || '',
            address: user?.address || '',
            profile_url: user?.profile_url ?? '',
            active: user?.active || false,
        }
    });

    const {register, handleSubmit, setValue, getValues, formState: {errors}} = methods

    const [profile, setProfile] = useState(user?.profile_url ?? null);

    const hiddenFileInput = useRef(null);

    const handleClick = (el: any) => {
        el.click()
    }

    const profileUpload = async (event: any) => {
        const fileUploaded = event.target.files[0];

        setProfile(URL.createObjectURL(fileUploaded))

        const formData = new FormData();
        formData.append('profile', fileUploaded);
        /* Send request to our api route */
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        const body: propBody = await response.json() as { status: 'ok' | 'fail', message: string, url: string };

        setValue("profile_url", body.url)
    }

    const onSubmit = async (data: IUser) => {
        console.log(getValues('active'))
        return user ? updateUser({id: user?.id, data: data} as IPropUpdate) : createUser(data);
    }

    const updateUser = async ({id, data}: IPropUpdate) => {
        try {
            await fetchWrapper.put({path: '/users/' + id, body: data})
            setResultStatus(true)
            setShowNotification(true)
            await router.push('/users')
        } catch (err) {
            setResultStatus(false)
            setShowNotification(true)
        }

    }

    const createUser = async (createUserData: IUser) => {

        try {
            await fetchWrapper.post({path: '/users', body: createUserData})
            setResultStatus(true)
            setShowNotification(true)
            await router.push('/users')
        } catch (err) {
            setResultStatus(false)
            setShowNotification(true)
        }
    }

    return (
        <>
            {
                showNotification &&
              <Notification show={showNotification} setShow={setShowNotification} status={resultStatus}/>
            }
            <FormProvider {...methods} >
                <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                        <div>
                            <div className="flex justify-between py-3">
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{user ? 'Update' : 'Create'} User</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        This information will be displayed publicly so be careful what you share.
                                    </p>
                                </div>
                                <div>
                                    <Toggle field="active"/>
                                </div>

                            </div>

                            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">

                                <div
                                    className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                                        Photo
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <div className="flex items-center">
                                            {
                                                profile ? (
                                                    <Image className="h-10 w-10 rounded-full"
                                                           width="50"
                                                           height="50"
                                                           src={profile}
                                                           alt={user?.name ?? 'profile'}/>
                                                ) : (
                                                    <span
                                                        className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                                    <svg className="h-full w-full text-gray-300" fill="currentColor"
                                                         viewBox="0 0 24 24">
                                                      <path
                                                          d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                                                    </svg>
                                                  </span>
                                                )
                                            }

                                            <input type="file" className="hidden" ref={hiddenFileInput}
                                                   onChange={profileUpload}/>
                                            <button
                                                onClick={() => handleClick(hiddenFileInput.current)}
                                                type="button"
                                                className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                                                Upload
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Use a permanent address where you
                                    can receive mail.</p>
                            </div>
                            <div className="space-y-6 sm:space-y-5">
                                <div
                                    className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="name"
                                           className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 required">
                                        User name
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <input
                                            {...register('name', {required: true})}
                                            type="text"
                                            id="name"
                                            autoComplete="name"
                                            className="block max-w-lg w-full shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm border-gray-300 rounded-md"
                                        />
                                        {errors.name &&
                                          <p className="mt-1 text-sm text-danger-500">{errors.name.message}</p>}
                                    </div>
                                </div>

                                <div
                                    className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="email"
                                           className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 required">
                                        Email address
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <input
                                            {...register('email', {required: true})}
                                            id="email"
                                            type="email"
                                            autoComplete="email"
                                            className="block max-w-lg w-full shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm border-gray-300 rounded-md"
                                        />
                                        {errors.email &&
                                          <p className="mt-1 text-sm text-danger-500">{errors.email.message}</p>}
                                    </div>
                                </div>

                                <div
                                    className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="phone"
                                           className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 required">
                                        Phone Number
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <input
                                            {...register('phone', {required: true})}
                                            id="phone"
                                            type="text"
                                            autoComplete="phone"
                                            className="block max-w-lg w-full shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm border-gray-300 rounded-md"
                                        />
                                        {errors.phone &&
                                          <p className="mt-1 text-sm text-danger-500">{errors.phone.message}</p>}
                                    </div>
                                </div>

                                <div
                                    className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="role"
                                           className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 required">
                                        Roles
                                    </label>
                                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                                        <select
                                            id="role"
                                            {...register("role", {required: true})}
                                            autoComplete="role-name"
                                            className="block max-w-lg w-full shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm border-gray-300 rounded-md"
                                        >
                                            {
                                                roles?.map(list => (
                                                    <option className="uppercase" value={list?.name} key={list?.name}>{list?.name}</option>))
                                            }

                                        </select>
                                    </div>
                                </div>


                                <div
                                    className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="street-address"
                                           className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        Address
                                    </label>
                                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                                        <input
                                            {...register('address', {required: false})}
                                            type="text"
                                            id="street-address"
                                            autoComplete="street-address"
                                            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="pt-5">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-700 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </>

    )
}