'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { User, DocumentRequest } from './types';
import { USERS, INITIAL_DOCUMENTS } from './mockData';

export interface ToastMessage {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  timestamp: string;
}

interface DocumentContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  users: User[];
  documents: DocumentRequest[];
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
  createStudentReference: (purpose: string) => Promise<DocumentRequest>;
  createLeaveRequest: (startDate: string, endDate: string, daysCount: number, reason: string) => Promise<DocumentRequest>;
  createJobApplication: (position: string, faculty: string, department: string, rate: string, education: string) => Promise<DocumentRequest>;
  approveStep: (docId: string, comment?: string) => Promise<void>;
  rejectStep: (docId: string, comment: string) => Promise<void>;
  signRectorOrder: (docId: string) => Promise<void>;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(USERS[0]); // Default: Student
  const [documents, setDocuments] = useState<DocumentRequest[]>(INITIAL_DOCUMENTS);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark'); // Modern dark mode default
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  // Sync theme with <html> class
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('unidocflow_theme') as 'light' | 'dark';
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      const body = document.body;
      if (theme === 'dark') {
        root.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
        body.classList.add('dark');
        body.setAttribute('data-theme', 'dark');
      } else {
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
        body.classList.remove('dark');
        body.setAttribute('data-theme', 'light');
      }
      try {
        localStorage.setItem('unidocflow_theme', theme);
      } catch {}
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const nextTheme = prev === 'light' ? 'dark' : 'light';
      addToast(
        nextTheme === 'dark' ? 'Tungi Rejim Yoqildi 🌙' : 'Kunduzgi Rejim Yoqildi ☀️',
        `Tizim interfeysi ${nextTheme === 'dark' ? 'qorong‘i' : 'yorug‘'} rejimga o‘tkazildi.`,
        'info'
      );
      return nextTheme;
    });
  };

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now();
    const newToast: ToastMessage = {
      id,
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setToasts(prev => [newToast, ...prev.slice(0, 3)]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const saveDocuments = (newDocs: DocumentRequest[]) => {
    setDocuments(newDocs);
    try {
      localStorage.setItem('unidocflow_docs', JSON.stringify(newDocs));
    } catch {}
  };

  // 1-Click No-Touch Student Reference Generation
  const createStudentReference = async (purpose: string): Promise<DocumentRequest> => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const docNumber = `REF-2026-${randomId}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newDoc: DocumentRequest = {
      id: `DOC-2026-${randomId}`,
      type: 'STUDENT_REFERENCE',
      title: 'O‘qish joyidan ma’lumotnoma (Spravka)',
      applicantId: currentUser.id,
      applicantName: currentUser.name,
      applicantRole: 'STUDENT',
      department: currentUser.department,
      faculty: currentUser.faculty,
      status: 'APPROVED',
      createdAt: now,
      updatedAt: now,
      formData: {
        purpose: purpose || 'Tegishli joyga taqdim etish uchun',
        courseYear: 3,
        studyType: 'Kunduzgi, Davlat granti'
      },
      workflow: [
        {
          stepNumber: 1,
          role: 'STUDENT',
          roleName: 'No-Touch Avtomatlashtirilgan Tekshiruv (HEMIS API)',
          approverName: 'HEMIS No-Touch Tizimi',
          status: 'APPROVED',
          comment: 'HEMIS bazasi orqali talaba holati faol ekani tekshirildi va tasdiqlandi.',
          actionDate: now,
          eImzoHash: `HASH-${Date.now()}-HEMIS-AUTO`,
          slaHours: 0,
          startedAt: now
        }
      ],
      generatedDoc: {
        docNumber: docNumber,
        issuedDate: now.split(' ')[0],
        qrHash: `hash_${docNumber}`,
        verifyUrl: `/verify/${docNumber}`,
        title: 'O‘QISH JOYIDAN MA’LUMOTNOMA',
        content: `Ushbu ma’lumotnoma berildiki, ${currentUser.name} haqiqatdan ham Sharof Rashidov nomidagi Samarqand davlat universitetining "${currentUser.faculty}" ${currentUser.department} yo‘nalishi 3-bosqich talabasi hisoblanadi. Ma’lumotnoma "${purpose || 'Tegishli joyga taqdim etish uchun'}" maqsadi uchun berildi.`,
        signerName: 'SamDU Avtomatlashtirilgan Reyestri (E-MUHR)',
        signerRole: 'SamDU HEMIS / UniDocFlow Yagona Tizimi',
        digitalSignatureHash: `E-IMZO-${docNumber}-VERIFIED`
      }
    };

    const updated = [newDoc, ...documents];
    saveDocuments(updated);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {}

    addToast(
      'Ma’lumotnoma Tayyor! (No-Touch)',
      `Hujjat ${docNumber} raqami bilan 3 soniyada yaratildi va QR-kod bilan himoyalandi.`,
      'success'
    );

    return newDoc;
  };

  // Staff Leave Request (Triggers Workflow)
  const createLeaveRequest = async (startDate: string, endDate: string, daysCount: number, reason: string): Promise<DocumentRequest> => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newDoc: DocumentRequest = {
      id: `DOC-2026-${randomId}`,
      type: 'LEAVE_REQUEST',
      title: 'Yillik mehnat ta’tili ajratish to‘g‘risida ariza',
      applicantId: currentUser.id,
      applicantName: currentUser.name,
      applicantRole: currentUser.role,
      department: currentUser.department,
      faculty: currentUser.faculty,
      status: 'IN_REVIEW',
      createdAt: now,
      updatedAt: now,
      formData: {
        startDate,
        endDate,
        daysCount,
        reason
      },
      workflow: [
        {
          stepNumber: 1,
          role: 'DEAN',
          roleName: 'Kafedra mudiri & Dekan vizasi',
          status: 'PENDING',
          slaHours: 24,
          startedAt: now
        },
        {
          stepNumber: 2,
          role: 'HR',
          roleName: 'Kadrlar bo‘limi tekshiruvi',
          status: 'PENDING',
          slaHours: 24,
          startedAt: now
        },
        {
          stepNumber: 3,
          role: 'RECTOR',
          roleName: 'Rektor tasdig‘i va Buyruq',
          status: 'PENDING',
          slaHours: 24,
          startedAt: now
        }
      ]
    };

    const updated = [newDoc, ...documents];
    saveDocuments(updated);

    addToast(
      'Ariza Qabul Qilindi',
      'Mehnat ta’tili arizasi Dekanat va Kadrlar bo‘limiga elektron vizalash uchun yuborildi.',
      'info'
    );

    return newDoc;
  };

  // Job Application (New Hire Onboarding)
  const createJobApplication = async (
    position: string,
    faculty: string,
    department: string,
    rate: string,
    education: string
  ): Promise<DocumentRequest> => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newDoc: DocumentRequest = {
      id: `DOC-2026-${randomId}`,
      type: 'JOB_APPLICATION',
      title: `Ishga qabul qilish to‘g‘risida ariza (${position})`,
      applicantId: currentUser.id,
      applicantName: currentUser.name,
      applicantRole: currentUser.role,
      department: department || currentUser.department,
      faculty: faculty || currentUser.faculty,
      status: 'IN_REVIEW',
      createdAt: now,
      updatedAt: now,
      formData: {
        position,
        rate,
        education,
        department,
        faculty,
        digitalDiplomaVerified: true,
        oneIdVerified: true
      },
      workflow: [
        {
          stepNumber: 1,
          role: 'DEAN',
          roleName: 'Kafedra mudiri & Dekan suhbati tasdig‘i',
          status: 'PENDING',
          slaHours: 24,
          startedAt: now
        },
        {
          stepNumber: 2,
          role: 'HR',
          roleName: 'Kadrlar bo‘limi (Shtat va toifani biriktirish)',
          status: 'PENDING',
          slaHours: 24,
          startedAt: now
        },
        {
          stepNumber: 3,
          role: 'RECTOR',
          roleName: 'Rektor E-IMZO buyrug‘i (my.mehnat.uz sync)',
          status: 'PENDING',
          slaHours: 24,
          startedAt: now
        }
      ]
    };

    const updated = [newDoc, ...documents];
    saveDocuments(updated);

    addToast(
      'Ishga Qabul Qilish Arizasi Yuborildi! 📄',
      `Diplom va OneID ma’lumotlari avtomatik tasdiqlanib, Dekan va Kadrlar bo‘limiga yo‘naltirildi.`,
      'success'
    );

    return newDoc;
  };

  // Approve a Workflow Step
  const approveStep = async (docId: string, comment?: string) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    let targetDocTitle = '';

    const updated = documents.map(doc => {
      if (doc.id !== docId) return doc;
      targetDocTitle = doc.title;

      let isFinished = true;
      const newWorkflow = doc.workflow.map(step => {
        if (step.role === currentUser.role && step.status === 'PENDING') {
          return {
            ...step,
            status: 'APPROVED' as const,
            approverName: currentUser.name,
            comment: comment || 'Hujjat talablarga to‘liq mos keladi. Maqullandi.',
            actionDate: now,
            eImzoHash: `E-IMZO-${currentUser.pinfl}-${Date.now().toString(16).toUpperCase()}`
          };
        }
        if (step.status === 'PENDING') {
          isFinished = false;
        }
        return step;
      });

      const anyPending = newWorkflow.some(s => s.status === 'PENDING');
      const newStatus = anyPending ? 'IN_REVIEW' : 'APPROVED';

      let generatedDoc = doc.generatedDoc;
      if (!anyPending && !generatedDoc) {
        const docNum = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        generatedDoc = {
          docNumber: docNum,
          issuedDate: now.split(' ')[0],
          qrHash: `hash_${docNum}`,
          verifyUrl: `/verify/${docNum}`,
          title: doc.title.toUpperCase(),
          content: `${doc.applicantName} tomonidan taqdim etilgan "${doc.title}" arizasi barcha mas’ul bo‘limlar bilan kelishildi va qanoatlantirildi.`,
          signerName: currentUser.name,
          signerRole: currentUser.roleTitle,
          digitalSignatureHash: `E-IMZO-FINAL-${docNum}-PASSED`
        };
      }

      return {
        ...doc,
        status: newStatus as any,
        workflow: newWorkflow,
        updatedAt: now,
        generatedDoc
      };
    });

    saveDocuments(updated);

    addToast(
      'Elektron Viza Qo‘yildi',
      `"${targetDocTitle}" arizasi muvaffaqiyatli tasdiqlandi va keyingi bosqichga yo‘naltirildi.`,
      'success'
    );
  };

  // Reject a Workflow Step
  const rejectStep = async (docId: string, comment: string) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const updated = documents.map(doc => {
      if (doc.id !== docId) return doc;

      const newWorkflow = doc.workflow.map(step => {
        if (step.role === currentUser.role && step.status === 'PENDING') {
          return {
            ...step,
            status: 'REJECTED' as const,
            approverName: currentUser.name,
            comment: comment || 'Talablarga nomuvofiqlik aniqlanganligi sababli rad etildi.',
            actionDate: now
          };
        }
        return step;
      });

      return {
        ...doc,
        status: 'REJECTED' as const,
        workflow: newWorkflow,
        updatedAt: now
      };
    });

    saveDocuments(updated);

    addToast(
      'Ariza Rad Etildi',
      'Izoh saqlandi va ariza muallifiga qaytarildi.',
      'warning'
    );
  };

  // Rector Signs Order with E-IMZO
  const signRectorOrder = async (docId: string) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const orderNumber = `BUYRUQ-2026-${Math.floor(100 + Math.random() * 900)}`;

    const updated = documents.map(doc => {
      if (doc.id !== docId) return doc;

      const newWorkflow = doc.workflow.map(step => {
        if (step.role === 'RECTOR') {
          return {
            ...step,
            status: 'APPROVED' as const,
            approverName: currentUser.name,
            comment: 'E-IMZO orqali tasdiqlandi va ijroga qaratildi.',
            actionDate: now,
            eImzoHash: `E-IMZO-RECTOR-KEY-${currentUser.pinfl}`
          };
        }
        return step;
      });

      return {
        ...doc,
        status: 'APPROVED' as const,
        workflow: newWorkflow,
        updatedAt: now,
        generatedDoc: {
          docNumber: orderNumber,
          issuedDate: now.split(' ')[0],
          qrHash: `hash_${orderNumber}`,
          verifyUrl: `/verify/${orderNumber}`,
          title: `SAMARQAND DAVLAT UNIVERSITETI REKTORINING RASMIY BUYRUG‘I (№ ${orderNumber})`,
          content: `${doc.title}. Ushbu buyruq talablarini bajarish daxldor bo‘lim va fakultet rahbarlari zimmasiga yuklatilsin.`,
          signerName: currentUser.name,
          signerRole: 'SamDU Rektori',
          digitalSignatureHash: `E-IMZO-CERT-SHA256-${Date.now().toString(16).toUpperCase()}`
        }
      };
    });

    saveDocuments(updated);

    try {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 }
      });
    } catch {}

    addToast(
      'Rektorat Buyrug‘i E-IMZO Bilan Imzolandi! 🎉',
      `№ ${orderNumber} sonli buyruq kuchga kirdi va barcha bo‘limlarga ijro vazifasi sifatida tarqatildi.`,
      'success'
    );
  };

  return (
    <DocumentContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users: USERS,
        documents,
        theme,
        toggleTheme,
        toasts,
        addToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        filterType,
        setFilterType,
        createStudentReference,
        createLeaveRequest,
        createJobApplication,
        approveStep,
        rejectStep,
        signRectorOrder
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocumentContext() {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocumentContext must be used within a DocumentProvider');
  }
  return context;
}
