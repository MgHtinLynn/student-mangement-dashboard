import DataTable from "@components/data-table/index"
import moment from "moment"
import { useSession } from "next-auth/react"
import { IExamResultList, IExamResults } from "@models/examResult"
import { classNames } from "@utils/helper"
import Link from "next/link"

const contactListingColumns = [
    {
        key: 'id', label: 'ID', columnDisplay: true, visible: true, sortable: true
    },
    {
        key: 'status', label: 'Status', columnDisplay: true, visible: true, sortable: true
    },
    {
        key: 'student', label: 'Student', columnDisplay: true, visible: true, sortable: false
    },
    {
        key: 'subject', label: 'Subject', columnDisplay: true, visible: true, sortable: false
    },
    {
        key: 'file_path', label: 'Download', columnDisplay: true, visible: true, sortable: false
    },
    {
        key: 'created_at', label: 'Created At', columnDisplay: true, visible: true, sortable: true
    }
];

export default function ExamResultTable({examResults, total}: IExamResultList) {

    const session = useSession();

    const userProfile = session?.data?.user;

    const defaultConfig = {
        columns: contactListingColumns,
        queries: null
    }



    const handleCreate = () => {
        console.log('handle create')
    };

    const status = (status: string): string => {
        switch (status) {
            case "Pass":
                return 'bg-green-100'
            case "Merit":
                return 'bg-blue-100'
            case "Distinction":
                return 'bg-indigo-100'
            case "Fail":
                return 'bg-red-100'
            default:
                return 'bg-gray-100'
        }
    }

    if (session) {
        return (
            <div>
                <DataTable<IExamResults>
                    editAction={userProfile?.role === 'admin'}
                    total={total}
                    endpoint="/exam-results"
                    items={examResults}
                    onCreate={handleCreate}
                    actionOptions={(item: IExamResults) => (
                        <button>actionOptions</button>
                    )}
                    pagination={true}
                    customRenderers={{
                        id: (item) => {
                            return (
                                <div className="flex items-center">
                                    <div className="ml-4">
                                        <div className="font-medium text-gray-900">{item.id}</div>
                                    </div>
                                </div>
                            );
                        },
                        status: (item) => {
                            return (
                                <span
                                    className={classNames(status(item.status), "inline-flex rounded-full  px-2 text-xs font-semibold leading-5 text-green-800")}>
                                {item.status}
                            </span>
                            )
                        },
                        student: (item) => {
                            return (
                                <div className="flex items-center">
                                    <div className="ml-4">
                                        <div className="font-medium text-gray-900">{item.student?.name}</div>
                                    </div>
                                </div>
                            );
                        },
                        subject: (item) => {
                            return (
                                <div className="flex items-center">
                                    <div className="ml-4">
                                        <div className="font-medium text-gray-900">{item.subject?.name}</div>
                                    </div>
                                </div>
                            );
                        },
                        file_path: (item) => {
                            return (
                                <div className="flex items-center">
                                    <div className="ml-4">
                                        <div className="font-medium text-gray-900">
                                            {
                                                item.file_path && (
                                                    <Link href={item.file_path} className="text-cyan-500">Download</Link>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            );
                        },
                        created_at: (item) => (
                            <p>{moment(item.created_at).format("DD/MM/YYYY")}</p>
                        ),
                    }}
                    defaultConfig={{
                        filters: [
                            ...contactListingColumns,
                        ],
                        ...defaultConfig
                    }}></DataTable>
            </div>
        )
    } else {
        return (
            <div>Need to Login</div>
        )
    }

}