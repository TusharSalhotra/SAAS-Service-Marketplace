import { owners } from '../../../../data/enrollment-data';

export default function OwnerInfo() {
  return (
    <div className="owner-list">
      {owners.map((owner, index) => (
        <article className="owner-card" key={owner.email}>
          <div>
            <span>Owner #{index + 1}</span>
            <h3>{owner.name}</h3>
            <p>{owner.title}</p>
          </div>
          <div className="review-grid">
            <span>Email</span><strong>{owner.email}</strong>
            <span>Phone</span><strong>{owner.phone}</strong>
            <span>Ownership</span><strong>{owner.ownership}%</strong>
          </div>
        </article>
      ))}
    </div>
  );
}
