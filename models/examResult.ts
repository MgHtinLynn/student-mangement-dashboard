import { IUser } from "@models/user";
import { ISubjects } from "@models/subjects";

export interface IExamResult {
    id: number
    status: string,
    student_id: number,
    subject_id: number,
    file_path?: string
}

export interface IExamResultList {
    total: number,
    examResults: IExamResults[]
}

export interface IExamResults {
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

export interface IStudent {
    id: number
    name: string
}

export interface UpdateExamResult {
    id: number
    status: string,
    student_id: number,
    subject_id: number,
}