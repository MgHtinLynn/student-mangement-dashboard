import { IUser } from "@models/user";
import { ISubjects } from "@models/subjects";
import { ILectures } from "@models/lecture";

export interface ICertificate {
    id: number
    student_id: number,
    lecture_id: number,
    file_path?: string
}

export interface ICertificateList {
    total: number,
    certificates: ICertificates[]
}

export interface ICertificates {
    id: number
    student_id: number,
    student?: IUser
    lecture_id: number,
    lecture?: ILectures
    file_path?: string
    created_at?: string
    updated_at?: string
    deleted_at?: string
}

export interface IStudent {
    id: number
    name: string
}

export interface UpdateCertificate {
    id: number
    student_id: number,
    lecture_id: number,
}