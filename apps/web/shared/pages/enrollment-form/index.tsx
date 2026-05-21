'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Eye, EyeOff, Plus, Save, Trash2 } from 'lucide-react';
import Button from '../../components/ui/button';
import TabsComponent, { type EnrollmentTab } from './components/tabs';
import { officeProfile, owners as seedOwners } from '../../data/enrollment-data';

type OwnerForm = {
  id: string;
  name: string;
  title: string;
  ownership: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  ssnLast4: string;
};

type DocumentForm = {
  id: string;
  name: string;
  owner: string;
  uploaded: boolean;
  fileName: string;
};

type EnrollmentFormState = {
  administrator: string;
  adminEmail: string;
  adminTitle: string;
  adminPhone: string;
  officeName: string;
  businessType: string;
  registrationNumber: string;
  specialty: string;
  taxId: string;
  npiNumber: string;
  privacyOfficer: string;
  website: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  timezone: string;
  officePhone: string;
  publicEmail: string;
  supportContact: string;
  preferredMethod: string;
  owners: OwnerForm[];
  bankName: string;
  accountType: string;
  routingNumber: string;
  accountNumber: string;
  payoutAccountReady: boolean;
  stripeConnected: boolean;
  documents: DocumentForm[];
  acceptedPolicy: boolean;
};

type FieldName = keyof EnrollmentFormState | `owners.${number}.${keyof OwnerForm}` | `documents.${number}.fileName`;
type Errors = Partial<Record<FieldName, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const routingPattern = /^\d{9}$/;
const phoneFields = new Set<FieldName>(['adminPhone', 'officePhone']);

const initialState: EnrollmentFormState = {
  administrator: officeProfile.administrator,
  adminEmail: officeProfile.adminEmail,
  adminTitle: 'Office Administrator',
  adminPhone: officeProfile.phone,
  officeName: officeProfile.officeName,
  businessType: 'Healthcare office',
  registrationNumber: 'REG-4821-CA',
  specialty: officeProfile.specialty,
  taxId: officeProfile.taxId,
  npiNumber: '1568493021',
  privacyOfficer: 'Alex Morgan',
  website: officeProfile.website,
  street: officeProfile.address,
  city: officeProfile.city,
  state: officeProfile.state,
  zipCode: officeProfile.zipCode,
  timezone: 'America/Los_Angeles',
  officePhone: officeProfile.phone,
  publicEmail: 'frontdesk@example.com',
  supportContact: officeProfile.administrator,
  preferredMethod: 'Email',
  owners: seedOwners.map((owner, index) => ({
    ...owner,
    id: `owner-${index + 1}`,
    ownership: String(owner.ownership),
    dateOfBirth: index === 0 ? '1984-04-18' : '1981-11-08',
    ssnLast4: index === 0 ? '4821' : '1777',
  })),
  bankName: 'Pacific Community Bank',
  accountType: 'Business Checking',
  routingNumber: '123456789',
  accountNumber: '8391002481',
  payoutAccountReady: true,
  stripeConnected: true,
  documents: [
    { id: 'business-license', name: 'Business License', owner: 'Office', uploaded: true, fileName: 'business-license.pdf' },
    { id: 'voided-check', name: 'Voided Check', owner: 'Office', uploaded: true, fileName: 'voided-check.pdf' },
    { id: 'owner-identification', name: 'Owner Identification', owner: 'All owners', uploaded: false, fileName: '' },
    { id: 'ownership-verification', name: 'Ownership Verification', owner: 'All owners', uploaded: false, fileName: '' },
  ],
  acceptedPolicy: false,
};

const stepFields: FieldName[][] = [
  [
    'administrator',
    'adminEmail',
    'adminTitle',
    'adminPhone',
    'officeName',
    'businessType',
    'registrationNumber',
    'specialty',
    'taxId',
    'npiNumber',
    'privacyOfficer',
    'website',
    'street',
    'city',
    'state',
    'zipCode',
    'timezone',
    'officePhone',
    'publicEmail',
    'supportContact',
    'preferredMethod',
  ],
  ['owners.0.name'],
  ['bankName', 'accountType', 'routingNumber', 'accountNumber', 'payoutAccountReady', 'stripeConnected', 'documents.0.fileName'],
  ['acceptedPolicy'],
];

const requiredMessage = 'This field is required.';

function isBlank(value: unknown) {
  return String(value ?? '').trim().length === 0;
}

function getOwnerErrorName(index: number, key: keyof OwnerForm): FieldName {
  return `owners.${index}.${key}`;
}

function digitsOnly(value: string) {
  return value.replace(/\D/g, '');
}

function formatUsPhone(value: string) {
  const digits = digitsOnly(value).replace(/^1(?=\d{10}$)/, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function isValidUsPhone(value: string) {
  return digitsOnly(value).replace(/^1(?=\d{10}$)/, '').length === 10;
}

function isAdultDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  const today = new Date();
  const adultDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  return date <= adultDate;
}

function maskValue(value: string, visibleDigits = 4) {
  const clean = value.trim();
  if (!clean) return 'Not provided';
  if (visibleDigits === 0) return '••••';
  return `${'•'.repeat(Math.max(clean.length - visibleDigits, 4))}${clean.slice(-visibleDigits)}`;
}

function validate(state: EnrollmentFormState): Errors {
  const errors: Errors = {};

  const requiredFields: Array<keyof EnrollmentFormState> = [
    'administrator',
    'adminEmail',
    'adminTitle',
    'adminPhone',
    'officeName',
    'businessType',
    'registrationNumber',
    'specialty',
    'taxId',
    'npiNumber',
    'privacyOfficer',
    'street',
    'city',
    'state',
    'zipCode',
    'timezone',
    'officePhone',
    'publicEmail',
    'supportContact',
    'preferredMethod',
    'bankName',
    'accountType',
    'routingNumber',
    'accountNumber',
  ];

  requiredFields.forEach((field) => {
    if (isBlank(state[field])) errors[field] = requiredMessage;
  });

  if (!emailPattern.test(state.adminEmail)) errors.adminEmail = 'Enter a valid administrator email.';
  if (!emailPattern.test(state.publicEmail)) errors.publicEmail = 'Enter a valid public email.';
  if (!isValidUsPhone(state.adminPhone)) errors.adminPhone = 'Enter a 10-digit US phone number.';
  if (!isValidUsPhone(state.officePhone)) errors.officePhone = 'Enter a 10-digit US office phone.';
  if (!/^\d{5}(-\d{4})?$/.test(state.zipCode)) errors.zipCode = 'Use a valid US ZIP code.';
  if (state.website && !/^https?:\/\/[\w.-]+\.[a-z]{2,}/i.test(state.website)) errors.website = 'Website must start with http:// or https://.';
  if (!/^[A-Za-z0-9-]{4,20}$/.test(state.taxId)) errors.taxId = 'Tax ID may only contain letters, numbers, and hyphens.';
  if (!/^\d{10}$/.test(state.npiNumber)) errors.npiNumber = 'NPI must be exactly 10 digits.';
  if (!routingPattern.test(state.routingNumber)) errors.routingNumber = 'Routing number must be 9 digits.';
  if (!/^\d{6,17}$/.test(state.accountNumber)) errors.accountNumber = 'Account number must be 6 to 17 digits.';
  if (!state.payoutAccountReady) errors.payoutAccountReady = 'Confirm the bank account is ready for payouts.';
  if (!state.stripeConnected) errors.stripeConnected = 'Stripe Connect onboarding must be completed before live payments.';

  if (state.owners.length === 0) {
    errors['owners.0.name'] = 'Add at least one owner.';
  }

  let ownershipTotal = 0;
  state.owners.forEach((owner, index) => {
    if (isBlank(owner.name)) errors[getOwnerErrorName(index, 'name')] = requiredMessage;
    if (isBlank(owner.title)) errors[getOwnerErrorName(index, 'title')] = requiredMessage;
    if (!emailPattern.test(owner.email)) errors[getOwnerErrorName(index, 'email')] = 'Enter a valid owner email.';
    if (!isValidUsPhone(owner.phone)) errors[getOwnerErrorName(index, 'phone')] = 'Enter a 10-digit US owner phone.';
    if (!/^\d{4}$/.test(owner.ssnLast4)) errors[getOwnerErrorName(index, 'ssnLast4')] = 'Enter the last 4 digits only.';
    if (isBlank(owner.dateOfBirth)) {
      errors[getOwnerErrorName(index, 'dateOfBirth')] = requiredMessage;
    } else if (!isAdultDate(owner.dateOfBirth)) {
      errors[getOwnerErrorName(index, 'dateOfBirth')] = 'Owner must be at least 18 years old.';
    }

    const ownership = Number(owner.ownership);
    if (!Number.isFinite(ownership) || ownership <= 0 || ownership > 100) {
      errors[getOwnerErrorName(index, 'ownership')] = 'Ownership must be between 1 and 100.';
    } else {
      ownershipTotal += ownership;
    }
  });

  if (state.owners.length > 0 && ownershipTotal !== 100) {
    errors['owners.0.ownership'] = `Ownership must total 100%. Current total is ${ownershipTotal}%.`;
  }

  state.documents.forEach((doc, index) => {
    if (!doc.uploaded || isBlank(doc.fileName)) {
      errors[`documents.${index}.fileName`] = `${doc.name} is required.`;
    }
  });

  if (!state.acceptedPolicy) errors.acceptedPolicy = 'Accept the certification before submitting.';

  return errors;
}

function Field({
  label,
  name,
  value,
  error,
  onChange,
  type = 'text',
  placeholder,
  inputMode,
  maxLength,
  sensitive = false,
  maskLabel = 'sensitive field',
  children,
}: {
  label: string;
  name: FieldName;
  value: string;
  error?: string;
  onChange: (name: FieldName, value: string) => void;
  type?: string;
  placeholder?: string;
  inputMode?: 'numeric' | 'tel' | 'email' | 'text';
  maxLength?: number;
  sensitive?: boolean;
  maskLabel?: string;
  children?: ReactNode;
}) {
  const [revealed, setRevealed] = useState(false);
  const inputType = sensitive && !revealed ? 'password' : type;

  return (
    <label className="field-control">
      <span>{label}</span>
      {children ?? (
        <span className={sensitive ? 'masked-input-wrap' : undefined}>
          <input
            aria-invalid={Boolean(error)}
            inputMode={inputMode}
            maxLength={maxLength}
            name={name}
            onChange={(event) => onChange(name, event.target.value)}
            placeholder={placeholder}
            type={inputType}
            value={value}
          />
          {sensitive && (
            <button
              aria-label={revealed ? `Hide ${maskLabel}` : `Reveal ${maskLabel}`}
              className="mask-toggle"
              onClick={(event) => {
                event.preventDefault();
                setRevealed((current) => !current);
              }}
              type="button"
            >
              {revealed ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </span>
      )}
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}

function SectionNotice({ children, tone = 'info' }: { children: ReactNode; tone?: 'info' | 'success' | 'error' }) {
  return <div className={`form-notice notice-${tone}`}>{children}</div>;
}

export default function EnrollmentForm({ onComplete }: { onComplete: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [form, setForm] = useState<EnrollmentFormState>(initialState);
  const [touched, setTouched] = useState<Set<FieldName>>(new Set());
  const [saveMessage, setSaveMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => validate(form), [form]);
  const stepErrors = useMemo(
    () => stepFields.map((fields, stepIndex) => {
      if (stepIndex === 1) return Object.keys(errors).some((key) => key.startsWith('owners.'));
      if (stepIndex === 2) return Object.keys(errors).some((key) => fields.includes(key as FieldName) || key.startsWith('documents.'));
      return fields.some((field) => Boolean(errors[field]));
    }),
    [errors],
  );
  const visibleErrors = submitted ? errors : Object.fromEntries(Object.entries(errors).filter(([name]) => touched.has(name as FieldName))) as Errors;
  const ownershipTotal = form.owners.reduce((sum, owner) => sum + (Number(owner.ownership) || 0), 0);

  const markTouched = (names: FieldName[]) => {
    setTouched((current) => new Set([...current, ...names]));
  };

  const handleFieldChange = (name: FieldName, value: string) => {
    const nextValue = phoneFields.has(name)
      ? formatUsPhone(value)
      : name === 'npiNumber' || name === 'routingNumber' || name === 'accountNumber'
        ? digitsOnly(value)
        : value;
    setForm((current) => ({ ...current, [name]: nextValue }));
    markTouched([name]);
    setSaveMessage('');
    setSubmitted(false);
  };

  const handleOwnerChange = (index: number, key: keyof OwnerForm, value: string) => {
    const fieldName = getOwnerErrorName(index, key);
    const nextValue = key === 'phone' ? formatUsPhone(value) : key === 'ssnLast4' ? digitsOnly(value).slice(0, 4) : value;
    setForm((current) => ({
      ...current,
      owners: current.owners.map((owner, ownerIndex) => (ownerIndex === index ? { ...owner, [key]: nextValue } : owner)),
    }));
    markTouched([fieldName, 'owners.0.ownership']);
    setSaveMessage('');
    setSubmitted(false);
  };

  const addOwner = () => {
    setForm((current) => ({
      ...current,
      owners: [
        ...current.owners,
        {
          id: `owner-${Date.now()}`,
          name: '',
          title: '',
          ownership: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          ssnLast4: '',
        },
      ],
    }));
    setSaveMessage('');
  };

  const removeOwner = (id: string) => {
    setForm((current) => ({ ...current, owners: current.owners.filter((owner) => owner.id !== id) }));
    markTouched(['owners.0.name', 'owners.0.ownership']);
  };

  const handleDocumentChange = (index: number, value: string) => {
    setForm((current) => ({
      ...current,
      documents: current.documents.map((doc, docIndex) => (
        docIndex === index ? { ...doc, fileName: value, uploaded: value.trim().length > 0 } : doc
      )),
    }));
    markTouched([`documents.${index}.fileName`]);
  };

  const handleCheckbox = (field: 'payoutAccountReady' | 'stripeConnected' | 'acceptedPolicy', checked: boolean) => {
    setForm((current) => ({ ...current, [field]: checked }));
    markTouched([field]);
    setSaveMessage('');
    setSubmitted(false);
  };

  const getCurrentStepFields = (index = activeIndex): FieldName[] => {
    if (index === 1) {
      return form.owners.flatMap((_, ownerIndex) => [
        getOwnerErrorName(ownerIndex, 'name'),
        getOwnerErrorName(ownerIndex, 'title'),
        getOwnerErrorName(ownerIndex, 'ownership'),
        getOwnerErrorName(ownerIndex, 'email'),
        getOwnerErrorName(ownerIndex, 'phone'),
        getOwnerErrorName(ownerIndex, 'dateOfBirth'),
        getOwnerErrorName(ownerIndex, 'ssnLast4'),
      ]);
    }
    if (index === 2) {
      return [
        'bankName',
        'accountType',
        'routingNumber',
        'accountNumber',
        'payoutAccountReady',
        'stripeConnected',
        ...form.documents.map((_, docIndex) => `documents.${docIndex}.fileName` as FieldName),
      ];
    }
    return stepFields[index];
  };

  const canMoveTo = (nextIndex: number) => {
    if (nextIndex <= activeIndex) return true;
    for (let index = 0; index < nextIndex; index += 1) {
      if (stepErrors[index]) {
        markTouched(getCurrentStepFields(index));
        setSaveMessage('Complete the required fields before moving ahead.');
        return false;
      }
    }
    return true;
  };

  const handleTabChange = (nextIndex: number) => {
    if (canMoveTo(nextIndex)) {
      setActiveIndex(nextIndex);
      setSaveMessage('');
    }
  };

  const handleNext = () => {
    setSaveMessage('');
    const fields = getCurrentStepFields();
    markTouched(fields);

    if (stepErrors[activeIndex]) {
      setSaveMessage('Fix the highlighted fields to continue.');
      return;
    }

    if (activeIndex === stepFields.length - 1) {
      setSubmitted(true);
      if (Object.keys(errors).length === 0) {
        setSaveMessage('Registration form submitted for review.');
        onComplete();
      } else {
        markTouched(Object.keys(errors) as FieldName[]);
        setSaveMessage('Review the highlighted fields before submitting.');
      }
      return;
    }

    setActiveIndex((index) => index + 1);
  };

  const handleBack = () => {
    setSaveMessage('');
    setActiveIndex((index) => Math.max(index - 1, 0));
  };

  const handleSave = () => {
    markTouched(getCurrentStepFields());
    setSaveMessage(stepErrors[activeIndex] ? 'Draft saved with validation warnings.' : 'Draft saved locally.');
  };

  const officeInfo = (
    <div className="form-section-stack">
      <section>
        <h3>Administrator Details</h3>
        <div className="form-grid">
          <Field label="Administrator Name" name="administrator" value={form.administrator} error={visibleErrors.administrator} onChange={handleFieldChange} />
          <Field label="Email Address" name="adminEmail" type="email" value={form.adminEmail} error={visibleErrors.adminEmail} onChange={handleFieldChange} />
          <Field label="Title" name="adminTitle" value={form.adminTitle} error={visibleErrors.adminTitle} onChange={handleFieldChange} />
          <Field label="Phone" name="adminPhone" type="tel" inputMode="tel" maxLength={14} value={form.adminPhone} error={visibleErrors.adminPhone} onChange={handleFieldChange} />
        </div>
      </section>

      <section>
        <h3>Business Basics</h3>
        <div className="form-grid">
          <Field label="Office Name" name="officeName" value={form.officeName} error={visibleErrors.officeName} onChange={handleFieldChange} />
          <Field label="Business Type" name="businessType" value={form.businessType} error={visibleErrors.businessType} onChange={handleFieldChange} />
          <Field label="Registration Number" name="registrationNumber" value={form.registrationNumber} error={visibleErrors.registrationNumber} onChange={handleFieldChange} />
          <Field label="Specialty / Category" name="specialty" value={form.specialty} error={visibleErrors.specialty} onChange={handleFieldChange} />
          <Field label="Tax ID" name="taxId" value={form.taxId} error={visibleErrors.taxId} onChange={handleFieldChange} sensitive maskLabel="tax ID" />
          <Field label="NPI Number" name="npiNumber" value={form.npiNumber} error={visibleErrors.npiNumber} onChange={handleFieldChange} inputMode="numeric" maxLength={10} />
          <Field label="Privacy Officer" name="privacyOfficer" value={form.privacyOfficer} error={visibleErrors.privacyOfficer} onChange={handleFieldChange} />
          <Field label="Website" name="website" value={form.website} error={visibleErrors.website} onChange={handleFieldChange} placeholder="https://example.com" />
        </div>
      </section>

      <section>
        <h3>Address and Contact</h3>
        <div className="form-grid">
          <Field label="Street Address" name="street" value={form.street} error={visibleErrors.street} onChange={handleFieldChange} />
          <Field label="City" name="city" value={form.city} error={visibleErrors.city} onChange={handleFieldChange} />
          <Field label="State" name="state" value={form.state} error={visibleErrors.state} onChange={handleFieldChange} />
          <Field label="Zip Code" name="zipCode" value={form.zipCode} error={visibleErrors.zipCode} onChange={handleFieldChange} />
          <Field label="Timezone" name="timezone" value={form.timezone} error={visibleErrors.timezone} onChange={handleFieldChange}>
            <select value={form.timezone} onChange={(event) => handleFieldChange('timezone', event.target.value)}>
              <option value="">Select timezone</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/New_York">Eastern Time</option>
            </select>
          </Field>
          <Field label="Office Phone" name="officePhone" type="tel" inputMode="tel" maxLength={14} value={form.officePhone} error={visibleErrors.officePhone} onChange={handleFieldChange} />
          <Field label="Public Email" name="publicEmail" type="email" value={form.publicEmail} error={visibleErrors.publicEmail} onChange={handleFieldChange} />
          <Field label="Support Contact" name="supportContact" value={form.supportContact} error={visibleErrors.supportContact} onChange={handleFieldChange} />
          <Field label="Preferred Method" name="preferredMethod" value={form.preferredMethod} error={visibleErrors.preferredMethod} onChange={handleFieldChange}>
            <select value={form.preferredMethod} onChange={(event) => handleFieldChange('preferredMethod', event.target.value)}>
              <option value="">Select method</option>
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
              <option value="SMS">SMS</option>
            </select>
          </Field>
        </div>
      </section>
    </div>
  );

  const ownerInfo = (
    <div className="form-section-stack">
      <div className="section-heading-row">
        <div>
          <h3>Owner / Admin Details</h3>
          <p>Ownership must total exactly 100% before submission.</p>
        </div>
        <Button variant="outline" icon={<Plus size={16} />} onClick={addOwner}>Add Owner</Button>
      </div>
      <SectionNotice tone={ownershipTotal === 100 ? 'success' : 'info'}>
        Current ownership total: <strong>{ownershipTotal}%</strong>
      </SectionNotice>
      <div className="owner-list">
        {form.owners.map((owner, index) => (
          <article className="owner-card editable-owner-card" key={owner.id}>
            <div className="owner-card-header">
              <div>
                <span>Owner #{index + 1}</span>
                <h3>{owner.name || 'New owner'}</h3>
              </div>
              {form.owners.length > 1 && (
                <button className="icon-button danger" title="Remove owner" onClick={() => removeOwner(owner.id)}>
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            <div className="form-grid">
              <Field label="Owner Name" name={getOwnerErrorName(index, 'name')} value={owner.name} error={visibleErrors[getOwnerErrorName(index, 'name')]} onChange={(_, value) => handleOwnerChange(index, 'name', value)} />
              <Field label="Title" name={getOwnerErrorName(index, 'title')} value={owner.title} error={visibleErrors[getOwnerErrorName(index, 'title')]} onChange={(_, value) => handleOwnerChange(index, 'title', value)} />
              <Field label="Ownership %" name={getOwnerErrorName(index, 'ownership')} type="number" value={owner.ownership} error={visibleErrors[getOwnerErrorName(index, 'ownership')]} onChange={(_, value) => handleOwnerChange(index, 'ownership', value)} />
              <Field label="Email" name={getOwnerErrorName(index, 'email')} type="email" value={owner.email} error={visibleErrors[getOwnerErrorName(index, 'email')]} onChange={(_, value) => handleOwnerChange(index, 'email', value)} />
              <Field label="Phone" name={getOwnerErrorName(index, 'phone')} type="tel" inputMode="tel" maxLength={14} value={owner.phone} error={visibleErrors[getOwnerErrorName(index, 'phone')]} onChange={(_, value) => handleOwnerChange(index, 'phone', value)} />
              <Field label="Date of Birth" name={getOwnerErrorName(index, 'dateOfBirth')} type="date" value={owner.dateOfBirth} error={visibleErrors[getOwnerErrorName(index, 'dateOfBirth')]} onChange={(_, value) => handleOwnerChange(index, 'dateOfBirth', value)} />
              <Field label="SSN Last 4" name={getOwnerErrorName(index, 'ssnLast4')} type="text" inputMode="numeric" maxLength={4} value={owner.ssnLast4} error={visibleErrors[getOwnerErrorName(index, 'ssnLast4')]} onChange={(_, value) => handleOwnerChange(index, 'ssnLast4', value)} sensitive maskLabel="SSN last four" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  const documentationInfo = (
    <div className="form-section-stack">
      <section>
        <h3>Bank and Payout Setup</h3>
        <div className="form-grid">
          <Field label="Bank Name" name="bankName" value={form.bankName} error={visibleErrors.bankName} onChange={handleFieldChange} />
          <Field label="Account Type" name="accountType" value={form.accountType} error={visibleErrors.accountType} onChange={handleFieldChange}>
            <select value={form.accountType} onChange={(event) => handleFieldChange('accountType', event.target.value)}>
              <option value="">Select account type</option>
              <option value="Business Checking">Business Checking</option>
              <option value="Business Savings">Business Savings</option>
            </select>
          </Field>
          <Field label="Routing Number" name="routingNumber" value={form.routingNumber} error={visibleErrors.routingNumber} onChange={handleFieldChange} inputMode="numeric" maxLength={9} sensitive maskLabel="routing number" />
          <Field label="Account Number" name="accountNumber" value={form.accountNumber} error={visibleErrors.accountNumber} onChange={handleFieldChange} inputMode="numeric" maxLength={17} sensitive maskLabel="account number" />
        </div>
        <div className="check-list">
          <label>
            <input checked={form.payoutAccountReady} onChange={(event) => handleCheckbox('payoutAccountReady', event.target.checked)} type="checkbox" />
            Bank account is ready for payout verification.
          </label>
          {visibleErrors.payoutAccountReady && <small className="field-error">{visibleErrors.payoutAccountReady}</small>}
          <label>
            <input checked={form.stripeConnected} onChange={(event) => handleCheckbox('stripeConnected', event.target.checked)} type="checkbox" />
            Stripe Connect onboarding is complete for live payments.
          </label>
          {visibleErrors.stripeConnected && <small className="field-error">{visibleErrors.stripeConnected}</small>}
        </div>
      </section>

      <section>
        <h3>Required Documentation</h3>
        <div className="document-list editable-documents">
          {form.documents.map((doc, index) => (
            <div key={doc.id}>
              <span>{doc.name}<small>{doc.owner}</small></span>
              <input
                aria-invalid={Boolean(visibleErrors[`documents.${index}.fileName`])}
                onChange={(event) => handleDocumentChange(index, event.target.value)}
                placeholder="file-name.pdf"
                value={doc.fileName}
              />
              <span className={doc.uploaded ? 'doc-status ready' : 'doc-status missing'}>{doc.uploaded ? 'Uploaded' : 'Missing'}</span>
              {visibleErrors[`documents.${index}.fileName`] && <small className="field-error">{visibleErrors[`documents.${index}.fileName`]}</small>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const reviewInfo = (
    <div className="form-section-stack">
      {Object.keys(errors).length === 0 ? (
        <SectionNotice tone="success"><CheckCircle2 size={16} /> All validation checks are passing.</SectionNotice>
      ) : (
        <SectionNotice tone="error">{Object.keys(errors).length} validation item(s) still need attention.</SectionNotice>
      )}

      <div className="review-grid">
        <span>Office</span><strong>{form.officeName}</strong>
        <span>Business Type</span><strong>{form.businessType}</strong>
        <span>Tax ID</span><strong>{maskValue(form.taxId)}</strong>
        <span>NPI</span><strong>{form.npiNumber}</strong>
        <span>Privacy Officer</span><strong>{form.privacyOfficer}</strong>
        <span>Administrator</span><strong>{form.administrator}</strong>
        <span>Contact</span><strong>{form.publicEmail} / {form.officePhone}</strong>
        <span>Address</span><strong>{form.street}, {form.city}, {form.state} {form.zipCode}</strong>
        <span>Owners</span><strong>{form.owners.length} owner(s), {ownershipTotal}% total</strong>
        <span>Owner PII</span><strong>{form.owners.map((owner) => `${owner.name}: SSN ${maskValue(owner.ssnLast4, 0)}`).join(', ')}</strong>
        <span>Documents</span><strong>{form.documents.filter((doc) => doc.uploaded).length} of {form.documents.length} uploaded</strong>
        <span>Payment Setup</span><strong>{form.stripeConnected ? `Stripe ready, account ${maskValue(form.accountNumber)}` : 'Incomplete'}</strong>
      </div>

      <label className="policy-agreement">
        <input checked={form.acceptedPolicy} onChange={(event) => handleCheckbox('acceptedPolicy', event.target.checked)} type="checkbox" />
        I certify the registration form information is accurate and ready for review.
      </label>
      {visibleErrors.acceptedPolicy && <small className="field-error">{visibleErrors.acceptedPolicy}</small>}
    </div>
  );

  const tabs: EnrollmentTab[] = [
    { value: 'office-info', label: 'Office Info', content: officeInfo, hasError: stepErrors[0] },
    { value: 'owners-info', label: 'Owners Info', content: ownerInfo, hasError: stepErrors[1] },
    { value: 'documentation', label: 'Documentation', content: documentationInfo, hasError: stepErrors[2] },
    { value: 'review-submit', label: 'Review and Submit', content: reviewInfo, hasError: stepErrors[3] },
  ];

  return (
    <div className="enrollment-page">
      <div className="enrollment-title">
        <p className="eyebrow">Registration Form</p>
        <h2>Registration Form</h2>
      </div>
      <div className="enrollment-panel">
        <div className="mobile-tab-label">{tabs[activeIndex].label}</div>
        <TabsComponent tabs={tabs} activeIndex={activeIndex} onTabChange={handleTabChange} />
        <div className="form-actions">
          {activeIndex > 0 ? (
            <Button variant="ghost" icon={<ArrowLeft size={18} />} onClick={handleBack}>
              Back
            </Button>
          ) : (
            <span />
          )}
          <div className="action-group">
            {saveMessage && <span className={`save-message ${stepErrors[activeIndex] ? 'warning' : ''}`}>{saveMessage}</span>}
            <Button variant="outline" icon={<Save size={18} />} onClick={handleSave}>
              Save for Later
            </Button>
            <Button icon={<ArrowRight size={18} />} onClick={handleNext}>
              {activeIndex === tabs.length - 1 ? 'Submit' : 'Proceed to Next Step'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
