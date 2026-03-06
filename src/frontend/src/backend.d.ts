import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface WizardApplication {
    id: WizardApplicationId;
    hasFein: boolean;
    fein: string;
    name: string;
    businessName: string;
    regulatoryHurdle: string;
    email: string;
    timestamp: bigint;
    phone: string;
    industry: string;
}
export type PartialLeadId = bigint;
export interface PartialLead {
    id: PartialLeadId;
    regulatoryHurdle: string;
    email: string;
    timestamp: bigint;
    industry: string;
}
export type WizardApplicationId = bigint;
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
    getAllPartialLeads(): Promise<Array<PartialLead>>;
    getAllSubmissions(): Promise<Array<ContactSubmission>>;
    getAllWizardApplications(): Promise<Array<WizardApplication>>;
    getTotalSubmissions(): Promise<bigint>;
    getTotalWizardApplications(): Promise<bigint>;
    savePartialLead(email: string, industry: string, regulatoryHurdle: string): Promise<PartialLeadId>;
    submitContactForm(name: string, email: string, phone: string, businessType: string, message: string): Promise<SubmissionId>;
    submitWizardApplication(industry: string, regulatoryHurdle: string, name: string, email: string, phone: string, businessName: string, fein: string, hasFein: boolean): Promise<WizardApplicationId>;
}
