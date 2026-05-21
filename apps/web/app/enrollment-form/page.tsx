'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import EnrollmentForm from '@shared/pages/enrollment-form';

export default function EnrollmentFormPage() {
  return (
    <div className="page-stack">
      <EnrollmentForm onComplete={() => undefined} />
      <Link className="button button-primary" href="/office-enrollment">
        <ArrowRight size={18} />
        Open Review
      </Link>
    </div>
  );
}
