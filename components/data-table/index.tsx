import React, {
    ReactNode,
    useState,
    useEffect
} from 'react';
import TablePagination from "@components/data-table/table.pagination"
import { useSession } from "next-auth/react"
import { fetchData } from "@utils/api"
import Link from "next/link"

export type QueryConfigType = {
    limit: number;
    page: number;
    sort?: string;
    mode?: string
}

export type ColumnConfigType = {
    key: string;
    label: string;
    visible: boolean;
    columnDisplay: boolean;
    sortable: boolean;
}

export interface TableConfig {
    filters: ColumnConfigType[];
    columns: ColumnConfigType[];
    queries: QueryConfigType | null;
}

type CustomRenderers<T extends MinTableItem> = Partial<Record<keyof T, (item: T) => React.ReactNode>>;

// minimum prop need to provide
interface MinTableItem {
    id: number;
}

interface IProps<T extends MinTableItem> {
    total: number
    items: T[]
    endpoint: string
    tableName?: string
    defaultConfig: TableConfig
    onCreate?: () => void
    actionOptions?: (item: T) => ReactNode
    customRenderers?: CustomRenderers<T>
    onApplyFilters?: () => void
    isSelectedAllItems?: boolean
    onFetchSucceeded?: (total: number) => void
    onToggleItem?: (checked: boolean, id: number) => void
    onToggleAllItems?: (items: number[]) => void
    batchEditing?: ReactNode
    children?: ReactNode
    pagination: boolean,
    editAction: boolean
}

interface OrderProp {
    [key: string]: string;
}

const columnFiltered = (columns: ColumnConfigType[]) => {
    return columns.filter(col => col.visible);
};

export default function DataTable<T extends MinTableItem>(props: IProps<T>) {
    const initialColumns = props.defaultConfig.columns ?? [];
    const initialTotal = props.total ?? 0;

    const [queryObj, setQueryObj] = useState<QueryConfigType>({page: 1, limit: 20});
    const [orderObj, setOrderObj] = useState<OrderProp>({})

    const [items, setItems] = useState<T[] | []>(props.items);
    const [total, setTotal] = useState<number>(initialTotal);
    const [columns, setColumns] = useState<ColumnConfigType[]>(initialColumns);

    const { data: session } = useSession()

    const data = fetchData({path: `${props.endpoint}`, token: session?.accessToken || null, queryObj: queryObj})


    useEffect(() => {
        if (data) {
            setItems(data)
        }
    }, [data]);

    const onSort = (i: ColumnConfigType) => {
        // only sort action for sort columns
        if (i.sortable) {
            const newOrder = {...orderObj}
            if (newOrder[i.key]) {
                newOrder[i.key] = (newOrder[i.key] === 'desc') ? 'asc' : 'desc'
            } else {
                newOrder[i.key] = 'asc'
            }
            setOrderObj(newOrder)
            setQueryObj(prev => ({...prev, sort: `${i.key} ${newOrder[i.key]}`}))
        }
    }

    return (
        <>
            {/* <div className="relative z-10 flex flex-col h-full"> */}
            <div className="z-10 flex flex-col h-full">
                <div
                    className="relative flex flex-col h-full overflow-auto border-b border-gray-200 shadow sm:rounded-lg">
                    {/* table section */}
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="">
                        <tr className="w-full h-14 text-sm leading-none text-gray-800 focus:outline-none">
                            {
                                props.editAction && (
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        {/* action button */}
                                    </th>
                                )
                            }

                            {
                                columnFiltered(columns || []).map((col, idx) => (
                                    <th key={idx} scope="col" onClick={() => onSort(col)}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                        <p className="flex items-center cursor-pointer">{col.label || col.key}{col.sortable &&
                                          <Sorting name={col.key}/>}</p>

                                    </th>
                                ))
                            }
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                        {items.map((item, key) => (
                            <tr key={key}>
                                { props.editAction && (
                                    <td className="relative whitespace-nowrap py-4 pl-4 text-sm font-medium">
                                        <Link href={`${props.endpoint}/edit/${item.id}`}>
                                            <button className="text-indigo-600 hover:text-indigo-900">
                                                Edit<span className="sr-only">, {item.id}</span>
                                            </button>
                                        </Link>
                                    </td>
                                )}


                                {
                                    columnFiltered(columns || []).map((col, idx) => {
                                        const key = col.key; // visible column key
                                        const customRenderer = props.customRenderers?.[key as keyof T];

                                        if (customRenderer) {
                                            return (
                                                <td
                                                    key={`${idx}_${key}`}
                                                    className="overflow-hidden truncate  px-4 py-3 text-sm text-gray-500 whitespace-nowrap"
                                                >
                                                    {customRenderer(item)}
                                                </td>
                                            );
                                        }

                                        // @ts-ignore
                                        return (
                                            <td key={`${idx}_${key}`}
                                                className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div className="text-gray-900">
                                                    {/*{isPrimitive(item?.[key as keyof T]) ? item?.[key as keyof T] : ""}*/}
                                                </div>
                                            </td>
                                        )

                                    })
                                }

                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {/* end table section */}

                    {/*{!isFetching && !items?.length && (<NoDataFound />)}*/}

                </div>
            </div>

            {
                props.pagination && <TablePagination total={total} queryObj={queryObj} setQueries={setQueryObj}/>
            }

        </>
    );
}

interface ISortingProps {
    name: string
}

const Sorting = (props: ISortingProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
             className="w-4 h-4 ml-3 text-gray-400" aria-hidden="true">
            <path
                d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"></path>
        </svg>
    )
};


const NoDataFound = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center w-full bg-gray-300 opacity-50">
            <p className="text-lg text-gray-500">No data found.</p>
        </div>
    )
}
