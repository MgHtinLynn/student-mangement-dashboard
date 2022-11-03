import DataTable from "@components/data-table/index"
import moment from "moment"
import Link from "next/link"
import { classNames } from "@utils/helper"
import { useSession } from "next-auth/react";
import { UserCircleIcon } from "@heroicons/react/20/solid"
import Image from 'next/image'

type Props = {
    total: number,
    users: {
        id: number
        name?: string
        email?: string
        phone?: string
        role?: string
        profile_url?: string
        active?: number
        created_at?: string
        updated_at?: string
        deleted_at?: string
    }[]
}

const headers = {
    id: "Id",
    name: "Name",
    count: "Count",
    image: "Image"
}

const contactListingColumns = [
    {
        key: 'id', label: 'ID', columnDisplay: true, visible: true, sortable: true
    },
    {
        key: 'name', label: 'Name', columnDisplay: true, visible: true, sortable: true
    },
    {
        key: 'role', label: 'Role', columnDisplay: true, visible: true, sortable: false
    },
    {
        key: 'address', label: 'Address', columnDisplay: true, visible: true, sortable: false
    },
    {
        key: 'active', label: 'Active', columnDisplay: true, visible: true, sortable: true
    },
    {
        key: 'created_at', label: 'Created At', columnDisplay: true, visible: true, sortable: true
    }
];

interface IUser {
    id: number
    name?: string
    email?: string
    phone?: string
    role?: string
    address?: string
    profile_url?: string
    active?: number
    created_at?: string
    updated_at?: string
    deleted_at?: string
}

export default function UserTable({users, total}: Props) {

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
                <DataTable<IUser>
                    editAction={true}
                    total={total}
                    endpoint="/users"
                    items={users}
                    onCreate={handleCreate}
                    actionOptions={(item: IUser) => (
                        <button>actionOptions</button>
                    )}
                    pagination={true}
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
                        active: (item) => {
                            return (
                                <span
                                    className={classNames(item.active ? 'bg-green-100' : 'bg-red-100', "inline-flex rounded-full  px-2 text-xs font-semibold leading-5 text-green-800")}>
                                {item.active ? 'Active' : 'InActive'}
                            </span>
                            )
                        },
                        name: (item) => {
                            return (
                                <div className="flex items-center">
                                    <div className="h-10 w-10 flex-shrink-0">

                                        {
                                            item.profile_url ? (
                                                <Image className="h-10 w-10 rounded-full"
                                                       width="50"
                                                       height="50"
                                                       src={item.profile_url}
                                                       alt={item.email ?? ''}/>
                                            ) : (
                                                <UserCircleIcon/>
                                            )
                                        }

                                    </div>
                                    <div className="ml-4">
                                        <div className="font-medium text-gray-900">{item.name}</div>
                                        <div className="text-gray-500">{item.email}</div>
                                    </div>
                                </div>
                            );
                        },
                        role: (item) => (
                            <p>{item.role}</p>
                        ),
                        address: (item) => (
                            <p>{item.address}</p>
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