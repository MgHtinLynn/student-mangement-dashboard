import React, { useState } from "react"
import { useRouter } from "next/router"
import { ILectures, ITeacher, UpdateLecture } from "@models/lecture"
import { fetchWrapper } from "@utils/fetch-wrapper"
import { FormProvider, useForm } from "react-hook-form"
import Notification from "@components/ui/notification"

interface IProps {
    lecture?: ILectures,
    teachers: ITeacher[]
}

interface IPropUpdate {
    id: number,
    data: UpdateLecture,
}

export default function LectureForm({lecture, teachers}: IProps) {

    console.log('lecture', lecture)
    const router = useRouter();

    const [showNotification, setShowNotification] = useState<boolean>(false)
    const [resultStatus, setResultStatus] = useState<boolean>(false)

    const methods = useForm<ILectures>({
        defaultValues: {
            name: lecture?.name || '',
            tutor_id: lecture?.tutor_id
        }
    });

    const {register, handleSubmit, formState: {errors}} = methods

    const onSubmit = async (data: ILectures) => {
        data.tutor_id = parseInt(String(data.tutor_id))
        return lecture ? updateLecture({id: lecture?.id, data: data} as IPropUpdate) : createLecture(data);
    }

    const updateLecture = async ({id, data}: IPropUpdate) => {

        try {
            await fetchWrapper.put({path: '/lectures/' + id, body: data})
            setResultStatus(true)
            setShowNotification(true)
            await router.push('/lectures')
        } catch (err) {
            setResultStatus(false)
            setShowNotification(true)
        }

    }

    const createLecture = async (createLectureData: ILectures) => {

        try {
            await fetchWrapper.post({path: '/lectures', body: createLectureData})
            setResultStatus(true)
            setShowNotification(true)
            await router.push('/lectures')
        } catch (err) {
            console.log('err', err)
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
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{lecture ? 'Update' : 'Create'} Lecture</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        This information will be displayed publicly so be careful what you share.
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Subject Information</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Use a permanent address where you
                                    can receive mail.</p>
                            </div>
                            <div className="space-y-6 sm:space-y-5">
                                <div
                                    className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="name"
                                           className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 required">
                                        Lecture name
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
                                    className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="tutor"
                                           className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 required">
                                        Teachers
                                    </label>
                                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                                        <select
                                            id="tutor"
                                            {...register("tutor_id", {required: true})}
                                            autoComplete="tutor-name"
                                            className="block max-w-lg w-full shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option value="" disabled>Select your option</option>
                                            {
                                                teachers?.map(list => (
                                                    <option className="uppercase" value={list?.id} key={list?.name}>{list?.name}</option>))
                                            }

                                        </select>
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