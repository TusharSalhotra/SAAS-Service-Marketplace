import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../../components/ui/button';
import SectionCard from '../../components/layout/section-card';
import { officeProfile, owners } from '../../data/enrollment-data';

export default function OfficeEnrollment({ onStart }: { onStart: () => void }) {
  return (
    <div className="page-stack">
      <section className="office-screen">
        <div>
          <p className="eyebrow">Registration Form</p>
          <h2>{officeProfile.officeName}</h2>
          <p>This screen mirrors the office-facing registration form handoff with dummy information and a direct path back into the form.</p>
        </div>
        <Button icon={<ArrowRight size={18} />} onClick={onStart}>Open Flow</Button>
      </section>
      <div className="two-column">
        <SectionCard title="Office Details">
          <div className="review-grid">
            <span>Office</span><strong>{officeProfile.officeName}</strong>
            <span>Tax ID</span><strong>{officeProfile.taxId}</strong>
            <span>Website</span><strong>{officeProfile.website}</strong>
            <span>Phone</span><strong>{officeProfile.phone}</strong>
          </div>
        </SectionCard>
        <SectionCard title="Ownership">
          {owners.map((owner) => (
            <div className="owner-row" key={owner.email}>
              <CheckCircle2 size={18} />
              <div>
                <strong>{owner.name}</strong>
                <span>{owner.ownership}% ownership</span>
              </div>
            </div>
          ))}
        </SectionCard>
      </div>
    </div>
  );
}
