export interface IUser {
    id?: number
    name: string,
    phone: string,
    email: string,
    password?: string,
    address: string
    role: string,
    active: boolean
    profile_url: string
    created_at?: string
    updated_at?: string
    deleted_at?: string
}

export interface UpdateUser {
    id: number
    name: string,
    phone: string,
    email: string,
    address: string
    role: string,
    active: boolean
}