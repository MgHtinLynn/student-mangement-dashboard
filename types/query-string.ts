//declare module "querystring" {

    export type querystring = {
        page: number,
        limit: number,
        sort?: string,
        search?: string,
        mode?: string
    } | any
//}