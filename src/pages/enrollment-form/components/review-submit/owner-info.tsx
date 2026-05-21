import { owners } from '../../../../data/enrollment-data';

export default function ReviewOwnerInfo() {
  return (
    <div className="owner-list compact">
      {owners.map((owner) => (
        <div className="owner-row" key={owner.email}>
          <strong>{owner.name}</strong>
          <span>{owner.title} - {owner.ownership}%</span>
        </div>
      ))}
    </div>
  );
}
