import { officeProfile } from '../../../../data/enrollment-data';

export default function OfficeInformation() {
  return (
    <div className="form-grid">
      <label>Office Name<input value={officeProfile.officeName} readOnly /></label>
      <label>Specialty<input value={officeProfile.specialty} readOnly /></label>
      <label>Tax ID<input value={officeProfile.taxId} readOnly /></label>
      <label>Website<input value={officeProfile.website} readOnly /></label>
    </div>
  );
}
