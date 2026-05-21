import type { EnrollmentStatus } from '../../data/enrollment-data';
import { cx } from '../../lib/utils';

type MarketplaceStatus = 'active' | 'review' | 'failed' | 'draft';
type Status = EnrollmentStatus | MarketplaceStatus;

const labels: Record<Status, string> = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  pending: 'Pending',
  active: 'Active',
  review: 'Under Review',
  failed: 'Failed',
  draft: 'Draft',
};

export default function StatusBadge({ status }: { status: Status }) {
  return <span className={cx('status-badge', `status-${status}`)}>{labels[status]}</span>;
}
