import React, { useRef, useState } from "react"
import { useRouter } from "next/router"
import { fetchWrapper } from "@utils/fetch-wrapper"
import { FormProvider, useForm } from "react-hook-form"
import Notification from "@components/ui/notification"
import { IExamResult, IExamResults, IStudent, UpdateExamResult } from "@models/examResult"
import { ISubject } from "@models/subjects"
import Link from "next/link"

interface IProps {
    examResult?: IExamResults,
    students: IStudent[],
    subjects: ISubject[],
}

interface IPropUpdate {
    id: number,
    data: UpdateExamResult,
}

const statusList = ["Pass", "Fail", "Merit", "Distinction"]

interface propBody {
    url: string
}

export default function ExamResultForm({subjects, students, examResult}: IProps) {

    const router = useRouter();

    const [showNotification, setShowNotification] = useState<boolean>(false)
    const [resultStatus, setResultStatus] = useState<boolean>(false)

    const methods = useForm<IExamResult>({
        defaultValues: {
            status: examResult?.status || '',
            student_id: examResult?.student_id,
            subject_id: examResult?.subject_id,
            file_path: examResult?.file_path
        }
    });

    const [filePath, setPath] = useState(examResult?.file_path ?? null);

    const {register, handleSubmit, setValue, formState: {errors}} = methods

    const onSubmit = async (data: IExamResults) => {
        data.student_id = parseInt(String(data.student_id))
        data.subject_id = parseInt(String(data.subject_id))

        return examResult ? updateExamResult({id: examResult?.id, data: data} as IPropUpdate) : createExamResult(data);
    }

    const updateExamResult = async ({id, data}: IPropUpdate) => {

        try {
            await fetchWrapper.put({path: '/exam-results/' + id, body: data})
            setResultStatus(true)
            setShowNotification(true)
            await router.push('/exam-results')
        } catch (err) {
            setResultStatus(false)
            setShowNotification(true)
        }

    }

    const createExamResult = async (createExamResultData: IExamResults) => {

        try {
            await fetchWrapper.post({path: '/exam-results', body: createExamResultData})
            setResultStatus(true)
            setShowNotification(true)
            await router.push('/exam-results')
        } catch (err) {
            console.log('err', err)
            setResultStatus(false)
            setShowNotification(true)
        }
    }

    const fileUpload = async (event: any) => {
        const fileUploaded = event.target.files[0];

        const formData = new FormData();
        formData.append('examResult', fileUploaded);
        /* Send request to our api route */
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        const body: propBody = await response.json() as { status: 'ok' | 'fail', message: string, url: string };

        setPath(body.url)
        setValue("file_path", body.url)
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
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{examResult ? 'Update' : 'Create'} Exam
                                        Result</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        This information will be displayed publicly so be careful what you share.
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Exam Result Information</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Use a permanent address where you
                                    can receive mail.</p>
                            </div>
                            <div className="space-y-6 sm:space-y-5">
                                <div
                                    className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="status"
                                           className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 required">
                                        Status
                                    </label>
                                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                                        <select
                                            id="status"
                                            {...register("status", {required: true})}
                                            autoComplete="status-name"
                                            className="block max-w-lg w-full shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option value="" disabled>Select your option</option>
                                            {
                                                statusList?.map(status => (
                                                    <option value={status}
                                                            key={String(status).toLowerCase()}>{status}</option>))
                                            }
                                        </select>
                                    </div>
                                    {errors.status &&
                                      <p className="mt-1 text-sm text-danger-500">{errors.status.message}</p>}
                                </div>

                                <div
                                    className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="student"
                                           className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 required">
                                        Student
                                    </label>
                                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                                        <select
                                            id="student"
                                            {...register("student_id", {required: true})}
                                            autoComplete="student-name"
                                            className="block max-w-lg w-full shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option value="" disabled>Select your option</option>
                                            {
                                                students?.map(list => (
                                                    <option className="uppercase" value={list?.id}
                                                            key={list?.id}>{list?.name}</option>))
                                            }
                                        </select>
                                    </div>
                                    {errors.student_id &&
                                      <p className="mt-1 text-sm text-danger-500">{errors.student_id.message}</p>}
                                </div>

                                <div
                                    className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="subject"
                                           className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 required">
                                        Subject
                                    </label>
                                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                                        <select
                                            id="subject"
                                            {...register("subject_id", {required: true})}
                                            autoComplete="subject-name"
                                            className="block max-w-lg w-full shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option value="" disabled>Select your option</option>
                                            {
                                                subjects?.map(list => (
                                                    <option className="uppercase" value={list?.id}
                                                            key={list?.id}>{list?.name}</option>))
                                            }

                                        </select>
                                        {errors.subject_id &&
                                          <p className="mt-1 text-sm text-danger-500">{errors.subject_id.message}</p>}
                                    </div>
                                </div>

                                <div
                                    className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="cover-photo"
                                           className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        File Upload
                                    </label>
                                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                                        <div
                                            className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                            <div className="space-y-1 text-center">
                                                {
                                                    (filePath) ? (
                                                        <Link className="text-cyan-400" href={filePath}>
                                                            <svg className="mx-auto h-12 w-12 text-cyan-400"
                                                                                   stroke="currentColor"
                                                                                   fill="none"
                                                                                   viewBox="0 0 48 48"
                                                                                   aria-hidden="true">
                                                            <path
                                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"/>
                                                        </svg>Download</Link>
                                                    ) : (
                                                        <svg className="mx-auto h-12 w-12 text-gray-400"
                                                             stroke="currentColor"
                                                             fill="none"
                                                             viewBox="0 0 48 48"
                                                             aria-hidden="true">
                                                            <path
                                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"/>
                                                        </svg>
                                                    )
                                                }

                                                <div className="flex text-sm text-gray-600">
                                                    <label htmlFor="file-upload"
                                                           className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" name="file-upload" onChange={fileUpload}
                                                               type="file" className="sr-only"/>
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
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