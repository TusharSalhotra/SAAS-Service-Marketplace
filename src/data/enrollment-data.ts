import { Building2, CreditCard, FileUp, Mail, ShieldCheck, UserRound, UsersRound } from 'lucide-react';
import type { ComponentType } from 'react';

export type EnrollmentStatus = 'completed' | 'in-progress' | 'pending';

export type Owner = {
  name: string;
  title: string;
  ownership: number;
  email: string;
  phone: string;
};

export type DocumentItem = {
  name: string;
  owner: string;
  status: EnrollmentStatus;
};

export type EnrollmentSection = {
  id: string;
  title: string;
  Icon: ComponentType<{ size?: number; strokeWidth?: number }>;
};

export const officeProfile = {
  administrator: 'Alex Morgan',
  adminEmail: 'alex.morgan@example.com',
  officeName: 'Harbor Dental Studio',
  specialty: 'General Dentistry',
  taxId: 'XX-XXX4821',
  address: '420 Market Street, Suite 310',
  city: 'San Diego',
  state: 'CA',
  zipCode: '92101',
  phone: '(619) 555-0184',
  website: 'https://www.harbor-dental.example',
  enrollmentDate: 'May 19, 2026',
};

export const owners: Owner[] = [
  {
    name: 'Priya Shah',
    title: 'Managing Partner',
    ownership: 60,
    email: 'priya.shah@example.com',
    phone: '(619) 555-0151',
  },
  {
    name: 'Jordan Lee',
    title: 'Partner',
    ownership: 40,
    email: 'jordan.lee@example.com',
    phone: '(619) 555-0177',
  },
];

export const documents: DocumentItem[] = [
  { name: 'Business License', owner: 'Office', status: 'completed' },
  { name: 'Voided Check', owner: 'Office', status: 'completed' },
  { name: 'Owner Identification', owner: 'Priya Shah', status: 'in-progress' },
  { name: 'Ownership Verification', owner: 'Jordan Lee', status: 'pending' },
];

export const dashboardStats = [
  { label: 'Registration Form Progress', value: '72%', status: 'in-progress' as EnrollmentStatus },
  { label: 'Office Sections', value: '4 of 4', status: 'completed' as EnrollmentStatus },
  { label: 'Owner Total', value: '100%', status: 'completed' as EnrollmentStatus },
  { label: 'Documents Ready', value: '2 of 4', status: 'in-progress' as EnrollmentStatus },
];

export const officeSections: EnrollmentSection[] = [
  { id: 'admin', title: 'Administrator Information', Icon: UserRound },
  { id: 'office', title: 'Office Information', Icon: Building2 },
  { id: 'address', title: 'Office Address', Icon: Mail },
  { id: 'contact', title: 'Contact Information', Icon: ShieldCheck },
];

export const documentationSections: EnrollmentSection[] = [
  { id: 'bank', title: 'Bank Information', Icon: CreditCard },
  { id: 'upload', title: 'Upload Documentation', Icon: FileUp },
];

export const reviewSections: EnrollmentSection[] = [
  { id: 'contact', title: 'Contact Information', Icon: Mail },
  { id: 'office', title: 'Office Information', Icon: Building2 },
  { id: 'owners', title: 'Owner Information', Icon: UsersRound },
  { id: 'documents', title: 'Uploaded Documentation', Icon: FileUp },
];
