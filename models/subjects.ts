import { IUser } from "@models/user";
import { ILecture } from "@models/lecture";

export interface ISubject {
    id: number
    name: string,
    tutor_id: number,
}

export interface ISubjectList {
    total: number,
    subjects: ISubjects[]
}

export interface ISubjects {
    id: number
    name: string,
    teacher_id: number,
    teacher: IUser
    lecture_id: number,
    lecture: ILecture
    created_at?: string
    updated_at?: string
    deleted_at?: string
}

export interface ITeacher {
    id: number
    name: string
}

export interface UpdateSubject {
    id: number
    name: string,
    teacher_id: number,
    lecture_id: number,
}