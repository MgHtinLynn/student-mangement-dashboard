import DataTable from "@components/data-table/index"
import moment from "moment"
import Link from "next/link"
import { useSession } from "next-auth/react";
import { ILectures, ILectureList } from "@models/lecture";

const contactListingColumns = [
    {
        key: 'id', label: 'ID', columnDisplay: true, visible: true, sortable: true
    },
    {
        key: 'name', label: 'Name', columnDisplay: true, visible: true, sortable: true
    },
    {
        key: 'tutor', label: 'Teacher', columnDisplay: true, visible: true, sortable: false
    },
    {
        key: 'created_at', label: 'Created At', columnDisplay: true, visible: true, sortable: true
    }
];

export default function LectureTable({lectures, total}: ILectureList) {

    const defaultConfig = {
        columns: contactListingColumns,
        queries: null
    }

    const {data: session} = useSession()

    const handleCreate = () => {
        console.log('handle create')
    };

    if (session) {
        return (
            <div>
                <DataTable<ILectures>
                    editAction={true}
                    total={total}
                    endpoint="/lectures"
                    items={lectures}
                    onCreate={handleCreate}
                    actionOptions={(item: ILectures) => (
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
                        name: (item) => {
                            return (
                                <div className="flex items-center">
                                    <div className="ml-4">
                                        <div className="font-medium text-gray-900">{item.name}</div>
                                    </div>
                                </div>
                            );
                        },
                        tutor: (item) => {
                            return (
                                <div className="flex items-center">
                                    <div className="ml-4">
                                        <div className="font-medium text-gray-900">{item.tutor?.name}</div>
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