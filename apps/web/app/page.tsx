import Link from 'next/link';
import { ArrowRight, Building2, ClipboardCheck } from 'lucide-react';
import SectionCard from '@shared/components/layout/section-card';
import StatusBadge from '@shared/components/ui/status-badge';
import { dashboardStats, documents, officeProfile } from '@shared/data/enrollment-data';

export default function OfficeDashboardPage() {
  return (
    <div className="page-stack">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Office dashboard</p>
          <h2>{officeProfile.officeName}</h2>
          <p>{officeProfile.address}, {officeProfile.city}, {officeProfile.state} {officeProfile.zipCode}</p>
        </div>
        <Link className="button button-primary" href="/enrollment-form">
          <ArrowRight size={18} />
          Continue Registration Form
        </Link>
      </section>

      <div className="stats-grid">
        {dashboardStats.map((stat) => (
          <article className="stat-card" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <StatusBadge status={stat.status} />
          </article>
        ))}
      </div>

      <div className="two-column">
        <SectionCard title="Office Snapshot">
          <div className="info-list">
            <p><Building2 size={16} /> {officeProfile.specialty}</p>
            <p><ClipboardCheck size={16} /> Registration date: {officeProfile.enrollmentDate}</p>
            <p>Administrator: {officeProfile.administrator}</p>
            <p>Contact: {officeProfile.phone}</p>
          </div>
        </SectionCard>
        <SectionCard title="Document Readiness">
          <div className="document-list">
            {documents.map((doc) => (
              <div key={doc.name}>
                <span>{doc.name}</span>
                <StatusBadge status={doc.status} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
