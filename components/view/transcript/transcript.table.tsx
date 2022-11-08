import DataTable from "@components/data-table/index"
import moment from "moment"
import { useSession } from "next-auth/react"
import { ITranscriptList, ITranscripts } from "@models/transcripts"
import Link from "next/link";

const contactListingColumns = [
    {
        key: 'id', label: 'ID', columnDisplay: true, visible: true, sortable: true
    },
    {
        key: 'student', label: 'Student', columnDisplay: true, visible: true, sortable: false
    },
    {
        key: 'lecture', label: 'Lecture', columnDisplay: true, visible: true, sortable: false
    },
    {
        key: 'file_path', label: 'Download', columnDisplay: true, visible: true, sortable: false
    },
    {
        key: 'created_at', label: 'Created At', columnDisplay: true, visible: true, sortable: true
    }
];

export default function TranscriptTable({transcripts, total}: ITranscriptList) {

    const defaultConfig = {
        columns: contactListingColumns,
        queries: null
    }

    const session = useSession();

    const userProfile = session?.data?.user;

    const handleCreate = () => {
        console.log('handle create')
    };

    if (session) {
        return (
            <div>
                <DataTable<ITranscripts>
                    editAction={userProfile?.role === 'admin'}
                    total={total}
                    endpoint="/transcripts"
                    items={transcripts}
                    onCreate={handleCreate}
                    actionOptions={(item: ITranscripts) => (
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
                                    <div className="ml-4">
                                        <div className="font-medium text-gray-900">{item.student?.name}</div>
                                    </div>
                                </div>
                            );
                        },
                        lecture: (item) => {
                            return (
                                <div className="flex items-center">
                                    <div className="ml-4">
                                        <div className="font-medium text-gray-900">{item.lecture?.name}</div>
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