'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import OfficeEnrollment from '@shared/pages/office';

export default function OfficeEnrollmentPage() {
  return (
    <div className="page-stack">
      <OfficeEnrollment onStart={() => undefined} />
      <Link className="button button-primary" href="/enrollment-form">
        <ArrowRight size={18} />
        Edit Registration Form
      </Link>
    </div>
  );
}
