import { IUser } from "@models/user";
import { ISubjects } from "@models/subjects";
import { ILectures } from "@models/lecture";

export interface ITranscript {
    id: number
    student_id: number,
    lecture_id: number,
    file_path?: string
}

export interface ITranscriptList {
    total: number,
    transcripts: ITranscripts[]
}

export interface ITranscripts {
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

export interface UpdateTranscript {
    id: number
    student_id: number,
    lecture_id: number,
}