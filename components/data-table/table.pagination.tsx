import React  from "react"
import { QueryConfigType } from "@components/data-table/index"
import { classNames } from "@utils/helper"

interface IProps {
    total: number
    queryObj: QueryConfigType
    setQueries: (queries: QueryConfigType) => void
}

export default function TablePagination({total, queryObj, setQueries}: IProps) {

    const totalPage = total / queryObj.limit

    const onPageChange = (goToPage: number) => {
        setQueries({ ...queryObj, page: goToPage })
    }

    return (
        <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
             aria-label="Pagination">
            <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{ queryObj.page }</span> to <span
                    className="font-medium">{ queryObj.limit }</span> of{' '}
                    <span className="font-medium">{ total }</span> results
                </p>
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
                <button
                    type="button"
                    onClick={() => queryObj.page > 1 && onPageChange(queryObj.page - 1)}
                    className={classNames(queryObj.page === 1 ? 'cursor-not-allowed' : 'cursor-pointer', 'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50')}>
                    Previous
                </button>
                <button
                    type="button"
                    onClick={() => onPageChange(queryObj.page + 1)}
                    className={classNames(queryObj.page === totalPage ? 'cursor-not-allowed' : 'cursor-pointer', 'ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50')}>
                    Next
                </button>
            </div>
        </nav>

    )
}