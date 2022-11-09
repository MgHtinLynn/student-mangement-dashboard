import DataTable from "@components/data-table/index"
import { useSession } from "next-auth/react"
import { ISubjectList, ISubjects } from "@models/subjects"
import moment from "moment"

const contactListingColumns = [
    {
        key: 'id', label: 'ID', columnDisplay: true, visible: true, sortable: true
    },
    {
        key: 'name', label: 'Name', columnDisplay: true, visible: true, sortable: true
    },
    {
        key: 'teacher', label: 'Teacher', columnDisplay: true, visible: true, sortable: false
    },
    {
        key: 'lecture', label: 'Lecture', columnDisplay: true, visible: true, sortable: false
    },
    {
        key: 'created_at', label: 'Created At', columnDisplay: true, visible: true, sortable: true
    }
];

export default function SubjectTable({subjects, total}: ISubjectList) {

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
                <DataTable<ISubjects>
                    editAction={userProfile?.role === 'admin'}
                    total={total}
                    endpoint="/subjects"
                    items={subjects}
                    onCreate={handleCreate}
                    actionOptions={(item: ISubjects) => (
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
                        teacher: (item) => {
                            return (
                                <div className="flex items-center">
                                    <div className="ml-4">
                                        <div className="font-medium text-gray-900">{item.teacher?.name}</div>
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