export type UserRole = 'STUDENT' | 'TEACHER' | 'DEAN' | 'HR' | 'RECTOR';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  roleTitle: string;
  department: string;
  faculty?: string;
  pinfl: string;
  avatar: string;
  studentId?: string;
}

export type DocumentType = 
  | 'STUDENT_REFERENCE'   // O'qish joyidan ma'lumotnoma (No-Touch)
  | 'CONTRACT_AGREEMENT'  // To'lov-shartnoma (No-Touch)
  | 'LEAVE_REQUEST'       // Mehnat ta'tili arizasi (Workflow)
  | 'JOB_APPLICATION'     // Yangi ishga qabul qilish arizasi (Onboarding)
  | 'BUSINESS_TRIP'       // Xizmat safari arizasi (Workflow)
  | 'RECTOR_ORDER';       // Rektorat buyrug'i (E-IMZO)

export interface WorkflowStep {
  stepNumber: number;
  role: UserRole;
  roleName: string;
  approverName?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  comment?: string;
  actionDate?: string;
  eImzoHash?: string;
  slaHours: number;
  startedAt: string;
}

export interface GeneratedDoc {
  docNumber: string;
  issuedDate: string;
  qrHash: string;
  verifyUrl: string;
  title: string;
  content: string;
  signerName: string;
  signerRole: string;
  digitalSignatureHash: string;
}

export interface ExecutionTask {
  id: string;
  title: string;
  assigneeRole: string;
  assigneeDepartment: string;
  deadline: string;
  isCompleted: boolean;
}

export interface DocumentRequest {
  id: string;
  type: DocumentType;
  title: string;
  applicantId: string;
  applicantName: string;
  applicantRole: UserRole;
  department: string;
  faculty?: string;
  status: 'DRAFT' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
  formData: Record<string, any>;
  workflow: WorkflowStep[];
  generatedDoc?: GeneratedDoc;
  executionTasks?: ExecutionTask[];
}
