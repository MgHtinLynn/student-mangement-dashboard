import { IUser } from "@models/user";
import { ISubjects } from "@models/subjects";

export interface IAttendance {
    id: number
    status: string,
    student_id: number,
    subject_id: number,
    file_path?: string
}

export interface IAttendanceList {
    total: number,
    attendances: IAttendances[]
}

export interface IAttendances {
    id: number
    status: string,
    student_id: number,
    student?: IUser
    subject_id: number,
    subject?: ISubjects
    file_path?: string
    created_at?: string
    updated_at?: string
    deleted_at?: string
}