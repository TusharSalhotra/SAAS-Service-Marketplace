import StatusBadge from '../../../../components/ui/status-badge';
import { documents } from '../../../../data/enrollment-data';

export default function UploadDocumentation() {
  return (
    <div className="document-list">
      {documents.map((doc) => (
        <div key={doc.name}>
          <span>{doc.name}<small>{doc.owner}</small></span>
          <StatusBadge status={doc.status} />
        </div>
      ))}
    </div>
  );
}
