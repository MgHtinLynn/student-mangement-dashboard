import DataTable from "@components/data-table/index"
import moment from "moment"
import Link from "next/link"
import { useSession } from "next-auth/react";
import { classNames } from "@utils/helper";
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/20/solid";

type Props = {
    total: number,
    roles: {
        id: number
        name?: string
        created_at?: string
        updated_at?: string
        deleted_at?: string
    }[]
}

const headers = {
    id: "Id",
    name: "Name",
}

const contactListingColumns = [
    {
        key: 'id', label: 'ID', columnDisplay: true, visible: true, sortable: true
    },
    {
        key: 'name', label: 'Name', columnDisplay: true, visible: true, sortable: true
    },
    {
        key: 'created_at', label: 'Created At', columnDisplay: true, visible: true, sortable: true
    }
];

interface IRole {
    id: number
    name?: string
    created_at?: string
    updated_at?: string
    deleted_at?: string
}

export default function UserTable({roles, total}: Props) {

    const defaultConfig = {
        columns: contactListingColumns,
        queries: null
    }

    const {data: session} = useSession()

    if (session) {
        return (
            <div>
                <DataTable<IRole>
                    editAction={false}
                    total={total}
                    endpoint="/roles"
                    items={roles}
                    actionOptions={(item: IRole) => (
                        <button>actionOptions</button>
                    )}
                    pagination={false}
                    customRenderers={{
                        id: (item) => {
                            return (
                                <Link
                                    key={item.id}
                                    href={`/users/${item.id}`}
                                    className="underline hover:text-purple-500"
                                >
                                    {item.id}
                                </Link>
                            );
                        },
                        name: (item) => (
                            <p>{item.name}</p>
                        ),
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