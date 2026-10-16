import { User, DocumentRequest } from './types';

export const USERS: User[] = [
  {
    id: 'user-student',
    name: 'Jamshid Aliyev',
    role: 'STUDENT',
    roleTitle: 'Talaba (3-kurs, Dasturiy Injiniring)',
    department: 'Dasturiy Injiniring',
    faculty: 'Kompyuter Injiniringi Fakulteti',
    pinfl: '32010991230045',
    studentId: 'ST-2023-8842',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'user-teacher',
    name: 'Dots. Nodir Karimov',
    role: 'TEACHER',
    roleTitle: 'Katta O‘qituvchi, PhD',
    department: 'Dasturiy Ta’minot Kafedrasi',
    faculty: 'Kompyuter Injiniringi Fakulteti',
    pinfl: '31508841230089',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'user-dean',
    name: 'Prof. Aziz Rahimov',
    role: 'DEAN',
    roleTitle: 'Fakultet Dekani',
    department: 'Kompyuter Injiniringi Dekanati',
    faculty: 'Kompyuter Injiniringi Fakulteti',
    pinfl: '31005721230012',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'user-hr',
    name: 'Malika Umarova',
    role: 'HR',
    roleTitle: 'Kadrlar Bo‘limi Boshlig‘i',
    department: 'SamDU Kadrlar va Inson Resurslari Departamenti',
    pinfl: '42204851230078',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'user-rector',
    name: 'Prof. Rustam Xolmuradov',
    role: 'RECTOR',
    roleTitle: 'SamDU Rektori',
    department: 'SamDU Rektorati',
    pinfl: '30501601230099',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_DOCUMENTS: DocumentRequest[] = [
  {
    id: 'DOC-2026-001',
    type: 'STUDENT_REFERENCE',
    title: 'O‘qish joyidan ma’lumotnoma (Spravka)',
    applicantId: 'user-student',
    applicantName: 'Jamshid Aliyev',
    applicantRole: 'STUDENT',
    department: 'Dasturiy Injiniring',
    faculty: 'Kompyuter Injiniringi Fakulteti',
    status: 'APPROVED',
    createdAt: '2026-10-10 09:15',
    updatedAt: '2026-10-10 09:15',
    formData: {
      purpose: 'Mudofaa ishlari bo‘limiga taqdim etish uchun',
      courseYear: 3,
      studyType: 'Kunduzgi, Davlat granti'
    },
    workflow: [
      {
        stepNumber: 1,
        role: 'STUDENT',
        roleName: 'Tizim Avtomatlashtirilgan Tekshiruvi (HEMIS API)',
        approverName: 'UniDocFlow No-Touch Bot',
        status: 'APPROVED',
        comment: 'HEMIS bazasi orqali talaba holati va qarzdorligi yo‘qligi tasdiqlandi',
        actionDate: '2026-10-10 09:15:08',
        eImzoHash: '7f9c2d14b8a21e457f9c2d14b8a21e45',
        slaHours: 0,
        startedAt: '2026-10-10 09:15:00'
      }
    ],
    generatedDoc: {
      docNumber: 'REF-2026-8812',
      issuedDate: '2026-10-10',
      qrHash: 'qr_hash_ref_2026_8812',
      verifyUrl: '/verify/REF-2026-8812',
      title: 'O‘QISH JOYIDAN MA’LUMOTNOMA',
      content: 'Ushbu ma’lumotnoma berildiki, Aliyev Jamshid haqiqatdan ham Sharof Rashidov nomidagi Samarqand davlat universitetining "Kompyuter injiniringi" fakulteti "Dasturiy injiniring" ta’lim yo‘nalishi 3-bosqich talabasi hisoblanadi. O‘qish shakli: Kunduzgi (davlat granti).',
      signerName: 'SamDU Raqamli Reyestr Markazi (E-MUHR)',
      signerRole: 'SamDU HEMIS / UniDocFlow Yagona Tizimi',
      digitalSignatureHash: 'E-IMZO-8812-AF79-33C2-91BB'
    }
  },
  {
    id: 'DOC-2026-002',
    type: 'LEAVE_REQUEST',
    title: 'Yillik mehnat ta’tili ajratish to‘g‘risida ariza',
    applicantId: 'user-teacher',
    applicantName: 'Dots. Nodir Karimov',
    applicantRole: 'TEACHER',
    department: 'Dasturiy Ta’minot Kafedrasi',
    faculty: 'Kompyuter Injiniringi Fakulteti',
    status: 'IN_REVIEW',
    createdAt: '2026-10-11 14:20',
    updatedAt: '2026-10-11 16:45',
    formData: {
      startDate: '2026-11-01',
      endDate: '2026-11-24',
      daysCount: 24,
      reason: '2025/2026 o‘quv yili mehnat ta’tillari jadvaliga asosan'
    },
    workflow: [
      {
        stepNumber: 1,
        role: 'DEAN',
        roleName: 'Kafedra mudiri & Dekan vizasi',
        approverName: 'Prof. Aziz Rahimov',
        status: 'APPROVED',
        comment: 'Dars soatlari o‘zaro o‘rinbosarlik asosida to‘liq taqsimlangan. E’tiroz yo‘q.',
        actionDate: '2026-10-11 16:45',
        eImzoHash: 'a8b9c0d1e2f3456789abcdef01234567',
        slaHours: 24,
        startedAt: '2026-10-11 14:20'
      },
      {
        stepNumber: 2,
        role: 'HR',
        roleName: 'Kadrlar bo‘limi tekshiruvi',
        approverName: 'Malika Umarova',
        status: 'PENDING',
        slaHours: 24,
        startedAt: '2026-10-11 16:45'
      },
      {
        stepNumber: 3,
        role: 'RECTOR',
        roleName: 'Rektor tasdig‘i va Buyruq chiqarish',
        status: 'PENDING',
        slaHours: 24,
        startedAt: '2026-10-11 16:45'
      }
    ]
  },
  {
    id: 'DOC-2026-003',
    type: 'RECTOR_ORDER',
    title: 'Xalqaro ilmiy konferensiya tashkil etish to‘g‘risida buyruq',
    applicantId: 'user-dean',
    applicantName: 'Prof. Aziz Rahimov',
    applicantRole: 'DEAN',
    department: 'Kompyuter Injiniringi Dekanati',
    faculty: 'Kompyuter Injiniringi Fakulteti',
    status: 'IN_REVIEW',
    createdAt: '2026-10-12 08:30',
    updatedAt: '2026-10-12 08:30',
    formData: {
      conferenceTitle: 'Sun’iy intellekt va raqamli iqtisodiyot: muammo va yechimlar',
      eventDate: '2026-11-20',
      budgetAllocated: '45,000,000 so‘m'
    },
    workflow: [
      {
        stepNumber: 1,
        role: 'HR',
        roleName: 'Huquqiy maslahatchi va Kadrlar kelishuvi',
        approverName: 'Malika Umarova',
        status: 'APPROVED',
        comment: 'Amaldagi mehnat va oliy ta’lim me’yorlariga to‘liq muvofiq.',
        actionDate: '2026-10-12 09:00',
        eImzoHash: 'fedcba98765432100123456789abcdef',
        slaHours: 12,
        startedAt: '2026-10-12 08:30'
      },
      {
        stepNumber: 2,
        role: 'RECTOR',
        roleName: 'SamDU Rektori E-IMZO bilan imzolash',
        approverName: 'Prof. Rustam Xolmuradov',
        status: 'PENDING',
        slaHours: 24,
        startedAt: '2026-10-12 09:00'
      }
    ],
    executionTasks: [
      {
        id: 'TASK-101',
        title: 'Konferensiya materiallari to‘plamini nashrga tayyorlash',
        assigneeRole: 'Ilmiy Bo‘lim',
        assigneeDepartment: 'Ilmiy-tadqiqot boshqarmasi',
        deadline: '2026-11-10',
        isCompleted: false
      },
      {
        id: 'TASK-102',
        title: 'Mehmonlar va xalqaro spikerlarni kutib olish logistikasi',
        assigneeRole: 'Xalqaro Hamkorlik Bo‘limi',
        assigneeDepartment: 'Xalqaro aloqalar',
        deadline: '2026-11-15',
        isCompleted: false
      }
    ]
  }
];

export const UNIVERSITY_ANALYTICS = {
  savedPaperSheets: 34500,
  savedWorkHours: 1840,
  averageApprovalHours: 6.4,
  fastestFaculty: 'Raqamli Texnologiyalar (O‘rtacha: 2.1 soat)',
  slowestFaculty: 'Ijtimoiy-Gumanitar Fanlar (O‘rtacha: 19.4 soat - Tiqilish mavjud)',
  totalDigitalDocs: 4892,
  pendingApprovalsCount: 14
};
