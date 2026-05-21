import {
  BadgeDollarSign,
  BriefcaseBusiness,
  CalendarCheck,
  ChartNoAxesCombined,
  CreditCard,
  FileCheck2,
  Settings,
  ShieldCheck,
  Store,
  UserCheck,
  Users,
} from 'lucide-react';
import type { ComponentType } from 'react';

export type MarketplaceStatus = 'active' | 'pending' | 'review' | 'failed' | 'draft';

export type Metric = {
  label: string;
  value: string;
  detail: string;
  trend: string;
  Icon: ComponentType<{ size?: number; strokeWidth?: number }>;
};

export const platformMetrics: Metric[] = [
  { label: 'Gross marketplace volume', value: '$842.6K', detail: 'Across all eligible payments', trend: '+18.4%', Icon: BadgeDollarSign },
  { label: 'Platform commission', value: '$126.4K', detail: '15% application fee tracked', trend: '+12.1%', Icon: ChartNoAxesCombined },
  { label: 'Active offices', value: '128', detail: '37 pending registration form review', trend: '+9 this month', Icon: Store },
  { label: 'Payment success rate', value: '97.8%', detail: 'Stripe Connect ready offices', trend: '-0.4%', Icon: CreditCard },
];

export const operationalQueue = [
  { label: 'Office approvals', value: '37', detail: 'Submitted or under review', status: 'review' as MarketplaceStatus },
  { label: 'Invite acceptances', value: '64%', detail: 'Accepted before expiry', status: 'active' as MarketplaceStatus },
  { label: 'Webhook incidents', value: '2', detail: 'Require payment reconciliation', status: 'failed' as MarketplaceStatus },
  { label: 'Payout onboarding', value: '18', detail: 'Connected account incomplete', status: 'pending' as MarketplaceStatus },
];

export const offices = [
  { name: 'Harbor Dental Studio', city: 'San Diego', status: 'active' as MarketplaceStatus, revenue: '$86,420', clients: 428, owner: 'Priya Shah' },
  { name: 'Northline Wellness Clinic', city: 'Austin', status: 'review' as MarketplaceStatus, revenue: '$42,180', clients: 231, owner: 'Marco Diaz' },
  { name: 'Luma Beauty Lounge', city: 'Miami', status: 'pending' as MarketplaceStatus, revenue: '$31,940', clients: 184, owner: 'Anika Rao' },
  { name: 'Cedar Tax Services', city: 'Portland', status: 'draft' as MarketplaceStatus, revenue: '$0', clients: 0, owner: 'Evan Brooks' },
];

export const services = [
  { name: 'Consultation', office: 'Northline Wellness Clinic', category: 'Clinic', price: '$120', duration: '45 min', purchases: 312 },
  { name: 'Manicure Package', office: 'Luma Beauty Lounge', category: 'Salon', price: '$85', duration: '60 min', purchases: 248 },
  { name: 'Dental Cleaning', office: 'Harbor Dental Studio', category: 'Dental', price: '$160', duration: '50 min', purchases: 196 },
  { name: 'Tax Planning Session', office: 'Cedar Tax Services', category: 'Professional', price: '$210', duration: '90 min', purchases: 74 },
];

export const roleCards = [
  { role: 'Super Admin', description: 'Approves offices, manages global settings, fees, analytics, users, audit logs.', Icon: ShieldCheck },
  { role: 'Office Admin', description: 'Owns office profile, services, staff, clients, payments, payouts, and settings.', Icon: BriefcaseBusiness },
  { role: 'Office Manager', description: 'Coordinates bookings, clients, service schedules, assignments, and reporting.', Icon: CalendarCheck },
  { role: 'Staff / Provider', description: 'Views assigned services, updates statuses, manages availability and notes.', Icon: UserCheck },
  { role: 'Client', description: 'Browses services, checks out, receives receipts, and manages bookings/profile.', Icon: Users },
];

export const enrollmentSteps = [
  { title: 'Business basics', text: 'Office profile, registration, contact, address, timezone.', Icon: Store },
  { title: 'Owner details', text: 'Owner/admin contacts and verification readiness.', Icon: UserCheck },
  { title: 'Services setup', text: 'Categories, pricing, duration, staff needs, add-ons.', Icon: BriefcaseBusiness },
  { title: 'Payment setup', text: 'Stripe Connect account, payout status, tax details.', Icon: CreditCard },
  { title: 'Branding & portal', text: 'Logo, colors, slug, cover image, portal rules.', Icon: Settings },
  { title: 'Review & approval', text: 'Submit for super admin review and audit log capture.', Icon: FileCheck2 },
];

export const checkoutSummary = {
  service: 'Manicure Package',
  office: 'Luma Beauty Lounge',
  subtotal: 100,
  platformFeeRate: 0.15,
  processorFee: 3.2,
};
