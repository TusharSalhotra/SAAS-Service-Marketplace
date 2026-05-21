import { officeProfile } from '../../../../data/enrollment-data';

export default function AdministratorInformation() {
  return (
    <div className="form-grid">
      <label>Administrator Name<input value={officeProfile.administrator} readOnly /></label>
      <label>Email Address<input value={officeProfile.adminEmail} readOnly /></label>
      <label>Title<input value="Office Administrator" readOnly /></label>
      <label>Phone<input value={officeProfile.phone} readOnly /></label>
    </div>
  );
}
