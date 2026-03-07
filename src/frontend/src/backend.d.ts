import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type SubmissionId = bigint;
export interface BlogPost {
    id: BlogPostId;
    title: string;
    publishDate: string;
    body: string;
    published: boolean;
    author: string;
    readTime: string;
    timestamp: bigint;
    excerpt: string;
    category: string;
}
export type WizardApplicationId = bigint;
export interface PartnerLead {
    id: PartnerLeadId;
    contactName: string;
    partnershipType: string;
    description: string;
    email: string;
    timestamp: bigint;
    companyName: string;
    phone: string;
}
export interface ContactSubmission {
    id: SubmissionId;
    name: string;
    businessType: string;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export type BlogPostId = bigint;
export type PartialLeadId = bigint;
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
export interface PartialLead {
    id: PartialLeadId;
    regulatoryHurdle: string;
    email: string;
    timestamp: bigint;
    industry: string;
}
export type PartnerLeadId = bigint;
export interface backendInterface {
    createBlogPost(title: string, category: string, excerpt: string, body: string, author: string, readTime: string, publishDate: string): Promise<BlogPostId>;
    deleteBlogPost(id: BlogPostId): Promise<boolean>;
    getAllBlogPosts(): Promise<Array<BlogPost>>;
    getAllPartialLeads(): Promise<Array<PartialLead>>;
    getAllPartnerLeads(): Promise<Array<PartnerLead>>;
    getAllSubmissions(): Promise<Array<ContactSubmission>>;
    getAllWizardApplications(): Promise<Array<WizardApplication>>;
    getBlogPost(id: BlogPostId): Promise<BlogPost | null>;
    getPublishedBlogPosts(): Promise<Array<BlogPost>>;
    getTotalPartnerLeads(): Promise<bigint>;
    getTotalSubmissions(): Promise<bigint>;
    getTotalWizardApplications(): Promise<bigint>;
    publishBlogPost(id: BlogPostId): Promise<boolean>;
    savePartialLead(email: string, industry: string, regulatoryHurdle: string): Promise<PartialLeadId>;
    submitContactForm(name: string, email: string, phone: string, businessType: string, message: string): Promise<SubmissionId>;
    submitPartnerLead(companyName: string, contactName: string, email: string, phone: string, partnershipType: string, description: string): Promise<PartnerLeadId>;
    submitWizardApplication(industry: string, regulatoryHurdle: string, name: string, email: string, phone: string, businessName: string, fein: string, hasFein: boolean): Promise<WizardApplicationId>;
    unpublishBlogPost(id: BlogPostId): Promise<boolean>;
    updateBlogPost(id: BlogPostId, title: string, category: string, excerpt: string, body: string, author: string, readTime: string, publishDate: string): Promise<boolean>;
}
