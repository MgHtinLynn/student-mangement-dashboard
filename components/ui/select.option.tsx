interface propOption {
    id: number
    name: string
    created_at?: string
    updated_at?: string
    deleted_at?: string
}

interface propSelect {
    lists: propOption[]
    label: string,
    name: string
}


export default function SelectOption({lists, label, name} :propSelect) {
    return (
        <div>
            <select
                id={name}
                name={name}
                className="block w-full ml-3 text-base max-w-full sm:max-w-[250px] border-gray-300 ring-gray-300 focus:ring-gray-300 rounded-md focus:border-gray-300 sm:text-sm"
                defaultValue=""
            >
                <option value="">{label}</option>
                {
                    lists?.map(list => (<option value={list?.name} key={list?.name}>{list?.name}</option>))
                }
            </select>
        </div>
    )
}
