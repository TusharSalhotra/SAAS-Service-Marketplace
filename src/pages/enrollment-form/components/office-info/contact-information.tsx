import { officeProfile } from '../../../../data/enrollment-data';

export default function ContactInformation() {
  return (
    <div className="form-grid">
      <label>Office Phone<input value={officeProfile.phone} readOnly /></label>
      <label>Public Email<input value="frontdesk@example.com" readOnly /></label>
      <label>Support Contact<input value={officeProfile.administrator} readOnly /></label>
      <label>Preferred Method<input value="Email" readOnly /></label>
    </div>
  );
}
