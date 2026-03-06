import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactSubmission {
    id: SubmissionId;
    name: string;
    businessType: string;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export type SubmissionId = bigint;
export interface backendInterface {
    getAllSubmissions(): Promise<Array<ContactSubmission>>;
    getTotalSubmissions(): Promise<bigint>;
    submitContactForm(name: string, email: string, phone: string, businessType: string, message: string): Promise<SubmissionId>;
}
