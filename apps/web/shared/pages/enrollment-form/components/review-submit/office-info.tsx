import { officeProfile } from '../../../../data/enrollment-data';
import InfoRow from './info-row';

export default function ReviewOfficeInfo() {
  return (
    <div className="review-grid">
      <InfoRow label="Office" value={officeProfile.officeName} />
      <InfoRow label="Address" value={`${officeProfile.address}, ${officeProfile.city}, ${officeProfile.state}`} />
      <InfoRow label="Phone" value={officeProfile.phone} />
      <InfoRow label="Tax ID" value={officeProfile.taxId} />
    </div>
  );
}
