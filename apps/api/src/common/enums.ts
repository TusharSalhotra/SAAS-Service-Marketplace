export enum RoleName {
  SuperAdmin = 'super_admin',
  OfficeAdmin = 'office_admin',
  OfficeManager = 'office_manager',
  Staff = 'staff',
  Client = 'client',
}

export enum OfficeStatus {
  Draft = 'draft',
  Submitted = 'submitted',
  UnderReview = 'under_review',
  Approved = 'approved',
  Active = 'active',
  Rejected = 'rejected',
  ChangesRequired = 'changes_required',
  Suspended = 'suspended',
  Deactivated = 'deactivated',
}

export enum ServiceStatus {
  Draft = 'draft',
  Published = 'published',
  Unpublished = 'unpublished',
  Archived = 'archived',
}

export enum PaymentStatus {
  Pending = 'pending',
  Succeeded = 'succeeded',
  Failed = 'failed',
  Refunded = 'refunded',
  Disputed = 'disputed',
}
