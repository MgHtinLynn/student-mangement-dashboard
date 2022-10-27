import { fetchPagination } from "../types/fetch-wrapper";
import { transformQueryString } from "@utils/helper";
import { useEffect, useState } from "react";
import { fetchWrapper } from "@utils/fetch-wrapper";
import useSWR from "swr";

const fetcher = (arg: any, ...args: any) => fetch(arg, ...args).then((res) => res.json()).then((resp) => resp.data)

interface propFetchData {
    path: string,
    token: string | null
    queryObj: any
}


export const fetchData = ({path, token, queryObj}  : propFetchData) => {

    const fetchObject = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }

    const url = process.env.BASE_URL + path + transformQueryString(queryObj)

    const {data, error} = useSWR([url, fetchObject], fetcher)

    if (error) {
        return { data: []}
    }
    return data;

}