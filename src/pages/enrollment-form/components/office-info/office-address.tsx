import { officeProfile } from '../../../../data/enrollment-data';

export default function OfficeAddress() {
  return (
    <div className="form-grid">
      <label>Street Address<input value={officeProfile.address} readOnly /></label>
      <label>City<input value={officeProfile.city} readOnly /></label>
      <label>State<input value={officeProfile.state} readOnly /></label>
      <label>Zip Code<input value={officeProfile.zipCode} readOnly /></label>
    </div>
  );
}
