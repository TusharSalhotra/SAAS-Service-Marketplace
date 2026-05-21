import { officeProfile } from '../../../../data/enrollment-data';
import InfoRow from './info-row';

export default function ReviewContactInfo() {
  return (
    <div className="review-grid">
      <InfoRow label="Administrator" value={officeProfile.administrator} />
      <InfoRow label="Email" value={officeProfile.adminEmail} />
      <InfoRow label="Support Phone" value={officeProfile.phone} />
      <InfoRow label="Website" value={officeProfile.website} />
    </div>
  );
}
