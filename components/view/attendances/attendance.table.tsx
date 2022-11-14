import DataTable from "@components/data-table/index"
import moment from "moment"
import { classNames } from "@utils/helper"
import { useSession } from "next-auth/react";
import { UserCircleIcon } from "@heroicons/react/20/solid"
import Image from 'next/image'
import { IAttendanceList, IAttendances } from "@models/attendance"

const contactListingColumns = [
    {
        key: 'id', label: 'ID', columnDisplay: true, visible: true, sortable: true
    },
    {
        key: 'student', label: 'Name', columnDisplay: true, visible: true, sortable: false
    },
    {
        key: 'status', label: 'Status', columnDisplay: true, visible: true, sortable: true
    },
    {
        key: 'subject', label: 'Subject', columnDisplay: true, visible: true, sortable: false
    },
    {
        key: 'created_at', label: 'Date', columnDisplay: true, visible: true, sortable: true
    }
];

export default function AttendanceTable({attendances, total}: IAttendanceList) {

    const defaultConfig = {
        columns: contactListingColumns,
        queries: null
    }

    const {data: session} = useSession()

    const handleCreate = () => {
        console.log('handle create')
    };

    const status = (status: string): string => {
        switch (status) {
            case "present":
                return 'bg-green-100'
            case "absent":
                return 'bg-red-100'
            case "leave":
                return 'bg-indigo-100'
            default:
                return 'bg-gray-100'
        }
    }

    if (session) {
        return (
            <div>
                <DataTable<IAttendances>
                    editAction={false}
                    total={total}
                    endpoint="/attendances"
                    items={attendances}
                    onCreate={handleCreate}
                    actionOptions={(item: IAttendances) => (
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
                        student: (item) => {
                            return (
                                <div className="flex items-center">
                                    <div className="h-10 w-10 flex-shrink-0">

                                        {
                                            item.student?.profile_url ? (
                                                <Image className="h-10 w-10 rounded-full"
                                                       width="50"
                                                       height="50"
                                                       src={item.student?.profile_url}
                                                       alt={item.student?.email ?? ''}/>
                                            ) : (
                                                <UserCircleIcon/>
                                            )
                                        }

                                    </div>
                                    <div className="ml-4">
                                        <div className="font-medium text-gray-900">{item.student?.name}</div>
                                        <div className="text-gray-500">{item.student?.email}</div>
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
                        subject: (item) => {
                            return (
                                <div className="flex items-center">
                                    <div className="ml-4">
                                        <div className="font-medium text-gray-900">{item.subject?.name}</div>
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
                    }}/>
            </div>
        )
    } else {
        return (
            <div>Need to Login</div>
        )
    }

}