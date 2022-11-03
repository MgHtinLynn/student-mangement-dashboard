import { IUser } from "@models/user";

export interface ILecture {
    id: number
    name: string,
    tutor_id: number,
}

export interface ILectureList {
    total: number,
    lectures: ILectures[]
}

export interface ILectures {
    id: number
    name: string,
    tutor_id: number,
    tutor?: IUser
    created_at?: string
    updated_at?: string
    deleted_at?: string
}

export interface ITeacher {
    id: number
    name: string
}

export interface UpdateLecture {
    id: number
    name: string,
    tutor_id: number,
}